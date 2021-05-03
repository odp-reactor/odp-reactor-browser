// as decorator are not serializable
// we simplify whole code encapsulating filter function
// filterFunctionWrapperInterface interface
export function byResourceTypeFilterFunction(node, type) {
    if (node.getType() === type) {
        return true;
    } else {
        return false;
    }
}
