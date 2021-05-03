import React, { useState, useEffect } from "react";

import { useKGCtx } from "../../knowledgegraph/ctx/useKGCtx";
import useFilter from "../../filters/ctx/useFilter";
import SliderFilter from "./SliderFilter";

import { findSliderDomain } from "./findSliderDomain";

import { find } from "lodash";

import { FilterMaxValueStrategy } from "../../filters/filter-algorithms/FilterMaxValueStrategy";
import { IncludeElementsWithMissingPropertyCheckbox } from "./IncludeElementsWithMissingPropertyCheckbox";
import { decimalPlaces } from "../../base/math";

const MIN = 0;
const MAX = 1;

export default function MaxMeasurementSliderFilter({
    id = "maxMeasurement",
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

    const initialRange = findSliderDomain(resources, measurementType);

    const [range, setRange] = useState(
        [filter && filter.getStrategyOption("maxValue")] || [initialRange[1]]
    );
    filterAlgorithm = FilterMaxValueStrategy.create({
        maxValue: range[0],
        resourceProperty: measurementType,
        showElementsWithMissingProperty: showElementsWithMissingProperty,
    });

    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                hasDefaultConfig:
                    range[0] === initialRange[1] &&
                    showElementsWithMissingProperty,
                filterCallback: filterAlgorithm,
            });
        }
    }, [range, showElementsWithMissingProperty]);

    const onChangeElementsWithMissingPropertyFlag = (checked) => {
        setShowElementsWithMissingProperty(checked);
    };

    useResetFilter(() => {
        if (filter) {
            setShowElementsWithMissingProperty(true);
            setRange([initialRange[1]]);
        }
    });

    if (resources.length < 2) {
        return null;
    }

    console.log("SHOW ELEMENTS:", showElementsWithMissingProperty);

    return (
        <div>
            <SliderFilter
                range={range}
                setRange={setRange}
                domain={initialRange}
                formatTicks={formatTicks}
                reversed={true}
            />
            <IncludeElementsWithMissingPropertyCheckbox
                propertyName={measurementType}
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
