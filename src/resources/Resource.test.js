import { Resource } from "./Resource";

test("Resource should have property time with value 5", () => {
    const resource = Resource.create({
        uri: "ns:id",
        description: "A resource",
        properties: {
            time: 5,
        },
    });
    expect(resource).toBeDefined();
    expect(resource.getUri()).toBe("ns:id");
    expect(resource.getLinkedData("time")).toBe(5);
});

test("Resource should have type Car", () => {
    const resource = Resource.create({
        uri: "ns:id",
        properties: {
            type: "Car",
        },
    });
    expect(resource).toBeDefined();
    expect(resource.getType()).toBe("Car");
});

test("Resource should implement ODPReactorSuitable interface", () => {
    const resource = Resource.create({
        uri: "ns:id",
        description: "A resource",
        properties: {
            time: 5,
            listProperties: {
                listItemClick: () => {
                    return 2;
                },
            },
            graphinProperties: {
                graphinPatternNodeDoubleClick: () => {
                    return 4;
                },
                style: {
                    color: "white",
                },
            },
        },
    });
    expect(resource).toBeDefined();
    expect(resource.onListItemClick()).toBeDefined();
    expect(resource.onListItemClick()()).toBe(2);
    expect(resource.onGraphinPatternNodeDoubleClick()()).toBe(4);
    expect(resource.getGraphinStyle().color).toBe("white");
});
