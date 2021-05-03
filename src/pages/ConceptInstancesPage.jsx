import React from "react";
import FilterCtxProvider from "../filters/ctx/FilterCtxProvider";
import LayoutCtxProvider from "../layout/ctx/LayoutCtxProvider";
import KGCtxProvider from "../knowledgegraph/ctx/KGCtxProvider";
import AlertCtxProvider from "../base/alert/ctx/AlertCtxProvider";
import HelpCtxProvider from "../base/help/ctx/HelpCtxProvider";
import WithFilterConceptInstancesScreen from "./screens/WithFilterConceptInstancesScreen";
import { useConceptUri } from "../base/route/useConceptUri";

export function ConceptInstancesPage({
    knowledgeGraph,
    resetFilters,
    noTutorial,
}) {
    const contextUri = useConceptUri();

    return (
        <KGCtxProvider knowledgeGraph={knowledgeGraph} classUri={contextUri}>
            <HelpCtxProvider noTutorial={noTutorial}>
                <AlertCtxProvider>
                    <FilterCtxProvider
                        resourceUri={contextUri}
                        resetFilters={resetFilters}
                    >
                        <LayoutCtxProvider defaultLayout={{ layout: "list" }}>
                            <WithFilterConceptInstancesScreen
                                knowledgeGraph={knowledgeGraph}
                            />
                        </LayoutCtxProvider>
                    </FilterCtxProvider>
                </AlertCtxProvider>
            </HelpCtxProvider>
        </KGCtxProvider>
    );
}
