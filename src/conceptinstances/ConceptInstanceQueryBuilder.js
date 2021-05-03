import { QueryBuilder } from "../base/query/QueryBuilder";

export class ConceptInstanceQueryBuilder extends QueryBuilder {
    getConceptInstancesByConceptWithPatternInstancesTheyBelongsTo(conceptUri) {
        return ` 
        ${this.getPrefixes()}
        SELECT DISTINCT ?uri 
                        (SAMPLE(?label) as ?label) 
                        (SAMPLE(?classLabel) as ?classLabel) 
                        (GROUP_CONCAT(DISTINCT ?patternInstanceWithTypeAndTypeLabel; SEPARATOR="|") AS ?belongsToPatternInstances)
                WHERE {
                    ?uri a ?sc .
                    ?sc rdfs:subClassOf* <${conceptUri}> .
                    <${conceptUri}> rdfs:label ?classLabel.
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
}
