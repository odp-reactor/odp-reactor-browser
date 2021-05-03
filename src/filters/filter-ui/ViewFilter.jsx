import React, { useState, useEffect } from "react";
import ViewController from "./ViewController";
import { useKGCtx } from "../../knowledgegraph/ctx/useKGCtx";
import useFilter from "../../filters/ctx/useFilter";
import { forEach, clone, some, filter as lodashFilter, every } from "lodash";
import { FilterResourceByViewStrategy } from "../../filters/filter-algorithms/FilterResourceByViewStrategy";

export default function ViewFilter({
    title = "Filter by available views",
    id = "viewFilter",
    description = "Filter description",
    isActive = true,
}) {
    const { knowledgeGraph } = useKGCtx();

    const resources = knowledgeGraph.getResources();

    let filterAlgorithm;
    const initialFilterOptions = {
        active: isActive,
        filterCallback: filterAlgorithm,
        hasDefaultConfig: true,
    };
    const { filter, setFilterOptions, useResetFilter } = useFilter(
        id,
        initialFilterOptions
    );

    const defaultAvailableViews = [];
    forEach(resources, (r) => {
        const patternInstances = r.patternInstances;
        forEach(patternInstances, (patternInstance) => {
            if (
                !some(defaultAvailableViews, (defaultAvailableView) => {
                    return defaultAvailableView.uri === patternInstance.type;
                })
            ) {
                defaultAvailableViews.push({
                    uri: patternInstance.type,
                    label: patternInstance.typeLabel,
                    checked: true,
                }); // initialized with default checked value to true
            }
        });
    });

    const [availableViews, setAvailableViews] = useState(
        (filter && filter.getStrategyOption("views")) || defaultAvailableViews
    );

    console.log("Available views:", availableViews);
    filterAlgorithm = FilterResourceByViewStrategy.create({
        views: availableViews,
    });

    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                hasDefaultConfig: every(availableViews, ["checked", true]),
                filterCallback: filterAlgorithm,
            });
        }
    }, [availableViews]);

    useResetFilter(() => {
        setAvailableViews(defaultAvailableViews);
    });

    return (
        <div style={{ marginTop: 20 }}>
            <ViewController
                classes={{
                    selectAllButton: "select-all-checkbox-button",
                }}
                styles={{
                    checkboxContainer: {
                        marginBottom: 20,
                        paddingLeft: 70,
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
                availableViews={availableViews}
                onViewConfigurationChange={(
                    clickedViewUri,
                    clickedViewState
                ) => {
                    const newAvailableViews = clone(availableViews);
                    forEach(availableViews, (availableView) => {
                        if (availableView.uri === clickedViewUri) {
                            availableView.checked = clickedViewState;
                        }
                    });
                    setAvailableViews(newAvailableViews);
                }}
                onSelectAll={() => {
                    if (
                        some(availableViews, (view) => {
                            return view.checked === false;
                        })
                    ) {
                        const newAvailableViews = clone(availableViews);
                        forEach(availableViews, (availableView) => {
                            availableView.checked = true;
                        });
                        setAvailableViews(newAvailableViews);
                    }
                }}
                onDeselectAll={() => {
                    if (
                        some(availableViews, (view) => {
                            return view.checked === true;
                        })
                    ) {
                        const newAvailableViews = clone(availableViews);
                        forEach(availableViews, (availableView) => {
                            availableView.checked = false;
                        });
                        setAvailableViews(newAvailableViews);
                    }
                }}
            />
        </div>
    );
}
