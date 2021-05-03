import { forEach } from "lodash";
import Filter from "./Filter";

export default class Pipe {
    constructor(data) {
        this.data = data[Symbol.iterator]();
    }
    [Symbol.iterator]() {
        return this.data;
    }
    pass(generator) {
        return new Pipe({ [Symbol.iterator]: generator });
    }
    /**
     * Write data to filter and pass them to a new pipe
     */
    write(filter = Filter.create({})) {
        const data = this.data;
        return this.pass(function* () {
            for (const item of data) {
                if (filter.filter(item)) {
                    yield item;
                }
            }
        });
    }
    chain(filters) {
        let pipe = this;
        forEach(filters, (filter) => {
            pipe = pipe.write(filter);
        });
        return pipe;
    }
    toArray() {
        return Array.from(this.data);
    }
}
