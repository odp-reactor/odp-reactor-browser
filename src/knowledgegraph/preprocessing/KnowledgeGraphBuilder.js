import { Resource } from "../../resources/Resource";
import { scaleData } from "../../base/math";
import { findSliderDomain as findMinMax } from "../../filters/filter-ui/findSliderDomain";
import { KnowledgeGraph } from "../KnowledgeGraph";
import { forEach, filter } from "lodash";
import Measurement from "../../resources/Measurement";
import ResourceFactory from "../../resources/ResourceFactory";

export class KnowledgeGraphBuilder {
    constructor(sparqlClient) {
        this.sparqlClient = sparqlClient;
    }
    makeSchemaKG({ concepts, patterns }) {
        // get only pattern without 0 occurences
        patterns = filter(patterns, (p) => {
            return p.occurences !== "0";
        });
        const classes = concepts;

        const [minCentralityScore, maxCentralityScore] = findMinMax(
            classes,
            "pd"
        );
        const kg = new KnowledgeGraph();
        // add pattern resource to kg
        forEach(patterns, (p) => {
            const patternResource = Resource.create({
                uri: p.pattern,
                label: p.label,
                description: p.description,
                properties: {
                    type: "Pattern",
                    occurences: p.occurences,
                    nodeSize: 15,
                    nodeLabelSize: 20,
                    nodeColor: "purple",
                    nodeBorderColor: "purple",
                    nodeType: "graphin-circle",
                    tooltipInfo: dataInfoMap[p.pattern],
                },
            });
            kg.addResource(patternResource);
        });
        // add classes resources to kg and relation with patterns
        forEach(classes, (c) => {
            const classResource = Resource.create({
                uri: c.uri,
                label: c.label, // to be changed
                description: c.description,
                properties: {
                    type: "Class",
                    centralityScore: c.pd,
                    nodeSize: 60,
                    nodeLabelSize: 20,
                    nodeType: "diamond",
                    nodeLabelPosition: "bottom",
                    nodeColor: "red",
                    nodeBorderColor: "red",
                    scaledCentralityScore: scaleInto01(
                        c.pd,
                        minCentralityScore,
                        maxCentralityScore
                    ),
                    internalUri: `${
                        process.env.PUBLIC_URL
                    }/endpoints/${encodeURIComponent(
                        this.sparqlClient.sparqlEndpoint
                    )}/graphs/${
                        this.sparqlClient.graph
                    }/concepts/${encodeURIComponent(c.uri)}`,
                    listProperties: {
                        listKeys: [
                            {
                                label: "Class",
                                id: "label",
                            },
                            {
                                label: "Description",
                                id: "description",
                            },
                        ],
                    },
                },
            });
            kg.addResource(classResource);
            const relatedPattern = kg.getResource(c.pattern);

            if (relatedPattern) {
                const classPatternRelation = Resource.create({
                    label: "has View",
                    properties: {
                        edgeLabelSize: 20,
                        edgeWidth: 3,
                        edgeColor: "grey",
                    },
                });
                kg.addTriple(
                    classResource,
                    classPatternRelation,
                    relatedPattern
                );
            }
        });

        // update pattern size
        kg.forEachPattern((resourceURI, attributes) => {
            if (kg.getResourceProperty(resourceURI, "occurences")) {
                kg.updateResourceProperty(
                    resourceURI,
                    "nodeSize",
                    Math.round(
                        scaleData(
                            kg.getResourceProperty(resourceURI, "occurences"),
                            0,
                            350,
                            20,
                            80
                        )
                    )
                );
            }
        });
        return kg;
    }
    makePatternInstancesListKG({ patternInstances }) {
        let instances = patternInstances;

        const kg = new KnowledgeGraph();
        const resourceFactory = new ResourceFactory();

        const listHeadersSet = new Set();
        listHeadersSet.add("label");
        forEach(instances, (instance) => {
            // preprocessing raw data
            let resourceInstanceJson = {};

            if (instance.cPropLabel && instance.cProp) {
                resourceInstanceJson["culturalProperty"] = instance.cPropLabel;
                resourceInstanceJson["culturalPropertyUri"] = instance.cProp;
                listHeadersSet.add("culturalProperty");
            }

            let startTime, endTime;
            if (instance.startTime && instance.endTime) {
                startTime = instance.startTime.match(/\d+/g)
                    ? instance.startTime.match(/\d+/g)[0]
                    : null;
                endTime = instance.endTime.match(/\d+/g)
                    ? instance.endTime.match(/\d+/g)[0]
                    : null;
                listHeadersSet.add("startTime");
                listHeadersSet.add("endTime");
                listHeadersSet.add("locationType");
                listHeadersSet.add("addressLabel");
                listHeadersSet.add("lat");
                listHeadersSet.add("long");
            }

            if (instance.measures) {
                let measures = instance.measures.split(";");
                measures.forEach((measure) => {
                    let [rawm, v, u] = measure.split(" ");
                    let m = rawm.split("-").pop();

                    const lengthUnits = ["cm", "m", "mm"];
                    const defaultMeasurementUnit = "m";

                    if (lengthUnits.includes(u) && v != "MNR") {
                        v = v.replace(",", ".");
                        // do conversion

                        let a = false;
                        if (v.includes("350")) {
                            a = true;
                            console.log("DELETED", measure);
                        }

                        const measurement = Measurement.create({
                            unit: u,
                            value: v * 1,
                        });
                        const newMeasurement = measurement.convert(
                            defaultMeasurementUnit
                        );
                        if (newMeasurement) {
                            v = newMeasurement.getValue();
                            u = newMeasurement.getUnit();
                        }

                        if (a) {
                            console.log("deleted", measurement, newMeasurement);
                        }
                    }

                    if (!isNaN(v)) {
                        resourceInstanceJson[m] = v;
                        resourceInstanceJson[`${m}MeasurementUnit`] = u;
                    }
                });

                resourceInstanceJson["measures"] = measures.length;

                listHeadersSet.add("height");
                listHeadersSet.add("width");
                listHeadersSet.add("length");
                listHeadersSet.add("diameter");
            }

            if (instance.parts) {
                resourceInstanceJson["parts"] = instance.parts.split(";")
                    ? instance.parts.split(";").length
                    : undefined;
                listHeadersSet.add("parts");
            }

            const instancePropertiesJson = Object.assign(
                {
                    startTime: startTime || undefined,
                    endTime: endTime || undefined,
                    locationType: instance.locationType || undefined,
                    lat: toPrecision(instance.lat) || undefined,
                    long: toPrecision(instance.long) || undefined,
                    addressLabel: instance.addressLabel || undefined,
                    // internalUri: `/dataset/${encodeURIComponent(
                    //     this.props.RouteStore._currentNavigate.route.params.did
                    // )}/resource/${encodeURIComponent(resourceURI)}`,
                    listProperties: {
                        listKeys: Array.from(listHeadersSet).map(
                            (headerKey) => {
                                return listKeysIndex[headerKey];
                            }
                        ),
                        listItemClick: () => {
                            console.log("Clicked Instance");
                            console.log(instance);
                            // exploreResourceOnListItemClick(instance.instance);
                        },
                        listEntityClick: (resourceURI) => {
                            // this.context.executeAction(navigateAction, {
                            //     url: `/dataset/${encodeURIComponent(
                            //         this.props.RouteStore._currentNavigate.route
                            //             .params.did
                            //     )}/resource/${encodeURIComponent(resourceURI)}`,
                            // });
                        },
                        listTitle: instance.patternLabel,
                    },
                },
                resourceInstanceJson
            );

            const instanceResource = resourceFactory.makeResource({
                uri: instance.instance,
                label: instance.label, // label: `${instance.label.substring(0, 50)}...`,
                description: instance.description,
                properties: instancePropertiesJson,
            });

            kg.addResource(instanceResource);
        });

        return kg;
    }

