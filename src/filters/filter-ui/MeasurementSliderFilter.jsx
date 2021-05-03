import React, { useState, useEffect } from "react";

import { useKGCtx } from "../../../knowledgegraph/KGCtx/useKGCtx";
import useFilter from "../../../filters/FilterCtx/useFilter";
import SliderFilter from "./SliderFilter";

import { findSliderDomain } from "./findSliderDomain";

import { find } from "lodash";

import Qty from "js-quantities";
import { FilterIntervalStrategy } from "../../../filters/filter-algorithms/FilterIntervalStrategy";
import { decimalPlaces } from "../../../utilities/math";

const MIN = 0;
const MAX = 1;

export default function MeasurementSliderFilter({
    id = "slider",
    options = {},
    measurementType,
}) {
    const formatTicks = (d) => {
        const decimals = decimalPlaces(d);
        return `${decimals > 1 ? d.toPrecision(2) : d} ${measurementUnit}`;
        // return Qty(`${d} ${measurementUnit}`).format("m");
    };

    const { knowledgeGraph } = useKGCtx();

    const resources = knowledgeGraph.getResources();

    const measurementUnitKey = `${measurementType}MeasurementUnit`;
    const measurementUnit = find(resources, (r) => {
        return r[measurementUnitKey];
    })[measurementUnitKey];

    const initialFilterOptions = {
        active: false,
        filterCallback: filterAlgorithm,
    };

    const { filter, setFilterOptions } = useFilter(id, initialFilterOptions);

    const initialRange = findSliderDomain(resources, measurementType);

    const [range, setRange] = useState(
        (filter && filter.getStrategyOption("range")) || initialRange
    );
    const filterAlgorithm = FilterIntervalStrategy.create({
        range,
        resourceProperty: measurementType,
    });

    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                filterCallback: filterAlgorithm,
            });
        }
    }, [range]);

    if (resources.length < 2) {
        return null;
    }

    return (
        <SliderFilter
            range={range}
            setRange={setRange}
            domain={initialRange}
            formatTicks={formatTicks}
        />
    );
}
