import React, { useState, useEffect } from "react";
import ViewController from "./ViewController";
import { useKGCtx } from "../../knowledgegraph/ctx/useKGCtx";
import useFilter from "../ctx/useFilter";
import { forEach, clone, map, some, every } from "lodash";
import { FilterPatternStrategy } from "../filter-algorithms/FilterPatternStrategy";

export default function PatternFilter({ id = "patternPie", isActive = true }) {
    // get knowledge graph and resources to analyze
    const { knowledgeGraph } = useKGCtx();
    const patterns = knowledgeGraph.getPatterns();

    let filterAlgorithm;
    // set default filter options
    const initialFilterOptions = {
        active: isActive,
        filterCallback: filterAlgorithm,
        hasDefaultConfig: true,
    };
    // get filter component or create it for the first time
    const { filter, setFilterOptions, useResetFilter } = useFilter(
        id,
        initialFilterOptions
    );

    // compute initial arguments for filter
    const defaultCheckboxItemPatterns = map(patterns, (p) => {
        return { uri: p.uri, checked: true, label: p.label };
    });

    // set as state first argument for filter
    const [checkboxItemPatterns, setCheckboxItemPatterns] = useState(
        (filter && filter.getStrategyOption("patterns")) ||
            defaultCheckboxItemPatterns
    );

    // create filter strategy based on first calculated or saved arguments
    filterAlgorithm = FilterPatternStrategy.create({
        patterns: checkboxItemPatterns,
    });

    // update filter when arguments change
    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                hasDefaultConfig: every(checkboxItemPatterns, [
                    "checked",
                    true,
                ]),
                filterCallback: filterAlgorithm,
            });
        }
    }, [checkboxItemPatterns]);

    useResetFilter(() => {
        setCheckboxItemPatterns(defaultCheckboxItemPatterns);
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
                        paddingLeft: 40,
                    },
                    checkboxLabel: {
                        fontSize: 20,
                        marginLeft: 0,
                        cursor: "pointer",
                    },
                    checkboxButton: {
                        width: 20,
                        height: 20,
                        cursor: "pointer",
                    },
                }}
                availableViews={checkboxItemPatterns}
                onViewConfigurationChange={(
                    clickedViewUri,
                    clickedViewState
                ) => {
                    const newCheckboxItemPatterns = clone(checkboxItemPatterns);
                    forEach(checkboxItemPatterns, (checkboxItem) => {
                        if (checkboxItem.uri === clickedViewUri) {
                            checkboxItem.checked = clickedViewState;
                        }
                    });
                    setCheckboxItemPatterns(newCheckboxItemPatterns);
                }}
                onSelectAll={() => {
                    if (
                        some(checkboxItemPatterns, (p) => {
                            return p.checked === false;
                        })
                    ) {
                        const newCheckboxItemPatterns = clone(
                            checkboxItemPatterns
                        );
                        forEach(newCheckboxItemPatterns, (checkboxItem) => {
                            checkboxItem.checked = true;
                        });
                        setCheckboxItemPatterns(newCheckboxItemPatterns);
                    }
                }}
                onDeselectAll={() => {
                    if (
                        some(checkboxItemPatterns, (p) => {
                            return p.checked === true;
                        })
                    ) {
                        const newCheckboxItemPatterns = clone(
                            checkboxItemPatterns
                        );
                        forEach(newCheckboxItemPatterns, (checkboxItem) => {
                            checkboxItem.checked = false;
                        });
                        setCheckboxItemPatterns(newCheckboxItemPatterns);
                    }
                }}
            />
        </div>
    );
}
