import React from "react";
import { usePatternUri } from "../../base/route/usePatternUri";
import { usePatternInstances } from "../usePatternInstances";

import {cloneDeep} from "lodash"
import { nanoid } from 'nanoid'


class PatternInstancesMockuper {

    constructor(instances) {
        this.instances = instances
    }

    multiply(number=200) {
        const baseInstance = this.instances[0]
        for(let i=0; i<= number ; i++) {
           let newInstance = cloneDeep(baseInstance)
           newInstance.instance = "https://arco.istc.cnr.it/ns/measurement_collection_instance_" + nanoid()
           this.instances.push(newInstance)
        }
        return this
    }

    value() {
        return this.instances
    }

}

export function PatternInstancesFetching({ children }) {
    const patternUri = usePatternUri();
    console.log("[*] Pattern: ", patternUri);

    const patternInstances = usePatternInstances(patternUri);
    console.log("[*] Pattern Instances:", patternInstances);

    const patternInstanceMockuper = new PatternInstancesMockuper(patternInstances)

    // if found patterns return it
    const data = patternInstances
        ? {
              patternInstances:  patternInstanceMockuper.multiply(10000).value(),
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
