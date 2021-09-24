const rangeEnum = {
    MIN: 0,
    MAX: 1,
};

// from the age of time
const initialTime = -100000;
const now = new Date();
const currentTime = now.getFullYear();

export class FilterTimeIntervalStrategy {
    constructor(range,showElementsWithMissingProperty) {
        this.range = range;
        this.showElementsWithMissingProperty = showElementsWithMissingProperty;
        this.class = this.constructor.name;
    }
    static create({ range, showElementsWithMissingProperty }) {
        if (!range) return undefined;
        if (typeof showElementsWithMissingProperty === "undefined") {
            showElementsWithMissingProperty = true;
        }
        return new FilterTimeIntervalStrategy(range, showElementsWithMissingProperty);
    }
    filter(resource) {
        if (!resource.startTime || !resource.endTime) {
            if (this.showElementsWithMissingProperty) {
                return true;
            } else {
                return false;
            }
        } else if (resource.startTime <= this.range[rangeEnum.MAX] && this.range[rangeEnum.MIN] <= resource.endTime) {
            // range overlaps then true
            return true
        } else {
            return false
        }        
    }
}
