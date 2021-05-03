import React from "react";
import { useConceptsWithPatternsAndScores } from "../../concepts/useConceptsWithPatternsAndScores";
import { usePatterns } from "../../patterns/usePatterns";

export function KnowledgeGraphSchemaFetching({ children }) {
    const conceptsWithPatternsAndScores = useConceptsWithPatternsAndScores();
    const patterns = usePatterns();
    console.log(
        "Knowledge graph schema fetching:",
        conceptsWithPatternsAndScores
    );
    console.log(patterns);
    // if found a knowledgeGraph return it
    const data =
        conceptsWithPatternsAndScores && patterns
            ? {
                  concepts: conceptsWithPatternsAndScores,
                  patterns: patterns,
              }
            : undefined;
    return (
        <div>
            {children && data
                ? React.Children.map(children, (child) => {
                      return React.cloneElement(child, {
                          data: data,
                      });
                  })
                : null}
        </div>
    );
}
