import { FilterMaxValueStrategy } from "./FilterMaxValueStrategy";
import { Resource } from "../../resources/Resource";

const maxAge = 50;
const resourceType = "Employee";
const resourceProperty = "age";
const algo = FilterMaxValueStrategy.create({
    maxValue: maxAge,
    resourceType,
    resourceProperty,
});

const bob = Resource.create({
    uri: "id0",
    properties: {
        type: "Employee",
        age: 56,
    },
});

const lilJohn = Resource.create({
    uri: "id1",
    properties: {
        type: "Employee",
        age: 8,
    },
});

const mary = Resource.create({
    uri: "id2",
    properties: {
        type: "Manager",
        age: 60,
    },
});

test("Should return false for resource bob", () => {
    const result = algo.filter(bob);
    expect(result).toBeDefined();
    expect(result).toBeFalsy();
});

test("Should return true for resource lilJohn", () => {
    const result = algo.filter(lilJohn);
    expect(result).toBeDefined();
    expect(result).toBeTruthy();
});

test("Should return true for resource Mary", () => {
    const result = algo.filter(mary);
    expect(result).toBeDefined();
    expect(result).toBeTruthy();
});
