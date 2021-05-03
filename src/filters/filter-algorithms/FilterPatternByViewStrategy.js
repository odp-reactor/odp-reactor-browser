import { byResourceTypeFilterFunction } from "./byResourceTipeFilterFunction";

// filter node with props in object
export class FilterPatternByViewStrategy {
    constructor(filtered) {
        this.filtered = filtered; // an array of id as string of pattern to filter out
        this.class = this.constructor.name;
    }
    static create({ filtered }) {
        if (!filtered) return undefined;
        return new FilterPatternByViewStrategy(filtered);
    }
    // you can pass a type to the strategy
    filter(node) {
        // touch only patterns
        if (!byResourceTypeFilterFunction(node, "Pattern")) {
            return true;
        }
        if (
            Number.parseInt(node.occurences) !== 0 &&
            !this.filtered.includes(node.getUri())
        ) {
            return true;
        }
        return false;
    }
}
