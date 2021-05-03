import { FilterPatternByViewStrategy } from "./FilterPatternByViewStrategy";
import { Resource } from "../../resources/Resource";

const filtered = ["id0", "id1"];
const algo = FilterPatternByViewStrategy.create({ filtered });

const sampleResource1 = Resource.create({
    uri: "id0",
    properties: {
        type: "Pattern",
    },
});

const sampleResource2 = Resource.create({
    uri: "id1",
    properties: {
        type: "Class",
    },
});

const sampleResource3 = Resource.create({
    uri: "id2",
    properties: {
        type: "Pattern",
    },
});

test("Should return FilterPatternByViewStrategy (reflection)", () => {
    const algorithmClass = algo.constructor.name;
    expect(algorithmClass).toBeDefined();
    expect(algorithmClass).toBe("FilterPatternByViewStrategy");
});

test("Should return false for resource with id0 and type Pattern", () => {
    const result = algo.filter(sampleResource1);
    expect(result).toBeDefined();
    expect(result).toBeFalsy();
});

test("Should return true for resource with id1 and type Class", () => {
    const result = algo.filter(sampleResource2);
    expect(result).toBeDefined();
    expect(result).toBeTruthy();
});

test("Should return true for resource with id2 and type Pattern", () => {
    const result = algo.filter(sampleResource3);
    expect(result).toBeDefined();
    expect(result).toBeTruthy();
});
