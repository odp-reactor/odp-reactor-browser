import { newEngine } from "@comunica/actor-init-sparql";
import { Bindings } from '@comunica/bus-query-operation';
import { DataFactory } from 'rdf-data-factory';

const factory = new DataFactory();

export class SparqlClient {
    constructor(sparqlEndpoint, graph) {
        this.sparqlEndpoint = sparqlEndpoint;
        this.graph = graph;
        this.sparqlQueryingEngine = newEngine();
    }
    static create({ sparqlEndpoint, graph }) {
        if (!sparqlEndpoint) return undefined;
        return new SparqlClient(sparqlEndpoint, graph);
    }
    async executeQuery(query) {
        console.log(query);
        let bindings;
        try {
            let comunicaParams = {
                sources: [{ type: "sparql", value: this.sparqlEndpoint }],
                // bind ?graph variable if not default graph
                ...(this.graph !== "default" && {initialBindings: new Bindings({
                    '?graph' : factory.namedNode(this.graph)
                })})
            }
            console.log("[*] Comunica params: ", comunicaParams);
            const result = await this.sparqlQueryingEngine.query(query, comunicaParams);
            bindings = await result.bindings();
            console.log("Result:", result)
        } catch (e) {
            console.log("[!] DbClient.executeQuery error:", e);
            bindings = undefined;
        }
        return bindings;
    }
    // query method here
    // the one we have in ClassRepository
}
