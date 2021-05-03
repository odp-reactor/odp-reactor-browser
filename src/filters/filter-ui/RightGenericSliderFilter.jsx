import React, { useState, useEffect } from "react";
import useFilter from "../ctx/useFilter";
import SliderFilter from "./SliderFilter";

import { findSliderDomain } from "./findSliderDomain";
import { FilterMaxValueStrategy } from "../filter-algorithms/FilterMaxValueStrategy";
import { decimalPlaces } from "../../base/math";

export default function RightGenericSliderFilter({
    id = "genericSlider",
    resourceProperty,
    resources = [],
    isActive = true,
    defaultRange,
    resourceTypeFilterHasEffectOn,
    formatTicks = (d) => {
        const decimals = decimalPlaces(d);
        return `${decimals > 1 ? d.toPrecision(2) : d}`;
    },
    sliderStep = 0.1,
}) {
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

    const initialRange = findSliderDomain(resources, resourceProperty);
    defaultRange = defaultRange || [initialRange[1]];
    const [range, setRange] = useState(
        [filter && filter.getStrategyOption("maxValue")] || defaultRange
    );

    filterAlgorithm = FilterMaxValueStrategy.create({
        resourceProperty,
        resourceType: resourceTypeFilterHasEffectOn,
        maxValue: range[0],
    });

    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                hasDefaultConfig: range[0] === defaultRange[0],
                filterCallback: filterAlgorithm,
            });
        }
    }, [range]);

    useResetFilter(() => {
        setRange(defaultRange);
    });

    if (resources.length < 2) {
        return null;
    }

    return (
        <SliderFilter
            range={range}
            setRange={setRange}
            domain={initialRange}
            formatTicks={formatTicks}
            reversed={true}
            sliderStep={sliderStep}
        />
    );
}
