import React from "react";
import PatternMenu from "../../layout/PatternMenu";
import List from "../../layout/List";
import ODPReactorContainer from "../../layout/ODPReactorContainer";
import GeoFilter from "../../filters/filter-ui/GeoFilter";
import MinMeasurementSliderFilter from "../../filters/filter-ui/MinMeasurementSliderFilter";
import MaxMeasurementSliderFilter from "../../filters/filter-ui/MaxMeasurementSliderFilter";
import MeasurementSliderFilter from "../../filters/filter-ui/MeasurementSliderFilter";
import MaxMeasurementCountSliderFilter from "../../filters/filter-ui/MaxMeasurementCountSliderFilter";
import MinMeasurementCountSliderFilter from "../../filters/filter-ui/MinMeasurementCountSliderFilter";
import MinPartCountSliderFilter from "../../filters/filter-ui/MinPartCountSliderFilter";
import MaxPartCountSliderFilter from "../../filters/filter-ui/MaxPartCountSliderFilter";
import MeasurementCountSliderFilter from "../../filters/filter-ui/MeasurementCountSliderFilter"
import PartCountSliderFilter from "../../filters/filter-ui/PartCountSliderFilter";
import hasResourceToFilter from "../../filters/filter-ui/hasResourceToFilter";
import { useKGCtx } from "../../knowledgegraph/ctx/useKGCtx";
import { forEach, map } from "lodash";
import AlertBox from "../../base/alert/AlertBox";
import { Grid } from "semantic-ui-react";
import { Navbar } from "../../layout/Navbar";
import GoToButton from "../../layout/GoToButton";
import PatternInstancesHelpBox from "../../base/help/PatternInstancesHelpBox";
import LocationTypeFilter from "../../filters/filter-ui/LocationTypeFilter";
import TimeIntervalFilter from "../../filters/filter-ui/TimeIntervalFilter";
import SinglePropertySearchBarFilter from "../../filters/filter-ui/SinglePropertySearchBarFilter";

export default function PatternInstancesScreen({ filteredKnowledgeGraph }) {
    const { knowledgeGraph } = useKGCtx();


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
            measurementFilters.push(
                <MeasurementSliderFilter 
                    topBorder={true}
                    id={`measurement-${m}`}
                    title={`${m}`}
                    measurementType={m}
                    description={`Tune this filter to show only cultural properties with a value for ${m} in the selected interval.`}
                />
            )
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
                            <TimeIntervalFilter
                                topBorder={true}
                                title="Time Interval"
                                id="time"
                                description="Select the minimum start time of the time interval of a location. You will see all the views with the beginning year of location in a place greater than the selected value. You can choose to include or exclude values with no specified start time value. There may be two cases: (A) the object has always been located in a place; (B) data is missing"
                            />
                        )}
                        {thereArePartsToFilter &&
                            <PartCountSliderFilter 
                                id="parts"
                                title="Number of Parts"
                                resourceProperty="parts"
                                description="Tune this filter to show only cultural properties with a number of components in the selected interval."
                            />
                        }
                        {measurementFilters.length !== 0 &&
                            map(measurementFilters, (m) => {
                                return m;
                            })}
                        {measurementFilters.length !== 0 && (
                            <MeasurementCountSliderFilter
                                topBorder={true}
                                id="measurementCount"
                                title="Number of measurements"
                                description="Tune this filter to show only cultural properties with their number of collected measurements in the selected interval."
                            />
                        )}
                    </PatternMenu>
                </Grid.Column>
            </Grid>
        </ODPReactorContainer>
    );
}
