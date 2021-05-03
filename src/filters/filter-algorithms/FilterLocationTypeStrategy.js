import { some, map, fromPairs } from "lodash";

export class FilterLocationTypeStrategy {
    constructor(locations) {
        this.locations = locations;
        this.class = this.constructor.name;
    }
    static create({ locations }) {
        if (!locations) return undefined;
        return new FilterLocationTypeStrategy(locations);
    }
    filter(resource) {
        // no view selected return every resource
        if (
            !some(this.locations, (location) => {
                return location.checked === false;
            })
        ) {
            return true;
        }
        const index = fromPairs(
            map(this.locations, (x, i) => [x.uri, x.checked])
        );
        if (resource.locationType && index[resource.locationType]) {
            return true;
        } else {
            return false;
        }
    }
}
