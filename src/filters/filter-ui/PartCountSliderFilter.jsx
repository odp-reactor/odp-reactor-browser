import React from "react";
import { useKGCtx } from "../../../knowledgegraph/KGCtx/useKGCtx";

import GenericSliderFilter from "./GenericSliderFilter";

export default function PartCountSliderFilter({}) {
    const { knowledgeGraph } = useKGCtx();
    return (
        <GenericSliderFilter
            resources={knowledgeGraph.getResources()}
            id="parts"
            resourceProperty="parts"
        />
    );
}
