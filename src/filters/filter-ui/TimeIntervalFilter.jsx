import React, { useState, useEffect, useMemo, useRef } from "react";

import SliderFilter from "./SliderFilter";
import { useKGCtx } from "../../../knowledgegraph/KGCtx/useKGCtx";
import useFilter from "../../../filters/FilterCtx/useFilter";

import { FilterTimeIntervalStrategy } from "../../../filters/filter-algorithms/FilterTimeIntervalStrategy";

/**
 * node {
 *     id: uri
 *     startTime: startTime
 *     endTime: endTime
 * }
 */

TimeIntervalFilter.defaultProps = {
    id: "time",
    options: {},
};

export default function TimeIntervalFilter({ id = "time", options = {} }) {
    const { knowledgeGraph } = useKGCtx();

    // read nodes from global context
    const resources = knowledgeGraph.getResources();

    const initialFilterOptions = {
        active: false,
        filterCallback: filterAlgorithm,
    };
    const { filter, setFilterOptions } = useFilter(id, initialFilterOptions);

    // if domain not in options compute it
    const initialRange = useMemo(() => findTimeDomain(resources), [resources]);

    const [range, setRange] = useState(
        (filter && filter.getStrategyOption("range")) || initialRange
    );

    const filterAlgorithm = FilterTimeIntervalStrategy.create({ range });

    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                filterCallback: filterAlgorithm,
            });
        }
    }, [range]);

    return (
        <SliderFilter range={range} setRange={setRange} domain={initialRange} />
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
