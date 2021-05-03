import { Resource } from "./Resource";
import URIResolver from "./URIResolver";
import { ResourceTypes } from "./ResourceTypesEnum";
import Measurement from "./Measurement";

export default class ResourceFactory {
    constructor(uriResolver = new URIResolver()) {
        this.uriResolver = uriResolver;
    }
    // based on resource type the factory returns
    // an application level entity for the linked data object
    // (ex. type: measurement => MeasurementResource)
    makeResource(jsonResource) {
        const type = this.uriResolver.getType(jsonResource.type);
        switch (type) {
            case type === ResourceTypes.MEASUREMENT:
                return Measurement.create(jsonResource);
            case type === ResourceTypes.RESOURCE:
                return Resource.create(jsonResource);
            default:
                return Resource.create(jsonResource);
        }
    }
}
