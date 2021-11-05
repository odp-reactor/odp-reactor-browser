import React from "react";
import { useConceptUri } from "../../base/route/useConceptUri";
import { useConceptInstances } from "../useConceptInstances";
import {CustomLoader} from "../../base/loader/CustomLoader"

export function ConceptInstancesFetching({ children }) {
    const conceptUri = useConceptUri();

    const conceptInstances = useConceptInstances(conceptUri);
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
                : <CustomLoader/>}
        </div>
    );
}
