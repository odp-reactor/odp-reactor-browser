import React from "react";
import { Route, Switch } from "react-router-dom";

import { KnowledgeGraphSchemaFetching } from "../knowledgegraph/fetching/KnowledgeGraphSchemaFetching";
import { KnowledgeGraphSchemaPreprocessing } from "../knowledgegraph/preprocessing/KnowledgeGraphSchemaPreprocessing";
import { PatternInstancesFetching } from "../patterninstances/fetching/PatternInstancesFetching";
import { ConceptInstancesFetching } from "../conceptinstances/fetching/ConceptInstancesFetching";
import { ConceptInstancesPreprocessing } from "../conceptinstances/preprocessing/ConceptInstancesPreprocessing";
import { PatternInstancesPreprocessing } from "../patterninstances/preprocessing/PatternInstancesPreprocessing";
import { PatternsAndClassesPage } from "../pages/PatternsAndClassesPage";
import { PatternInstancesPage } from "../pages/PatternInstancesPage";
import { ConceptInstancesPage } from "../pages/ConceptInstancesPage";
import { TestScreen } from "./TestScreen";
import { SparqlCtxProvider } from "../sparql/ctx/SparqlCtxProvider";

export function SwitchContainer() {
    return (
        <Switch>
            <Route exact={true} path="/endpoints/:endpoint/graphs/:graph">
                <SparqlCtxProvider>
                    <KnowledgeGraphSchemaFetching>
                        <KnowledgeGraphSchemaPreprocessing>
                            <PatternsAndClassesPage />
                        </KnowledgeGraphSchemaPreprocessing>
                    </KnowledgeGraphSchemaFetching>
                </SparqlCtxProvider>
            </Route>

            <Route
                exact={true}
                path="/endpoints/:endpoint/graphs/:graph/patterns/:pattern"
            >
                <SparqlCtxProvider>
                    <PatternInstancesFetching>
                        <PatternInstancesPreprocessing>
                            <PatternInstancesPage />
                        </PatternInstancesPreprocessing>
                    </PatternInstancesFetching>
                </SparqlCtxProvider>
            </Route>

            <Route
                exact={true}
                path="/endpoints/:endpoint/graphs/:graph/concepts/:concept"
            >
                <SparqlCtxProvider>
                    <ConceptInstancesFetching>
                        <ConceptInstancesPreprocessing>
                            <ConceptInstancesPage />
                        </ConceptInstancesPreprocessing>
                    </ConceptInstancesFetching>
                </SparqlCtxProvider>
            </Route>

            <Route path="/test">
                <TestScreen />
            </Route>
        </Switch>
    );
}
