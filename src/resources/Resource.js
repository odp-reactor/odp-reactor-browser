import { forEach } from "lodash";
import { ODPReactorSuitable } from "./ODPReactorSuitable";
import { v4 as uuidv4 } from "uuid";

// implements filterable
export class Resource extends ODPReactorSuitable {
    constructor(uri, label, description, properties) {
        super();
        this.uri = uri;
        this.label = label;
        this.description = description;
        if (properties) {
            forEach(Object.keys(properties), (k) => {
                this[k] = properties[k];
            });
        }
    }
    static create({ uri, label, description, properties }) {
        if (!uri) {
            uri = Resource.createUri();
        }
        return new Resource(uri, label, description, properties);
    }

    getUri() {
        return this.uri;
    }
    getLabel() {
        return this.label;
    }
    getType() {
        return this.type;
    }
    getDescription() {
        return this.description;
    }
    // @deprecated
    getLinkedData(property) {
        return this[property];
    }
    getProperty(property) {
        return this[property];
    }
    getInternalUri() {
        return this.getProperty("internalUri");
    }
    getProperties() {
        const properties = [];
        forEach(Object.keys(this), (k) => {
            if (typeof this[k] !== "undefined") properties.push(this[k]);
        });
        return properties;
    }
    static createUri() {
        return `resource_${uuidv4()}`;
    }
}
