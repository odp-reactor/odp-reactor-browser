import React, { useState, useEffect, useMemo } from "react";
import useFilter from "../ctx/useFilter";
import SliderFilter from "./SliderFilter";

import {findSliderDomain} from "./findSliderDomain";
import { FilterIntervalStrategy } from "../filter-algorithms/FilterIntervalStrategy";
import { decimalPlaces } from "../../base/math";

export default function GenericSliderFilter({
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
    doubleHandle,
    withInputBox=false
}) {
    let filterAlgorithm
    const initialFilterOptions = {
        active: isActive,
        filterCallback: filterAlgorithm,
        hasDefaultConfig: true
    };
    const { filter, setFilterOptions, useResetFilter } = useFilter(id, initialFilterOptions);

    const initialRange = findSliderDomain(resources, resourceProperty);
    defaultRange = defaultRange ? defaultRange : initialRange;
    const [range, setRange] = useState(
        (filter && filter.getStrategyOption("range")) ||
            defaultRange ||
            initialRange
    );

    filterAlgorithm = FilterIntervalStrategy.create({
        resourceProperty,
        resourceType: resourceTypeFilterHasEffectOn,
        range,
    });

    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                filterCallback: filterAlgorithm,
                hasDefaultConfig: range[0] === defaultRange[0] && range[1] === defaultRange[1]
            });
        }
    }, [range]);

    useResetFilter(() => {
        setRange(initialRange);
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
            doubleHandle={doubleHandle}
            withInputBox={withInputBox}
        />
    );
}
