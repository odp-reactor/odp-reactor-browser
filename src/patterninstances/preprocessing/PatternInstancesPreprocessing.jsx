import React from "react";
import { KnowledgeGraphBuilder } from "../../knowledgegraph/preprocessing/KnowledgeGraphBuilder";

export function PatternInstancesPreprocessing({ children, data }) {
    console.log("PUBLIC_URL:", process.env.PUBLIC_URL);
    console.log("PatternInstances", data);

    // preprocessing pattern instances
    // They are put into a knowledge graph data structure as:
    //      tool is supposed work with KG interface
    //      list is simply a fully disconnected graph
    //      we may want to support in the future kg instances relations
    const kgBuilder = new KnowledgeGraphBuilder();
    const preprocessedKnowledgeGraph = kgBuilder.makePatternInstancesListKG(
        data
    );

    console.log("[*] PreprocessedKnowledgeGraph:");
    console.log(preprocessedKnowledgeGraph);

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
