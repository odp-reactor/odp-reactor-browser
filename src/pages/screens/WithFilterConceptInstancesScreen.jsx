import ConceptInstancesScreen from "./ConceptInstancesScreen";
import FilteringResource from "../../filters/FilteringResource";
import React from "react";

import { useFilterCtx } from "../../filters/ctx/useFilterCtx";

export default function WithFilterConceptInstancesScreen({ knowledgeGraph }) {
    const { filters } = useFilterCtx();

    return (
        <FilteringResource knowledgeGraph={knowledgeGraph} filters={filters}>
            <ConceptInstancesScreen />
        </FilteringResource>
    );
}
