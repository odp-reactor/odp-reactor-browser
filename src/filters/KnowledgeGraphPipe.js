import Pipe from "./Pipe";
import Filter from "./Filter";
import { map } from "lodash";
import { DropResourceFromKnowledgeGraphStrategyDecorator } from "./DropResourceFromKnowledgeGraphStrategyDecorator";

export default class KnowledgeGraphPipe {
    constructor(knowledgeGraph) {
        this.knowledgeGraph = knowledgeGraph.copy();
        this.pipe = new Pipe(this.knowledgeGraph.getResources());
    }
    static create(knowledgeGraph) {
        return new KnowledgeGraphPipe(knowledgeGraph);
    }
    chain(filters) {
        const wrappedFilters = map(filters, (f) => {
            if (f.options.filterCallback) {
                return Filter.create({
                    id: f.id,
                    options: {
                        active: f.isActive(),
                        filterCallback: new DropResourceFromKnowledgeGraphStrategyDecorator(
                            f.options.filterCallback,
                            this.knowledgeGraph
                        ),
                    },
                });
            } else {
                return f;
            }
        });

        const newResources = this.pipe.chain(wrappedFilters).toArray();
        return this;
    }
    toGraph() {
        return this.knowledgeGraph;
    }
}
