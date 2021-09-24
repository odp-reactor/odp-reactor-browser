import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

import { Map, TileLayer, FeatureGroup, GeoJSON } from "react-leaflet";
import { GeoAddressLookupBar } from "./GeoAddressLookupBar"
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";

import hash from 'object-hash';

import { useKGCtx } from "../../knowledgegraph/ctx/useKGCtx";
import useFilter from "../../filters/ctx/useFilter";

import { cloneDeep } from "lodash";

import { Icon, Button } from "semantic-ui-react";

import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet-draw/dist/leaflet.draw.css";
import { blueMarkerIcon } from "../../base/icon/ld-ui-icon";

import { FilterOnMapStrategy } from "../../filters/filter-algorithms/FilterOnMapStrategy";
import { useAlertCtx } from "../../base/alert/ctx/useAlertCtx";

const circleToPolygon = require("circle-to-polygon");
const numberOfEdges = 64;
/**
 * node {
 *     id: uri
 *     lat: latitude
 *     long: longitude
 * }
 */

GeoFilter.defaultProps = {
    id: "geo",
    options: {},
};

const POLYGON_CREATED = 1;
const SHAPE_DELETED = 2;

export default function GeoFilter({ id = "geo", options = {}, filteredKnowledgeGraph }) {
    const startDrawFlag = "Start draw";
    const stopDrawFlag = "Stop Draw";
    const [mapUIState, setMapUI] = useState(startDrawFlag);
    const [mapState, setMapState] = useState(null);
    const mapRef = useRef();
    const groupRef = useRef()
    const editRef = useRef();

    const {showAlert} = useAlertCtx()

    const ZOOM_LEVEL = 12;
    const MAX_ZOOM = 9;
    const [center, setCenter] = useState({ lat: 24.2, lng: 54.37 });

    const [enlarged, setEnlarged] = useState(false);

    // This code is needed to listen for change on geo button filter class -> change is triggered on opening button
    // Once it opens the resize event is dispatched. This is needed to solve an issue with leaflet
    // if leaflet map container has style display:none it doesn't size properly tiles
    // we did this to mantain decoupled menu button and filter
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutationRecord) {
            console.log("Dispatch resize shit!!!!!!!");
            window.dispatchEvent(new Event("resize"));
        });
    });
    var target = document.getElementsByClassName(`${id}-filter-button`)[0];
    if (target) {
        observer.observe(target, {
            attributes: true,
            attributeFilter: ["class"],
        });
    }
    var target2 = document.getElementsByClassName("enlarge-map-button")[0];
    if (target2) {
        observer.observe(target2, {
            attributes: true,
            attributeFilter: ["class"],
        });
    }

    const resources = filteredKnowledgeGraph.getResources();

    let filterAlgorithm;
    const initialFilterOptions = {
        active: true,
        filterCallback: filterAlgorithm,
        hasDefaultConfig: true,
    };

    const { filter, setFilterOptions, useResetFilter } = useFilter(
        id,
        initialFilterOptions
    );

    const initialFeatureGroup = { type: "FeatureCollection", features: [] };

    const [featureGroup, setFeatureGroup] = useState(
        (filter && filter.getStrategyOption("featureGroup")) ||
            initialFeatureGroup
    );

    const thereIsActiveSelection =
        featureGroup &&
        featureGroup.features &&
        featureGroup.features.length > 0;

    filterAlgorithm = FilterOnMapStrategy.create({
        featureGroup,
    });

    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                hasDefaultConfig:
                    featureGroup &&
                    featureGroup.features &&
                    featureGroup.features.length === 0,
                filterCallback: filterAlgorithm,
            });
        }
    }, [featureGroup]);

    const isSearchBarLayer = (layer) => {
        // bbox is a prop returned from nominatim.openstreetmap API
        // this is a shit approach to detect the address layer
        return layer.feature && layer.feature.bbox
    }

    // prepare map
    useEffect(() => {
        if (mapRef.current) {
            const map = mapRef.current.leafletElement;
            const mcg = L.markerClusterGroup();

            let searchBarLayer;

            // we use this id to remove previous layer and add new one
            mcg.deleteId = "marker-data-layer-to-replace"
            map.eachLayer((layer) => {

                if (isSearchBarLayer(layer)) {
                    searchBarLayer = layer
                }

                if (layer.deleteId === "marker-data-layer-to-replace") {
                    map.removeLayer(layer)
                }
            })

            mcg.clearLayers();

            resources.forEach((node) => {
                if (node.lat && node.long) {
                    L.marker([node.lat, node.long], {
                        icon: blueMarkerIcon,
                    }).addTo(mcg);
                    // .bindPopup(L.popup().setContent(customPopup).setLatLng([node.lat, node.long]))
                }
            });
            map.addLayer(mcg);
            try {
                // if there are nodes fit to them
                if (resources.length > 0) {
                    map.fitBounds(mcg.getBounds(), {
                    padding: [20, 20],
                    maxZoom: 8,
                    });
                } else {
                    // if there are no nodes try to fit to searched area to show user the area
                    map.fitBounds(searchBarLayer.getBounds())
                }
            } catch(e) {
                console.log(e)
            }
        }
    }, [mapRef, filteredKnowledgeGraph]);

    useEffect(()=>{

        // this effect runs when map is elarged or moved back
        // it recreates virtually the markerclusterlayer with points
        // and fit the map to virtual layer bounds
        // thus when you open/close the map it always feet points 

        if (mapRef.current) {
            const map = mapRef.current.leafletElement;
            const mcg = L.markerClusterGroup();
            mcg.clearLayers();
            resources.forEach((node) => {
                if (node.lat && node.long) {
                    L.marker([node.lat, node.long], {
                        icon: blueMarkerIcon,
                    }).addTo(mcg);
                    // .bindPopup(L.popup().setContent(customPopup).setLatLng([node.lat, node.long]))
                }
            });
            try {
                map.fitBounds(mcg.getBounds(), {
                    padding: [20, 20],
                    maxZoom: 8,
                });
            } catch(e) {
                console.log(e)
            }
        }
    }, [enlarged])

    const onFilterCreated = (e) => {
        const l = e.layer;
        let newFeature = l.toGeoJSON();
        newFeature.properties.id = L.stamp(l);
        // add id
        if (l instanceof L.Circle) {
            const radius = l.getRadius();
            const center = l.getLatLng();
            let polygon = circleToPolygon(
                [center.lng, center.lat],
                radius,
                numberOfEdges
            );
            newFeature.geometry = polygon;
        }

        let newFeatureGroup = cloneDeep(featureGroup);
        newFeatureGroup.features.push(newFeature);
        setFeatureGroup(newFeatureGroup);
    };

    const onEdited = (e) => {
        let newFeatureGroup = cloneDeep(featureGroup);
        e.layers.eachLayer((l) => {
            let newFeature = l.toGeoJSON();
            const id = L.stamp(l);
            newFeature.properties.id = id;
            if (l instanceof L.Circle) {
                const radius = l.getRadius();
                const center = l.getLatLng();
                let polygon = circleToPolygon(
                    [center.lng, center.lat],
                    radius,
                    numberOfEdges
                );
                newFeature.geometry = polygon;
            }
            // remove modified feature by id
            newFeatureGroup.features = newFeatureGroup.features.filter((f) => {
                return f.properties.id !== id;
            });
            newFeatureGroup.features.push(newFeature);
        });
        setFeatureGroup(newFeatureGroup);
    };

    const onDeleted = (e) => {
        // with the commented approach there are problems with session featureGroup
        // cancel remove them by leaflet map (html), but are not removed by sessionStorage
        // as cancel is cancel all
        // we reinitialize the layer to 0 featureGroups

        // let newFeatureGroup = cloneDeep(featureGroup);
        // e.layers.eachLayer((l) => {
        //     const id = L.stamp(l);
        //     // remove modified feature by id
        //     newFeatureGroup.features = newFeatureGroup.features.filter((f) => {
        //         return f.properties.id !== id;
        //     });
        // });
        setFeatureGroup(initialFeatureGroup);
    };

    const onCreated = (e) => {
        setMapState({ id: POLYGON_CREATED, e: e });
    };

    // update filter
    useEffect(() => {
        if (mapState) {
            if (mapState.id === POLYGON_CREATED) {
                onFilterCreated(mapState.e);
            }
            if (mapState.id === SHAPE_DELETED) {
                onDeleted();
            }
        }
    }, [mapState]);
    // update UI
    useLayoutEffect(() => {
        if (mapState) {
            if (mapState.id === POLYGON_CREATED) {
                setMapUI(startDrawFlag);
            }
        }
    }, [mapState]);

    // open whole screen map if enlarged
    const fullScreenStyle = enlarged
        ? { position: "fixed", top: 0, left: 0 }
        : { position: "relative" };

    // useEffect(() => {
    //     setTimeout(function () {
    //         mapRef.current.leafletElement.invalidateSize();
    //     }, 400);
    //     // mapRef.current.leafletElement.invalidateSize();
    // }, [enlarged]);

    // use this with reset button outside of the React draw leaflet editor
    const clearNotWithLibraryButton = () => {
        // startDelete
        editRef.current.leafletElement._toolbars.edit._modes.remove.handler.enable();
        // saveDelete
        editRef.current.leafletElement._toolbars.edit._modes.remove.handler.removeAllLayers();
        editRef.current.leafletElement._toolbars.edit._modes.remove.handler.disable();
        setMapState({ id: SHAPE_DELETED, e: null });
    }

    useResetFilter(clearNotWithLibraryButton);


    return (
        <div>
        <div style={{
            cursor: !enlarged ? "pointer" : ""
        }}
        onClick={() => {
            if (!enlarged)
                setEnlarged(true)
        }}
        className={`enlarge-map-button ${
            enlarged ? "dispatch-map-resize" : ""
        }`}
        >
            <Map
                zoomControl={false}
                center={center}
                zoom={ZOOM_LEVEL}
                maxZoom={MAX_ZOOM}
                ref={mapRef}
                attributionControl={false}
                id="leaflet-map"
                style={{
                    ...fullScreenStyle,
                    border: "2px solid rgb(54, 48, 74)",
                    borderRadius: 4,
                    zIndex: 4,
                    pointerEvents: !enlarged ? "none" : "auto"
                }}
            >
                <FeatureGroup
                    ref={groupRef}
                >
                    <EditControl
                        ref={editRef}
                        position="topright"
                        onCreated={onCreated}
                        onEdited={onEdited}
                        onDeleted={onDeleted}
                        draw={{
                            rectangle: false,
                            polyline: false,
                            circlemarker: false,
                            marker: false,
                            circle: true,
                            polygon: true,
                        }}
                    />
                    <GeoJSON key={hash(featureGroup)} data={featureGroup} color="blue"/>
                </FeatureGroup>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                {/* <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> */}
            </Map>
            {enlarged && (
                <div
                    className="map-button close-button"
                    onClick={() => {
                        setEnlarged(false);
                    }}
                >
                    <Icon name="arrow left" /> See results
                </div>
            )}
            {enlarged && (
                <div className="button-container">
                    <div
                        className="map-button edit-button"
                        onClick={() => {
                            if (mapUIState === startDrawFlag) {
                                // change circle to polygon to change editing style
                                editRef.current.leafletElement._toolbars.draw._modes.circle.handler.enable();
                                setMapUI(stopDrawFlag);
                            }
                            if (mapUIState === stopDrawFlag) {
                                try {
                                    editRef.current.leafletElement._toolbars.draw._modes.circle.handler.completeShape();
                                    editRef.current.leafletElement._toolbars.draw._modes.circle.handler.disable();
                                } catch (err) {
                                    editRef.current.leafletElement._toolbars.draw._modes.circle.handler.disable();
                                    console.log(err)
                                }
                                setMapUI(startDrawFlag);
                            }
                        }}
                    >
                        {mapUIState}
                    </div>
                    {featureGroup.features.length > 0 && (
                        <div
                            className="map-button delete-button"
                            onClick={() => {
                                // startDelete
                                editRef.current.leafletElement._toolbars.edit._modes.remove.handler.enable();
                                // saveDelete
                                editRef.current.leafletElement._toolbars.edit._modes.remove.handler.removeAllLayers();
                                editRef.current.leafletElement._toolbars.edit._modes.remove.handler.disable();
                                setMapState({ id: SHAPE_DELETED, e: null });
                            }}
                        >
                            Clear Map
                        </div>
                    )}
                </div>
            )}
            {
                enlarged &&             
                <div
                    className="map-button search-map-button"

                        style={{
                        // display: "flex",
                        // flexDirection: "row",
                        // flexFlow: "wrap",
                        // marginTop: 20,
                        // zIndex: enlarged ? 100 : false
                    }}
                >
                    <GeoAddressLookupBar searchBarPlaceholder="search" onResult={(feature)=>{
                        const freshNewFeatureGroup = { type: "FeatureCollection", features: [] };
                        freshNewFeatureGroup.features.push(feature);
                        setFeatureGroup(freshNewFeatureGroup);
                    }}
                    onResultNotFound={(address)=>{
                        showAlert(`Address ${address} is not valid`, true)
                    }}/>
                </div>

            }
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexFlow: "wrap",
                    marginTop: 20,
                    // zIndex: enlarged ? 100 : false
                }}
            >
                <GeoAddressLookupBar searchBarPlaceholder="search" onResult={(feature)=>{
                    const freshNewFeatureGroup = { type: "FeatureCollection", features: [] };
                    freshNewFeatureGroup.features.push(feature);
                    setFeatureGroup(freshNewFeatureGroup);
                }}
                onResultNotFound={(address)=>{
                    showAlert(`Address ${address} is not valid`, true)
                }}
                />
                {thereIsActiveSelection && <div style={{marginLeft: 20}}><Button onClick={clearNotWithLibraryButton} color="red">Clear</Button></div>}
            </div>
        </div>
    );
}
