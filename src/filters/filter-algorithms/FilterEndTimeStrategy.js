export class FilterEndTimeStrategy {
    constructor(endTime, showElementsWithMissingProperty) {
        this.endTime = endTime;
        this.showElementsWithMissingProperty = showElementsWithMissingProperty;
        this.class = this.constructor.name;
    }
    static create({ endTime, showElementsWithMissingProperty }) {
        if (!endTime) return undefined;
        if (typeof showElementsWithMissingProperty === "undefined") {
            showElementsWithMissingProperty = true;
        }
        return new FilterEndTimeStrategy(
            endTime,
            showElementsWithMissingProperty
        );
    }
    filter(resource) {
        if (!resource.endTime) {
            if (this.showElementsWithMissingProperty) {
                return true;
            } else {
                return false;
            }
        } else {
            if (resource.endTime <= this.endTime) {
                // stratTime greater than selected startTime
                return true;
            } else {
                // lower
                return false;
            }
        }
    }
}
