import React from "react";
import { useKGCtx } from "../../knowledgegraph/ctx/useKGCtx";
import LeftGenericSliderFilter from "./LeftGenericSliderFilter";

export default function MinMeasurementCountSliderFilter({}) {
    const { knowledgeGraph } = useKGCtx();
    return (
        <LeftGenericSliderFilter
            resources={knowledgeGraph.getResources()}
            id="minMeasurements"
            resourceProperty="measures"
            sliderStep={1}
        />
    );
}
