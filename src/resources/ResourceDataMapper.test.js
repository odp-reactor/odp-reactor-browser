import ResourceDataMapper from "./ResourceDataMapper";
import { Resource } from "./Resource";

const dataMapper = new ResourceDataMapper();
test("Should convert a resource into JSON representation", () => {
    const resource = Resource.create({
        uri: "ns:id",
        description: "A resource",
        properties: {
            name: "Luke",
        },
    });
    const json = dataMapper.toJson(resource);
    expect(json).toBeDefined();
    expect(json.uri).toBe("ns:id");
    expect(json.name).toBe("Luke");
    expect(Object.keys(json)).toHaveLength(3);
});

test("Should convert a json object into a resource", () => {
    const json = {
        uri: "ns:id",
        description: "Ciao mondo!",
    };
    const resource = dataMapper.toResource(json);
    expect(resource).toBeDefined();
    expect(resource.getUri()).toBe("ns:id");
    expect(resource.getDescription()).toBe("Ciao mondo!");
});
