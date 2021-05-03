import findFirstNElement from "./findFirstNElement";

export default function hasResourceToFilter(resources, predicate) {
    let twoElementsToFilter = findFirstNElement(resources, predicate, 2);
    return twoElementsToFilter.length === 2 ? true : false;
}
