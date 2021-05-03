import React from "react";
import FilterCtxProvider from "../filters/ctx/FilterCtxProvider";
import LayoutCtxProvider from "../layout/ctx/LayoutCtxProvider";
import KGCtxProvider from "../knowledgegraph/ctx/KGCtxProvider";
import WithFilterPatternAndClassesScreen from "./screens/WithFilterPatternAndClassesScreen";
import AlertCtxProvider from "../base/alert/ctx/AlertCtxProvider";
import HelpCtxProvider from "../base/help/ctx/HelpCtxProvider";
import { useGraphUri } from "../base/route/useGraphUri";

export function PatternsAndClassesPage({
    knowledgeGraph,
    resetFilters,
    noTutorial,
}) {
    // get you're resource and pass it to filters
    // filters are scoped by resource
    const contextUri = useGraphUri();

    return (
        <KGCtxProvider knowledgeGraph={knowledgeGraph} classUri={contextUri}>
            <HelpCtxProvider noTutorial={noTutorial}>
                <AlertCtxProvider>
                    <FilterCtxProvider
                        resourceUri={contextUri}
                        resetFilters={resetFilters}
                    >
                        <LayoutCtxProvider>
                            <WithFilterPatternAndClassesScreen
                                knowledgeGraph={knowledgeGraph}
                            />
                        </LayoutCtxProvider>
                    </FilterCtxProvider>
                </AlertCtxProvider>
            </HelpCtxProvider>
        </KGCtxProvider>
    );
}
