import React, { useState, useEffect } from "react";

import { useKGCtx } from "../../knowledgegraph/ctx/useKGCtx";
import useFilter from "../../filters/ctx/useFilter";
import SliderFilter from "./SliderFilter";

import { findSliderDomain } from "./findSliderDomain";

import { find } from "lodash";

import { FilterMinValueStrategy } from "../../filters/filter-algorithms/FilterMinValueStrategy";
import { decimalPlaces } from "../../base/math";

const MIN = 0;
const MAX = 1;

export default function MinMeasurementSliderFilter({
    id = "minMeasurement",
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

    let filterAlgorithm, showElementsWithMissingProperty;
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

    [showElementsWithMissingProperty] = useState(
        defaultShowElementsWithMissingProperty
    );

    const initialRange = findSliderDomain(resources, measurementType);

    const [range, setRange] = useState(
        [filter && filter.getStrategyOption("minValue")] || [initialRange[0]]
    );
    filterAlgorithm = FilterMinValueStrategy.create({
        minValue: range[0],
        resourceProperty: measurementType,
        showElementsWithMissingProperty: showElementsWithMissingProperty,
    });

    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                hasDefaultConfig: range[0] === initialRange[0],
                filterCallback: filterAlgorithm,
            });
        }
    }, [range, showElementsWithMissingProperty]);

    

    useResetFilter(() => {
        if (filter) {
            setRange([initialRange[0]]);
        }
    });

    if (resources.length < 2) {
        return null;
    }

    return (
        <div>
            <SliderFilter
                range={range}
                setRange={setRange}
                domain={initialRange}
                formatTicks={formatTicks}
            />
            {/* <IncludeElementsWithMissingPropertyCheckbox
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
            /> */}
        </div>
    );
}
