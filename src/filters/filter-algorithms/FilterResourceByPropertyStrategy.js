// filter node with props in object
export class FilterResourceByPropertyStrategy {
    constructor(filtered, property) {
        this.filtered = filtered; // an array of id as string of pattern to filter out
        this.property = property;
        this.class = this.constructor.name;
    }
    static create({ filtered, property }) {
        if (!filtered || !property) return undefined;
        return new FilterResourceByPropertyStrategy(filtered, property);
    }
    // you can pass a type to the strategy
    filter(node) {
        if (!this.filtered.includes(node[this.property])) {
            return true;
        }
        return false;
    }
}
