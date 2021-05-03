import React from "react";
import { useKGCtx } from "../../knowledgegraph/ctx/useKGCtx";
import RightGenericSliderFilter from "./RightGenericSliderFilter";

export default function MaxPartCountSliderFilter({}) {
    const { knowledgeGraph } = useKGCtx();
    return (
        <RightGenericSliderFilter
            resources={knowledgeGraph.getResources()}
            id="maxParts"
            resourceProperty="parts"
            sliderStep={1}
        />
    );
}
