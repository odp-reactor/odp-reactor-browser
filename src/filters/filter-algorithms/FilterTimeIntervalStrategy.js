const rangeEnum = {
    MIN: 0,
    MAX: 1,
};

// from the age of time
const initialTime = -100000;
const now = new Date();
const currentTime = now.getFullYear();

export class FilterTimeIntervalStrategy {
    constructor(range) {
        this.range = range;
        this.class = this.constructor.name;
    }
    static create({ range }) {
        if (!range) return undefined;
        return new FilterTimeIntervalStrategy(range);
    }
    filter(resource) {
        if (!resource.startTime && !resource.endTime) {
            return true;
        } else if (!resource.startTime) {
            if (
                this.range[rangeEnum.MIN] >= initialTime &&
                this.range[rangeEnum.MAX] <= resource.endTime
            ) {
                // node inside time interval set true
                return true;
            } else {
                // node not in range set false
                return false;
            }
        } else if (!resource.endTime) {
            // Handle nodes with missing endTime
            // we consider as if it is today
            //
            // get node in map
            if (
                this.range[rangeEnum.MIN] >= resource.startTime &&
                this.range[rangeEnum.MAX] <= currentTime
            ) {
                // node inside time interval set true
                return true;
            } else {
                // node not in range set false
                return false;
            }
        } else {
            // Handle nodes with startTime and endTime defined
            if (
                this.range[rangeEnum.MIN] >= resource.startTime &&
                this.range[rangeEnum.MAX] <= resource.endTime
            ) {
                // node inside time interval set true
                return true;
            } else {
                // node not in range set false
                return false;
            }
        }
    }
}
