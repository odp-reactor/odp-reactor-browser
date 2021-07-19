import React from "react";
import { useKGCtx } from "../../knowledgegraph/ctx/useKGCtx";

import GenericSliderFilter from "./GenericSliderFilter";

export default function OccurencesSliderFilter({}) {
    const { knowledgeGraph } = useKGCtx();

    return (
        <GenericSliderFilter
            resources={knowledgeGraph.getPatterns()}
            resourceTypeFilterHasEffectOn={"Pattern"}
            id="occurences"
            resourceProperty="occurences"
            sliderStep={1}
            doubleHandle={true}
            withInputBox={true}
        />
    );
}
