import { ResourceTypes } from "./ResourceTypesEnum";

export default class URIResolver {
    constructor() {}
    // get a uri type (linked data)
    // and return an application equivalent of it
    getType(typeURI) {
        switch (typeURI) {
            case "https://w3id.org/arco/ontology/denotative-description/measurement-collection":
            case "http://www.ontologydesignpatterns.org/cp/owl/collection": {
                return ResourceTypes.MEASUREMENT_COLLECTION;
            }
            case "http://www.w3.org/2000/01/rdf-schema#Resource": {
                return ResourceTypes.RESOURCE;
            }
            default:
                return ResourceTypes.RESOURCE;
        }
    }
}
