import PatternAndClassesScreen from "./PatternsAndClassesScreen";
import FilteringResource from "../../filters/FilteringResource";
import React from "react";
import { useFilterCtx } from "../../filters/ctx/useFilterCtx";
import FilteringShowingJustOneKeyConceptPerView from "../../filters/FilteringShowingJustOneKeyConceptPerView";

export default function WithFilterPatternAndClassesScreen({ knowledgeGraph }) {
    const { filters } = useFilterCtx();

    return (
        <FilteringResource knowledgeGraph={knowledgeGraph} filters={filters}>
            <FilteringShowingJustOneKeyConceptPerView filters={filters}>
                <PatternAndClassesScreen />
            </FilteringShowingJustOneKeyConceptPerView>
        </FilteringResource>
    );
}
