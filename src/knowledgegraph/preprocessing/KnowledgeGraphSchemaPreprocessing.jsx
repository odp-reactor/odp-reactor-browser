import React from "react";
import { useSparqlClient } from "../../sparql/useSparqlClient";

import { KnowledgeGraphBuilder } from "./KnowledgeGraphBuilder";

export function KnowledgeGraphSchemaPreprocessing({ children, data }) {
    console.log("PUBLIC_URL:", process.env.PUBLIC_URL);
    console.log("KnowledgeGraphSchemaPreprocessing", data);
    // preprocessing knowledge graph
    const { sparqlClient } = useSparqlClient();
    const kgBuilder = new KnowledgeGraphBuilder(sparqlClient);
    const preprocessedKnowledgeGraph = kgBuilder.makeSchemaKG(data);

    return (
        <div>
            {children
                ? React.Children.map(children, (child) => {
                      return React.cloneElement(child, {
                          knowledgeGraph: preprocessedKnowledgeGraph,
                      });
                  })
                : null}
        </div>
    );
}
