import React from "react";
import { usePatternUri } from "../../base/route/usePatternUri";
import { usePatternInstances } from "../usePatternInstances";
import {CustomLoader} from "../../base/loader/CustomLoader"

export function PatternInstancesFetching({ children }) {
    const patternUri = usePatternUri();

    const patternInstances = usePatternInstances(patternUri);
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
                : <CustomLoader/>}
        </div>
    );
}
