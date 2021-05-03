export class FilterStartTimeStrategy {
    constructor(startTime, showElementsWithMissingProperty) {
        this.startTime = startTime;
        this.showElementsWithMissingProperty = showElementsWithMissingProperty;
        this.class = this.constructor.name;
    }
    static create({ startTime, showElementsWithMissingProperty }) {
        if (!startTime) return undefined;
        if (typeof showElementsWithMissingProperty === "undefined") {
            showElementsWithMissingProperty = true;
        }
        return new FilterStartTimeStrategy(
            startTime,
            showElementsWithMissingProperty
        );
    }
    filter(resource) {
        if (!resource.startTime) {
            if (this.showElementsWithMissingProperty) {
                return true;
            } else {
                return false;
            }
        } else {
            if (resource.startTime >= this.startTime) {
                // stratTime greater than selected startTime
                return true;
            } else {
                // lower
                return false;
            }
        }
    }
}
