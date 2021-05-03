import { QueryBuilder } from "../base/query/QueryBuilder";

export class ConceptQueryBuilder extends QueryBuilder {
    getClassesWithCentralityScore() {
        return `
            ${this.getPrefixes()}
            select distinct ?uri ?pd WHERE {
                GRAPH ?graph {
                    ?uri arco-gm:percentageDegree ?pd .
                 } ORDER BY DESC(?pd)
            }
        `;
    }
    getClassesWithPatternsTheyBelongsTo() {
        return `
                ${this.getPrefixes()}
                SELECT ?uri ?pattern WHERE {
                ?uri opla:isNativeTo ?pattern
    }`;
    }
    getClassesWithPatternsAndScores() {
        return `
                ${this.getPrefixes()}
    
                SELECT ?uri (SAMPLE(?label) as ?label) ?description ?pattern ?pd WHERE {

                    ?atLeastOneInstance opla:isPatternInstanceOf ?pattern .

                    ?uri opla:isNativeTo ?pattern .
                    ?uri arco-gm:numberOfIncidentEdges ?pd .
                    ?uri rdfs:label ?label .
                    ?uri rdfs:comment ?description .
                    FILTER(LANG(?label) = "" || LANGMATCHES(LANG(?label), "en"))
                    FILTER(LANG(?description) = "" || LANGMATCHES(LANG(?description), "en"))
                 } ORDER BY DESC(?pd)
        `;
    }
    getResourcesByClassWithPatternInstancesTheyBelongsTo(classUri) {
        return `
            ${this.getPrefixes()}
            SELECT DISTINCT ?uri (SAMPLE(?label) as ?label) (GROUP_CONCAT(DISTINCT ?patternInstanceWithTypeAndTypeLabel; SEPARATOR="|") AS ?belongsToPatternInstances) WHERE {
                ?uri a ?sc .
                ?sc rdfs:subClassOf* <${classUri}> .
                ?uri rdfs:label ?label .
                
                OPTIONAL
                  {
                    ?uri opla:belongsToPatternInstance ?patternInstance .
                    ?patternInstance a ?pattern .
                    ?pattern rdfs:label ?patternLabel.
                    BIND (CONCAT(?patternInstance, ';' , ?pattern, ';' , ?patternLabel ) AS ?patternInstanceWithTypeAndTypeLabel)
                  }            
            }
        `;
    }

    getPatternsByClass(classUri) {
        return `
                ${this.getPrefixes()}
                SELECT DISTINCT ?uri ?label WHERE {
                <${classUri}> opla:isNativeTo ?uri .
                ?uri rdfs:label ?label .
            }
        `;
    }
    getPatternInstancesWithTypeByResource(resourceUri) {
        return `
                ${this.getPrefixes()}
                SELECT DISTINCT ?uri ?type WHERE {
                <${resourceUri}> opla:belongsToPatternInstance ?uri .
                ?uri opla:isPatternInstanceOf ?type .
            }
        `;
    }
}
