import React from "react";
import PatternMenu from "../../layout/PatternMenu";
import List from "../../layout/List";
import ODPReactorContainer from "../../layout/ODPReactorContainer";
import GeoFilter from "../../filters/filter-ui/GeoFilter";
import MinMeasurementSliderFilter from "../../filters/filter-ui/MinMeasurementSliderFilter";
import MaxMeasurementSliderFilter from "../../filters/filter-ui/MaxMeasurementSliderFilter";
import MaxMeasurementCountSliderFilter from "../../filters/filter-ui/MaxMeasurementCountSliderFilter";
import MinMeasurementCountSliderFilter from "../../filters/filter-ui/MinMeasurementCountSliderFilter";
import MinPartCountSliderFilter from "../../filters/filter-ui/MinPartCountSliderFilter";
import MaxPartCountSliderFilter from "../../filters/filter-ui/MaxPartCountSliderFilter";
import hasResourceToFilter from "../../filters/filter-ui/hasResourceToFilter";
import { useKGCtx } from "../../knowledgegraph/ctx/useKGCtx";
import { forEach, map } from "lodash";
import AlertBox from "../../base/alert/AlertBox";
import { Grid } from "semantic-ui-react";
import { Navbar } from "../../layout/Navbar";
import GoToButton from "../../layout/GoToButton";
import PatternInstancesHelpBox from "../../base/help/PatternInstancesHelpBox";
import LocationTypeFilter from "../../filters/filter-ui/LocationTypeFilter";
import StartTimeIntervalFilter from "../../filters/filter-ui/StartTimeIntervalFilter";
import EndTimeIntervalFilter from "../../filters/filter-ui/EndTimeIntervalFilter";
import SinglePropertySearchBarFilter from "../../filters/filter-ui/SinglePropertySearchBarFilter";

