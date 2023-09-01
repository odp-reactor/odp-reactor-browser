import PatternInstancesScreen from "./PatternInstancesScreen";
import FilteringResource from "../../filters/FilteringResource";
import React from "react";
import { useFilterCtx } from "../../filters/ctx/useFilterCtx";
import { CustomLoader } from "../../base/loader/CustomLoader";

export default function WithFilterPatternInstancesScreen({ knowledgeGraph }) {
    const { filters } = useFilterCtx();

    return (
        <FilteringResource knowledgeGraph={knowledgeGraph} filters={filters}>
            <PatternInstancesScreen />
        </FilteringResource>
    );
}

