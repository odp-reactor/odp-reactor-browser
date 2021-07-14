import React, { useState, useEffect } from "react";

import { useKGCtx } from "../../knowledgegraph/ctx/useKGCtx";
import useFilter from "../ctx/useFilter";
import SliderFilter from "./SliderFilter";

import { findSliderDomain } from "./findSliderDomain";

import { find } from "lodash";

import Qty from "js-quantities";
import { FilterIntervalStrategy } from "../filter-algorithms/FilterIntervalStrategy";
import { IncludeElementsWithMissingPropertyCheckbox } from "./IncludeElementsWithMissingPropertyCheckbox";
import { decimalPlaces } from "../../base/math";
 
const MIN = 0;
const MAX = 1;

export default function MeasurementSliderFilter({
    id = "slider",
    options = {},
    measurementType,
}) {

    let filterAlgorithm, 
        showElementsWithMissingProperty, 
        setShowElementsWithMissingProperty;

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
        filterCallback: filterAlgorithm,
        active: true,
        showElementsWithMissingProperty: showElementsWithMissingProperty,

    };

    const { filter, setFilterOptions, useResetFilter } = useFilter(id, initialFilterOptions);

    const defaultShowElementsWithMissingProperty =
    filter &&
    typeof filter.getStrategyOption("showElementsWithMissingProperty") !==
        "undefined"
        ? filter.getStrategyOption("showElementsWithMissingProperty")
        : true;

    [showElementsWithMissingProperty,
        setShowElementsWithMissingProperty,
    ] = useState(
        defaultShowElementsWithMissingProperty
    );

    const initialRange = findSliderDomain(resources, measurementType);

    const [range, setRange] = useState(
        (filter && filter.getStrategyOption("range")) || initialRange
    );
    filterAlgorithm = FilterIntervalStrategy.create({
        range,
        resourceProperty: measurementType,
        showElementsWithMissingProperty: showElementsWithMissingProperty,
    });

    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                hasDefaultConfig:
                    range[0] === initialRange[0] && range[1] === initialRange[1] &&
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
            setRange(initialRange);
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
            doubleHandle={true}
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
