import React from "react";
import { useConceptUri } from "../../base/route/useConceptUri";
import { useConceptInstances } from "../useConceptInstances";

export function ConceptInstancesFetching({ children }) {
    const conceptUri = useConceptUri();
    console.log("[*] Concept: ", conceptUri);

    const conceptInstances = useConceptInstances(conceptUri);
    console.log("[*] Concept Instances:", conceptInstances);
    // if found patterns return it
    const data = conceptInstances
        ? {
              conceptInstances: conceptInstances,
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
