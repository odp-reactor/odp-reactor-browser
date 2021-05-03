import React, { useState, useEffect } from "react";
import ViewController from "./ViewController";
import { useKGCtx } from "../../knowledgegraph/ctx/useKGCtx";
import useFilter from "../../filters/ctx/useFilter";
import { forEach, clone, some, every } from "lodash";
import { FilterLocationTypeStrategy } from "../../filters/filter-algorithms/FilterLocationTypeStrategy";

export default function LocationTypeFilter({
    id = "locationType",
    isActive = true,
}) {
    const { knowledgeGraph } = useKGCtx();

    const resources = knowledgeGraph.getResources();

    let filterAlgorithm;
    const initialFilterOptions = {
        active: isActive,
        hasDefaultConfig: true,

        filterCallback: filterAlgorithm,
    };
    const { filter, setFilterOptions, useResetFilter } = useFilter(
        id,
        initialFilterOptions
    );

    const defaultLocations = [];
    forEach(resources, (r) => {
        if (r.locationType && r.locationType != "") {
            if (
                !some(defaultLocations, (loc) => {
                    return loc.label === r.locationType;
                })
            ) {
                defaultLocations.push({
                    uri: r.locationType,
                    label: r.locationType,
                    checked: true,
                });
            }
        }
    });
    console.log(defaultLocations);

    const [locations, setLocations] = useState(
        (filter && filter.getStrategyOption("locations")) || defaultLocations
    );

    filterAlgorithm = FilterLocationTypeStrategy.create({
        locations: locations,
    });

    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                hasDefaultConfig: every(locations, ["checked", true]),

                filterCallback: filterAlgorithm,
            });
        }
    }, [locations]);

    useResetFilter(() => {
        setLocations(defaultLocations);
    });

    return (
        <div style={{ marginTop: 20 }}>
            <ViewController
                styles={{
                    checkboxContainer: {
                        paddingLeft: 40,
                        marginBottom: 20,
                    },
                    checkboxLabel: {
                        fontSize: 20,
                        marginLeft: 10,
                        cursor: "pointer",
                    },
                    checkboxButton: {
                        width: 20,
                        height: 20,
                        cursor: "pointer",
                    },
                }}
                classes={{
                    selectAllButton: "select-all-checkbox-button",
                }}
                availableViews={locations}
                onViewConfigurationChange={(
                    clickedViewUri,
                    clickedViewState
                ) => {
                    const newLocations = clone(locations);
                    forEach(newLocations, (location) => {
                        if (location.uri === clickedViewUri) {
                            location.checked = clickedViewState;
                        }
                    });
                    setLocations(newLocations);
                }}
                onSelectAll={() => {
                    if (
                        some(locations, (loc) => {
                            return loc.checked === false;
                        })
                    ) {
                        const newLocations = clone(locations);
                        forEach(newLocations, (location) => {
                            location.checked = true;
                        });
                        setLocations(newLocations);
                    }
                }}
                onDeselectAll={() => {
                    if (
                        some(locations, (loc) => {
                            return loc.checked === true;
                        })
                    ) {
                        const newLocations = clone(locations);
                        forEach(newLocations, (location) => {
                            location.checked = false;
                        });
                        setLocations(newLocations);
                    }
                }}
            />
        </div>
    );
}
