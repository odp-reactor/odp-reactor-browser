import { byResourceTypeFilterFunction } from "./byResourceTipeFilterFunction";

const rangeEnum = {
    MIN: 0,
    MAX: 1,
};

export class FilterIntervalStrategy {
    // resource type is optional
    constructor(resourceProperty, range, showElementsWithMissingProperty,
        resourceType) {
        this.resourceProperty = resourceProperty;
        this.range = range;
        this.resourceType = resourceType;
        this.showElementsWithMissingProperty = showElementsWithMissingProperty;

        this.class = this.constructor.name;
    }
    static create({ resourceProperty, range, resourceType,
        showElementsWithMissingProperty,
    }) {
        if (!resourceProperty || !range) return undefined;
        if (typeof showElementsWithMissingProperty === "undefined") {
            showElementsWithMissingProperty = true;
        }
        return new FilterIntervalStrategy(
            resourceProperty,
            range,
            showElementsWithMissingProperty,
            resourceType
        );
    }
    filter(node) {

        console.log("Fail to filter     ")

        // touch only resource with type resourceType
        if (typeof this.resourceType !== "undefined") {
            if (!byResourceTypeFilterFunction(node, this.resourceType)) {
                return true;
            }
        }
                // if resource has no property
                if (!node[this.resourceProperty]) {
                    if (this.showElementsWithMissingProperty) {
                        return true;
                    } else {
                        return false;
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
