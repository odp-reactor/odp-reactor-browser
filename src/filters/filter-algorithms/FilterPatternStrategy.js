import { byResourceTypeFilterFunction } from "./byResourceTipeFilterFunction";
import { some, map, fromPairs } from "lodash";

export class FilterPatternStrategy {
    constructor(patterns) {
        this.patterns = patterns;
        this.class = this.constructor.name;
    }
    static create({ patterns }) {
        if (!patterns) return undefined;
        return new FilterPatternStrategy(patterns);
    }
    filter(resource) {
        if (!byResourceTypeFilterFunction(resource, "Pattern")) {
            return true;
        }
        // no view selected return every resource
        // if (
        //     !some(this.patterns, (pattern) => {
        //         return pattern.checked === true;
        //     })
        // ) {
        //     return true;
        // }
        const index = fromPairs(
            map(this.patterns, (x, i) => [x.uri, x.checked])
        );
        if (index[resource.getUri()]) {
            return true;
        } else {
            return false;
        }
    }
}
