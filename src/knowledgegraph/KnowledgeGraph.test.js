import { Resource } from "../resources/Resource";
import { KnowledgeGraph } from "./KnowledgeGraph";

test("Graph should exist", () => {
    const kg = KnowledgeGraph.create();
    expect(kg).toBeDefined();
});

test("Should add new node to graph", () => {
    const kg = KnowledgeGraph.create();
    const r = Resource.create({ uri: "http://example.ns/id054123" });
    kg.addResource(r);
});

test("Should not add same node to graph", () => {
    const kg = KnowledgeGraph.create();
    const r = Resource.create({ uri: "http://example.ns/id054123" });
    kg.addResource(r);
    kg.addResource(r);
});

test("Should add new edge to graph", () => {
    const kg = KnowledgeGraph.create();
    const r = Resource.create({ uri: "http://example.ns/id054123" });
    const r2 = Resource.create({ uri: "http://example.ns/id535635" });
    const p = Resource.create({ uri: "http://example.ns/id535635" });
    kg.addTriple(r, p, r2);
});

test("Should have size 3", () => {
    const kg = KnowledgeGraph.create();
    const r = Resource.create({ uri: "http://example.ns/id054123" });
    const r2 = Resource.create({ uri: "http://example.ns/id535635" });
    const r3 = Resource.create({ uri: "http://example.ns/i56310" });
    kg.addResource(r);
    kg.addResource(r2);
    kg.addResource(r3);
    expect(kg.getResourceCount()).toBe(3);
});

test("Should return resource value 'John' for resource property 'name'", () => {
    const kg = KnowledgeGraph.create();
    const r = Resource.create({
        uri: "http://example.ns/id054123",
        properties: { name: "John" },
    });
    kg.addResource(r);
    const name = kg.getResourceProperty("http://example.ns/id054123", "name");
    expect(name).toBeDefined();
    expect(name).toBe("John");
});

test("Should update resoruce value 'John' for resource property 'name' to 'Jake'", () => {
    const kg = KnowledgeGraph.create();
    const r = Resource.create({
        uri: "http://example.ns/id054123",
        properties: { name: "John" },
    });
    kg.addResource(r);
    kg.updateResourceProperty("http://example.ns/id054123", "name", "Jake");
    const name = kg.getResourceProperty("http://example.ns/id054123", "name");
    expect(name).toBeDefined();
    expect(name).toBe("Jake");
});

test("Should return all resources of type Pattern", () => {
    const kg = KnowledgeGraph.create();
    const r = Resource.create({
        uri: "ns:id",
        properties: {
            type: "Pattern",
        },
    });
    kg.addResource(r);
    const patterns = kg.getPatterns();
    expect(patterns).toBeDefined();
    expect(patterns).toHaveLength(1);
    expect(patterns[0].getUri()).toBe("ns:id");
});

test("Should return resource with id 0543", () => {
    const kg = KnowledgeGraph.create();
    const r = Resource.create({
        uri: "0543",
    });
    kg.addResource(r);
    const gotResource = kg.getResource("0543");
    expect(gotResource).toBeDefined();
    expect(gotResource.getUri()).toBe("0543");
});

test("Should return property with source J15 target K11 and weight 5", () => {
    const kg = KnowledgeGraph.create();
    const r = Resource.create({
        uri: "J15",
    });
    const r2 = Resource.create({
        uri: "K11",
    });
    const p = Resource.create({
        uri: `J15->K11`,
        properties: {
            weight: 5,
        },
    });
    kg.addTriple(r, p, r2);
    const kgProperties = kg.getEdges();
    const gotP = kg.getProperty(kgProperties[0]);
    expect(gotP).toBeDefined();
    expect(gotP.weight).toBe(5);
});

test("Should remove resource from graph", () => {
    const kg = KnowledgeGraph.create();
    const r = Resource.create({
        uri: "J15",
    });
    kg.addResource(r);
    kg.removeResource(r.getUri());
    expect(kg.getResource(r.getUri())).not.toBeDefined();
});

test("Should remove property from graph", () => {
    const kg = KnowledgeGraph.create();
    const r = Resource.create({
        uri: "J15",
    });
    const r2 = Resource.create({
        uri: "K11",
    });
    const p = Resource.create({
        uri: `J15->K11`,
        properties: {
            weight: 5,
        },
    });
    kg.addTriple(r, p, r2);
    kg.removeProperty(p.getUri());
    expect(kg.getProperty(p.getUri())).not.toBeDefined();
});

test("Should remove properties associated to resource when resource is dropped", () => {
    const kg = KnowledgeGraph.create();
    const r = Resource.create({
        uri: "J15",
    });
    const r2 = Resource.create({
        uri: "K11",
    });
    const p = Resource.create({
        uri: `J15->K11`,
        properties: {
            weight: 5,
        },
    });
    kg.addTriple(r, p, r2);
    kg.removeResource(r.getUri());
    expect(kg.getProperty(`J15->K11`)).not.toBeDefined();
});