    makeConceptInstancesListKG({ conceptInstances }) {
        const kg = new KnowledgeGraph();
        const resourceFactory = new ResourceFactory();

        const resources = conceptInstances;

        forEach(resources, (resource) => {
            let patternInstancesUriStringified = "";
            if (resource.patternInstances) {
                resource.patternInstances.forEach((patternInstance, index) => {
                    patternInstancesUriStringified += `${
                        index !== 0 ? "|" : ""
                    }${patternInstance.uri}`;
                });
            } else {
                patternInstancesUriStringified = "noInstance";
            }
            const resourceKG = resourceFactory.makeResource({
                uri: resource.uri,
                label: resource.label, // label: `${resource.label.substring(0, 50)}...`,
                properties: {
                    patternInstances: resource.patternInstances,
                    listProperties: {
                        listKeys: [
                            {
                                label: "Label",
                                id: "label",
                                uri: "uri",
                            },
                        ],
                        listItemClick: () => {
                            console.log(
                                "CLICKED LIST ITEM: uri ",
                                resource.uri
                            );
                            // this.context.executeAction(navigateAction, {
                            //     url: `${PUBLIC_URL}/patterns/dataset/${encodeURIComponent(
                            //         this.props.RouteStore._currentNavigate.route
                            //             .params.did
                            //     )}/resource/${encodeURIComponent(
                            //         resource.uri
                            //     )}/${encodeURIComponent(
                            //         patternInstancesUriStringified
                            //     )}`,
                            // });
                        },
                        listEntityClick: (resourceURI) => {
                            // this.context.executeAction(navigateAction, {
                            //     url: `${PUBLIC_URL}/dataset/${encodeURIComponent(
                            //         this.props.RouteStore._currentNavigate.route
                            //             .params.did
                            //     )}/resource/${encodeURIComponent(resourceURI)}`,
                            // });
                        },
                        listTitle: resource.classLabel,
                    },
                },
            });

            kg.addResource(resourceKG);
        });
        return kg;
    }
}

