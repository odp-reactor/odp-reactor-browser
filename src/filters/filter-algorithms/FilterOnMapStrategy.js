import GeoJsonGeometriesLookup from "geojson-geometries-lookup";

export class FilterOnMapStrategy {
    constructor(featureGroup) {
        this.featureGroup = featureGroup;
        this.class = this.constructor.name;
    }
    static create({ featureGroup }) {
        if (!featureGroup) return undefined;
        return new FilterOnMapStrategy(featureGroup);
    }
    filter(resource) {
        if (this.featureGroup.features.length === 0) {
            // no area selected
            return true;
        }
        if (resource.lat && resource.long) {
            console.time("geolookup")

            let geolookup = new GeoJsonGeometriesLookup(this.featureGroup);
            let point = {
                type: "Point",
                coordinates: [resource.long, resource.lat],
            };
            if (geolookup.hasContainers(point)) {
                // node resource geoJSON keep it
                console.timeEnd("geolookup")
                return true;
            } else {
                console.timeEnd("geolookup")
                return false;
            }
        } else {
            return false;
        }
    }
}
