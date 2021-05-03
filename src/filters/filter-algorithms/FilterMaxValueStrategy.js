import { byResourceTypeFilterFunction } from "./byResourceTipeFilterFunction";

export class FilterMaxValueStrategy {
    // resource type is optional
    constructor(
        resourceProperty,
        maxValue,
        showElementsWithMissingProperty,
        resourceType
    ) {
        this.resourceProperty = resourceProperty;
        this.maxValue = maxValue;
        this.resourceType = resourceType;
        this.showElementsWithMissingProperty = showElementsWithMissingProperty;

        this.class = this.constructor.name;
    }
    static create({
        resourceProperty,
        maxValue,
        resourceType,
        showElementsWithMissingProperty,
    }) {
        if (!resourceProperty || !maxValue) return undefined;
        if (typeof showElementsWithMissingProperty === "undefined") {
            showElementsWithMissingProperty = true;
        }
        return new FilterMaxValueStrategy(
            resourceProperty,
            maxValue,
            showElementsWithMissingProperty,
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
        // if resource has no property return true
        if (!node[this.resourceProperty]) {
            if (this.showElementsWithMissingProperty) {
                return true;
            } else {
                return false;
            }
        }
        if (node[this.resourceProperty] <= this.maxValue) {
            return true;
        }
        return false;
    }
}
