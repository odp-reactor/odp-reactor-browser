import React from "react";

import KnowledgeGraphPipe from "./KnowledgeGraphPipe";

export default function FilteringResource({
    knowledgeGraph,
    filters,
    children,
}) {
    let filteredKnowledgeGraph;

    const kgPipe = KnowledgeGraphPipe.create(knowledgeGraph);
    // remove nodes connected to edge
    filteredKnowledgeGraph = kgPipe.chain(filters).toGraph();

    return (
        <div>
            {children
                ? React.Children.map(children, (child) => {
                      return React.cloneElement(child, {
                          filteredKnowledgeGraph: filteredKnowledgeGraph,
                      });
                  })
                : null}
        </div>
    );
}
