// encapsulate generic filter strategies in a strategy that when
// resource is discarded by filters drop it from knowledge graph

export class DropResourceFromKnowledgeGraphStrategyDecorator {
    constructor(filterStrategy, knowledgeGraph) {
        this.filterStrategy = filterStrategy;
        this.knowledgeGraph = knowledgeGraph;
    }
    filter(resource) {
        if (this.filterStrategy.filter(resource)) {
            return resource;
        } else {
            this.knowledgeGraph.removeResource(resource.getUri());
        }
    }
}
