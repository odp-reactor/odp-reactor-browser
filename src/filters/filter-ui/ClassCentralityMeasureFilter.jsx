import React from "react";

import { useKGCtx } from "../../knowledgegraph/ctx/useKGCtx";

import LeftGenericSliderFilter from "./LeftGenericSliderFilter";
import { scaleInto01 } from "../../base/math";
import { findSliderDomain } from "./findSliderDomain";

const MIN = 0;
const MAX = 1;

export default function ClassCentralityMeasureFilter({}) {
    const { knowledgeGraph } = useKGCtx();

    const initialRange = findSliderDomain(
        knowledgeGraph.getClasses(),
        "centralityScore"
    );

    return (
        <LeftGenericSliderFilter
            resourceTypeFilterHasEffectOn={"Class"}
            id="centrality"
            resourceProperty="centralityScore"
            resources={knowledgeGraph.getClasses()}
            defaultRange={[initialRange[MAX]]}
            formatTicks={(d) => {
                return scaleInto01(
                    d,
                    initialRange[MIN],
                    initialRange[MAX]
                ).toFixed(2);
            }}
        />
    );
}
