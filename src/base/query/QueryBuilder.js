export class QueryBuilder {
    getPrefixes() {
        return `
            PREFIX  opla:       <http://ontologydesignpatterns.org/opla/>
            PREFIX  rdfs:       <http://www.w3.org/2000/01/rdf-schema#>     
            PREFIX  arco-gm:    <https://w3id.org/arco/graph.measures/>   
        `;
    }
}
