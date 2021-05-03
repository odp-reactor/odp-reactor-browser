import { forEach } from "lodash";

export default function findFirstNElement(elements, predicate, maxCount) {
    var results = [];
    forEach(elements, function (element) {
        if (results.length === maxCount) {
            return false;
        }
        if (predicate(element)) {
            results.push(element);
        }
    });
    return results;
}
