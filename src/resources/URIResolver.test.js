import URIResolver from "./URIResolver";

const uriResolver = new URIResolver();
test("Should resolve type https://w3id.org/arco/ontology/denotative-description/measurement-collection to type measurementCollection", () => {
    const type = uriResolver.getType(
        "https://w3id.org/arco/ontology/denotative-description/measurement-collection"
    );
    expect(type).toBeDefined();
    expect(type).toBe("measurementCollection");
});
