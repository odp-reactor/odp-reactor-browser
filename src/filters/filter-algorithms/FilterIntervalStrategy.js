import { byResourceTypeFilterFunction } from "./byResourceTipeFilterFunction";

const rangeEnum = {
    MIN: 0,
    MAX: 1,
};

export class FilterIntervalStrategy {
    // resource type is optional
    constructor(resourceProperty, range, resourceType) {
        this.resourceProperty = resourceProperty;
        this.range = range;
        this.resourceType = resourceType;
        this.class = this.constructor.name;
    }
    static create({ resourceProperty, range, resourceType }) {
        if (!resourceProperty || !range) return undefined;
        return new FilterIntervalStrategy(
            resourceProperty,
            range,
            resourceType
        );
    }
    filter(node) {
        // touch only resource with type resourceType
        if (typeof this.resourceType !== "undefined") {
            if (!byResourceTypeFilterFunction(node, this.resourceType)) {
                return true;
            }
        }
        if (
            node[this.resourceProperty] >= this.range[rangeEnum.MIN] &&
            node[this.resourceProperty] <= this.range[rangeEnum.MAX]
        ) {
            return true;
        }
        return false;
    }
}
