import React, { useState, useEffect } from "react";
import useFilter from "../ctx/useFilter";
import SliderFilter from "./SliderFilter";

import { findSliderDomain } from "./findSliderDomain";
import { FilterMinValueStrategy } from "../filter-algorithms/FilterMinValueStrategy";
import { decimalPlaces } from "../../base/math";

export default function LeftGenericSliderFilter({
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
    defaultRange = defaultRange ? defaultRange : [initialRange[0]];
    const [range, setRange] = useState(
        filter && filter.getStrategyOption("minValue")
            ? [filter && filter.getStrategyOption("minValue")]
            : defaultRange
    );

    filterAlgorithm = FilterMinValueStrategy.create({
        resourceProperty,
        resourceType: resourceTypeFilterHasEffectOn,
        minValue: range[0],
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

    useEffect(() => {
        if (filter && !filter.getOption("filterCallback")) {
            setFilterOptions({
                ...filter.options,
                hasDefaultConfig: range[0] === defaultRange[0],
                filterCallback: filterAlgorithm,
            });
        }
    }, [filterAlgorithm]);

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
            sliderStep={sliderStep}
        />
    );
}
