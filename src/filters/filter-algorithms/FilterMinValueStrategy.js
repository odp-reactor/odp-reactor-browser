import { byResourceTypeFilterFunction } from "./byResourceTipeFilterFunction";

export class FilterMinValueStrategy {
    // resource type is optional
    constructor(
        resourceProperty,
        minValue,
        showElementsWithMissingProperty,
        resourceType
    ) {
        this.resourceProperty = resourceProperty;
        this.minValue = minValue;
        this.resourceType = resourceType;
        this.showElementsWithMissingProperty = showElementsWithMissingProperty;
        this.class = this.constructor.name;
    }
    static create({
        resourceProperty,
        minValue,
        resourceType,
        showElementsWithMissingProperty,
    }) {
        if (!resourceProperty || !minValue) return undefined;
        if (typeof showElementsWithMissingProperty === "undefined") {
            showElementsWithMissingProperty = true;
        }
        return new FilterMinValueStrategy(
            resourceProperty,
            minValue,
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
        // if resource has no property
        if (!node[this.resourceProperty]) {
            if (this.showElementsWithMissingProperty) {
                return true;
            } else {
                return false;
            }
        }
        if (node[this.resourceProperty] >= this.minValue) {
            return true;
        }
        return false;
    }
}
