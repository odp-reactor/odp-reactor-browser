import React from "react";
import { useKGCtx } from "../../knowledgegraph/ctx/useKGCtx";

import RightGenericSliderFilter from "./RightGenericSliderFilter";

export default function RightOccurencesSliderFilter({}) {
    const { knowledgeGraph } = useKGCtx();

    return (
        <RightGenericSliderFilter
            resources={knowledgeGraph.getPatterns()}
            resourceTypeFilterHasEffectOn={"Pattern"}
            id="maxOccurences"
            resourceProperty="occurences"
            sliderStep={1}
        />
    );
}
