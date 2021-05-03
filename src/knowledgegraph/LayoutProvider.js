import { forEach } from "lodash";
import createGraph from "ngraph.graph";
import createLayout from "ngraph.forcelayout";

const ITERATIONS_COUNT = 1000;

export class LayoutProvider {
    // nodes is unused here, but is considered in the api if needed
    // you can change implementation varying layout algorithm computation package
    constructor(edges, nodes) {
        // create an instance of ngraph.ngraph
        this.graph = createGraph();
        // populate the graph
        forEach(edges, (edge) => {
            this.graph.addLink(edge.source, edge.target);
        });
        // create an instance of layout
        this.layout = createLayout(this.graph);
        // compute layout
        for (var i = 0; i < ITERATIONS_COUNT; ++i) {
            this.layout.step();
        }
    }
    getCoordinates(nodeId) {
        return this.layout.getNodePosition(nodeId);
    }
}
