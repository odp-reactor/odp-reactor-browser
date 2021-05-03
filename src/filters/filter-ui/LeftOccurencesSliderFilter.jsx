import React from "react";
import { useKGCtx } from "../../knowledgegraph/ctx/useKGCtx";

import LeftGenericSliderFilter from "./LeftGenericSliderFilter";

export default function LeftOccurencesSliderFilter({}) {
    const { knowledgeGraph } = useKGCtx();

    return (
        <LeftGenericSliderFilter
            resources={knowledgeGraph.getPatterns()}
            resourceTypeFilterHasEffectOn={"Pattern"}
            id="minOccurences"
            resourceProperty="occurences"
            sliderStep={1}
        />
    );
}
