import React from "react";
import { usePatternUri } from "../../base/route/usePatternUri";
import { usePatternInstances } from "../usePatternInstances";

export function PatternInstancesFetching({ children }) {
    const patternUri = usePatternUri();
    console.log("[*] Pattern: ", patternUri);

    const patternInstances = usePatternInstances(patternUri);
    console.log("[*] Pattern Instances:", patternInstances);
    // if found patterns return it
    const data = patternInstances
        ? {
              patternInstances: patternInstances,
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
