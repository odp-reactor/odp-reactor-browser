import React from "react";
import { useKGCtx } from "../../knowledgegraph/ctx/useKGCtx";

import GenericSliderFilter from "./GenericSliderFilter";

export default function MeasurementCountSliderFilter({}) {
    const { knowledgeGraph } = useKGCtx();

    return (
        <GenericSliderFilter
            resources={knowledgeGraph.getResources()}
            id="measurements"
            resourceProperty="measures"
            doubleHandle={true}
            sliderStep={1}
        />
    );
}
