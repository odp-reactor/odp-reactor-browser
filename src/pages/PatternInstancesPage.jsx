import React from "react";
import FilterCtxProvider from "../filters/ctx/FilterCtxProvider";
import LayoutCtxProvider from "../layout/ctx/LayoutCtxProvider";
import KGCtxProvider from "../knowledgegraph/ctx/KGCtxProvider";
import AlertCtxProvider from "../base/alert/ctx/AlertCtxProvider";
import WithFilterPatternInstancesScreen from "./screens/WithFilterPatternInstancesScreen";
import HelpCtxProvider from "../base/help/ctx/HelpCtxProvider";
import { usePatternUri } from "../base/route/usePatternUri";

export function PatternInstancesPage({
    knowledgeGraph,
    resetFilters,
    noTutorial,
}) {
    const contextUri = usePatternUri();

    return (
        <KGCtxProvider knowledgeGraph={knowledgeGraph} classUri={contextUri}>
            <HelpCtxProvider noTutorial={noTutorial}>
                <AlertCtxProvider>
                    <FilterCtxProvider
                        resourceUri={contextUri}
                        resetFilters={resetFilters}
                    >
                        <LayoutCtxProvider defaultLayout={{ layout: "list" }}>
                            <WithFilterPatternInstancesScreen
                                knowledgeGraph={knowledgeGraph}
                            />
                        </LayoutCtxProvider>
                    </FilterCtxProvider>
                </AlertCtxProvider>
            </HelpCtxProvider>
        </KGCtxProvider>
    );
}