export default function PatternInstancesScreen({ filteredKnowledgeGraph }) {
    const { knowledgeGraph } = useKGCtx();

    console.log("RESOURCES KG", knowledgeGraph.getResources().length);

    // determine dynamically measurement filters
    const resources = knowledgeGraph.getResources();
    const thereIsGeoLocationToFilter = hasResourceToFilter(
        resources,
        (resource) => {
            if (resource.lat && resource.long) {
                return true;
            } else {
                return false;
            }
        }
    );
    const thereIsTimeToFilter = hasResourceToFilter(resources, (resource) => {
        if (resource.startTime && resource.endTime) {
            return true;
        } else {
            return false;
        }
    });

    const thereAreTypeLocationsToFilter = hasResourceToFilter(
        resources,
        (resource) => {
            if (resource.locationType) {
                return true;
            } else {
                return false;
            }
        }
    );

    const thereArePartsToFilter = hasResourceToFilter(resources, (resource) => {
        if (resource.parts) {
            return true;
        } else {
            return false;
        }
    });

    const thereIsCulturalPropertyToFilter = hasResourceToFilter(
        resources,
        (resource) => {
            if (resource.culturalProperty) {
                return true;
            } else {
                return false;
            }
        }
    );

    const measurementSet = [
        "height",
        "weight",
        "length",
        "width",
        "depth",
        "diameter",
        "thickness",
    ];

    const measurementFilters = [];
    forEach(measurementSet, (m) => {
        const iterator = ["minValue", "maxValue"];
        const thereIsMeasureToFilter = hasResourceToFilter(
            resources,
            (resource) => {
                if (resource[m]) {
                    return true;
                } else {
                    return false;
                }
            }
        );
        if (thereIsMeasureToFilter) {
            forEach(iterator, (i) => {
                switch (i) {
                    case "minValue":
                        measurementFilters.push(
                            <MinMeasurementSliderFilter
                                topBorder={true}
                                id={`min-${m}`}
                                title={`Min ${m}`}
                                measurementType={m}
                                description={`Tune this filter to show only cultural properties with a value for ${m} greater than the selected value.`}
                            />
                        );
                        break;
                    case "maxValue":
                        measurementFilters.push(
                            <MaxMeasurementSliderFilter
                                id={`max-${m}`}
                                title={`Max ${m}`}
                                measurementType={m}
                                description={`Tune this filter to show only cultural properties with a value for ${m} less than the selected value.`}
                            />
                        );
                        break;
                }
            });
        }
    });

    return (
        <ODPReactorContainer>
            <GoToButton
                style={{
                    background: "#6c7ae0",
                    width: "fit-content",
                    position: "absolute",
                    padding: 15,
                    marginTop: 48,
                }}
            />
            <Navbar />
            <AlertBox />
            <PatternInstancesHelpBox />
            <Grid container stackable columns={2}>
                <Grid.Column width={12}>
                    <List list={filteredKnowledgeGraph.toList()} />
                </Grid.Column>
                <Grid.Column width={4}>
                    <PatternMenu
                        showLayoutButton={false}
                        style={{ position: "absolute" }}
                    >
                        {thereIsGeoLocationToFilter && (
                            <GeoFilter
                                filteredKnowledgeGraph={filteredKnowledgeGraph}
                                topBorder={true}
                                title="On a map"
                                id="geo"
                                description="Draw an area on the map to show only cultural properties located in that area."
                            />
                        )}
                        {thereAreTypeLocationsToFilter && (
                            <LocationTypeFilter
                                topBorder={true}
                                id="locationType"
                                property="locationType"
                                title="Location Type"
                                description="Check items to show show objects with the specified location type. If no view is selected all the objects with any location type are shown."
                            />
                        )}
                        {/* {thereIsCulturalPropertyToFilter && (
                            <SinglePropertySearchBarFilter
                                title="Cultural Property"
                                propertyToSearch="culturalProperty"
                                searchBarPlaceholder="Search"
                                description="Search a specific cultural property."
                            />
                        )} */}
                        {thereIsTimeToFilter && (
                            <StartTimeIntervalFilter
                                topBorder={true}
                                title="Start Time"
                                id="startTime"
                                description="Select the minimum start time of the time interval of a location. You will see all the views with the beginning year of location in a place greater than the selected value. You can choose to include or exclude values with no specified start time value. There may be two cases: (A) the object has always been located in a place; (B) data is missing"
                            />
                        )}
                        {thereIsTimeToFilter && (
                            <EndTimeIntervalFilter
                                title="End Time"
                                id="endTime"
                                description="Select the maximum start time of the time interval of a location. You will see all the views with the ending year of location in a place less than the selected value. You can choose to include or exclude values with no specified end time value. There may be two cases: (A) the object is currently been located in the place; (B) data is missing"
                            />
                        )}
                        {thereArePartsToFilter && (
                            <MinPartCountSliderFilter
                                id="minParts"
                                title="Min Parts"
                                resourceProperty="parts"
                                description="Tune this filter to show only cultural properties with a number of components less than the selected value."
                            />
                        )}
                        {thereArePartsToFilter && (
                            <MaxPartCountSliderFilter
                                id="maxParts"
                                title="Max Parts"
                                resourceProperty="parts"
                                description="Tune this filter to show only cultural properties with a number of components less greater the selected value."
                            />
                        )}
                        {measurementFilters.length !== 0 &&
                            map(measurementFilters, (m) => {
                                return m;
                            })}
                        {measurementFilters.length !== 0 && (
                            <MinMeasurementCountSliderFilter
                                topBorder={true}
                                id="minMeasurements"
                                title="Min measurements"
                                description="Tune this filter to show only cultural properties with their number of collected measurements greater than the selected value."
                            />
                        )}
                        {measurementFilters.length !== 0 && (
                            <MaxMeasurementCountSliderFilter
                                id="maxMeasurements"
                                title="Max measurements"
                                description="Tune this filter to show only cultural properties with their number of collected measurements less than the selected value."
                            />
                        )}
                    </PatternMenu>
                </Grid.Column>
            </Grid>
        </ODPReactorContainer>
    );
}
