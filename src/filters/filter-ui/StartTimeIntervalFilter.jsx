import React, { useState, useEffect, useMemo, useRef } from "react";

import SliderFilter from "./SliderFilter";
import { useKGCtx } from "../../knowledgegraph/ctx/useKGCtx";
import useFilter from "../../filters/ctx/useFilter";
import { FilterStartTimeStrategy } from "../../filters/filter-algorithms/FilterStartTimeStrategy";
import { IncludeElementsWithMissingPropertyCheckbox } from "./IncludeElementsWithMissingPropertyCheckbox";

/**
 * node {
 *     id: uri
 *     startTime: startTime
 *     endTime: endTime
 * }
 */

StartTimeIntervalFilter.defaultProps = {
    id: "time",
    options: {},
};

export default function StartTimeIntervalFilter({ id = "time", options = {} }) {
    const { knowledgeGraph } = useKGCtx();

    // read nodes from global context
    const resources = knowledgeGraph.getResources();

    let filterAlgorithm,
        showElementsWithMissingProperty,
        setShowElementsWithMissingProperty;
    const initialFilterOptions = {
        active: true,
        filterCallback: filterAlgorithm,
        hasDefaultConfig: true,
        showElementsWithMissingProperty: showElementsWithMissingProperty,
    };
    const { filter, setFilterOptions, useResetFilter } = useFilter(
        id,
        initialFilterOptions
    );

    const defaultShowElementsWithMissingProperty =
        filter &&
        typeof filter.getStrategyOption("showElementsWithMissingProperty") !==
            "undefined"
            ? filter.getStrategyOption("showElementsWithMissingProperty")
            : true;

    [
        showElementsWithMissingProperty,
        setShowElementsWithMissingProperty,
    ] = useState(defaultShowElementsWithMissingProperty);

    // if domain not in options compute it
    const initialRange = useMemo(() => findTimeDomain(resources), [resources]);

    const [range, setRange] = useState(
        [filter && filter.getStrategyOption("startTime")] || [initialRange[0]]
    );

    filterAlgorithm = FilterStartTimeStrategy.create({
        startTime: range[0],
        showElementsWithMissingProperty: showElementsWithMissingProperty,
    });

    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                hasDefaultConfig:
                    range[0] === initialRange[0] &&
                    showElementsWithMissingProperty,
                filterCallback: filterAlgorithm,
            });
        }
    }, [range, showElementsWithMissingProperty]);

    const onChangeElementsWithMissingPropertyFlag = (checked) => {
        setShowElementsWithMissingProperty(checked);
    };

    useResetFilter(() => {
        setRange([initialRange[0]]);
        setShowElementsWithMissingProperty(true);
    });

    return (
        <div>
            <SliderFilter
                range={range}
                setRange={setRange}
                domain={initialRange}
                sliderStep={1}
            />
            <IncludeElementsWithMissingPropertyCheckbox
                styles={{
                    checkbox: {
                        marginTop: 20,
                    },
                    checkboxLabel: {
                        fontSize: 16,
                        cursor: "pointer",
                    },
                    checkboxButton: {
                        width: 20,
                        height: 20,
                        marginRight: 5,
                        cursor: "pointer",
                    },
                }}
                checked={showElementsWithMissingProperty}
                onChange={onChangeElementsWithMissingPropertyFlag}
            />
        </div>
    );
}

function findTimeDomain(arr) {
    let min, max;
    for (let i = 1, len = arr.length; i < len; i++) {
        if (arr[i].startTime) {
            let s = Number.parseInt(arr[i].startTime);
            if (min === undefined) min = s;
            else min = s < min ? s : min;
        }
        if (arr[i].endTime) {
            let e = Number.parseInt(arr[i].endTime);
            if (max === undefined) max = e;
            else max = e > max ? e : max;
        }
    }
    return [min, max];
}