let dataInfoMap = {};
dataInfoMap["http://www.ontologydesignpatterns.org/cp/owl/collection"] =
    "Explore the instances to see information about collections of items in this dataset";
dataInfoMap["http://www.ontologydesignpatterns.org/cp/owl/part-of"] =
    "Explore instances of this pattern in the dataset to get information about things and the parts they’re composed of.";
dataInfoMap["http://www.ontologydesignpatterns.org/cp/owl/situation"] =
    "Explore the instances to get information about situations data and the things (participants, people, objects) involved in that situation.";
dataInfoMap[
    "http://www.ontologydesignpatterns.org/cp/owl/time-indexed-situation"
] =
    "Explore the instances of this pattern to get information about a situation, things involved and the time interval in which situation happened.";
dataInfoMap["http://www.ontologydesignpatterns.org/cp/owl/time-interval"] =
    "There are no independent time interval in the dataset.";
dataInfoMap[
    "https://w3id.org/arco/ontology/denotative-description/measurement-collection"
] =
    "Cultural properties described through collections of measurements e.g. dimensional measures. Explore this view to see the data about measurements collected for a cultural property.";
dataInfoMap[
    "https://w3id.org/arco/ontology/location/cultural-property-component-of"
] =
    "Cultural Properties and their components. Explore this view to see the data about a complex cultural property and components it's made by.";
dataInfoMap[
    "https://w3id.org/arco/ontology/location/time-indexed-typed-location"
] =
    "Locations of cultural properties at a certain time and with indication of the specific role of the location (e.g Current Location). Explore this view to see the data about the location of a cultural property and the time period since it is in that location or where it was in the past.";

function scaleInto01(x, min, max) {
    return (x - min) / (max - min);
}

// uri is used in the list like this instance[uri] so you need to save in the instance
// instance[uri] = https://example.com/instanceUri
//
// e.g. instance[cPropURI] = "someURIofTheCprop"
const listKeysIndex = {
    label: {
        label: "View",
        id: "label",
        uri: "uri",
    },
    culturalProperty: {
        label: "Cultural Property",
        id: "culturalProperty",
        uri: "culturalPropertyUri",
    },
    height: { label: "Height", id: "height" },
    width: { label: "Width", id: "width" },
    length: { label: "Length", id: "length" },
    diameter: { label: "Diameter", id: "diameter" },
    locationType: { label: "Location Type", id: "locationType" },
    startTime: { label: "Start Time", id: "startTime" },
    endTime: { label: "End Time", id: "endTime" },
    addressLabel: { label: "Address", id: "addressLabel" },
    lat: { label: "Latitude", id: "lat" },
    long: { label: "Longitude", id: "long" },
    parts: { label: "Parts", id: "parts" },
};

function toPrecision(n, p = 3) {
    if (n) return Number.parseFloat(n).toFixed(p);
    else return undefined;
}
