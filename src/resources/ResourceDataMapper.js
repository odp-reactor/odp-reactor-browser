import { Resource } from "./Resource";
import { forEach } from "lodash";

export default class ResourceDataMapper {
    toResource(json) {
        return Resource.create({ properties: json });
    }
    toJson(resource) {
        let json = {};
        forEach(Object.keys(resource), (k) => {
            if (typeof resource[k] !== "undefined") json[k] = resource[k];
        });
        return json;
    }
}
