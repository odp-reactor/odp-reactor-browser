import { QueryBuilder } from "../base/query/QueryBuilder";

export class PatternQueryBuilder extends QueryBuilder {
    getPatternsWithRelations() {
        return `
        ${this.getPrefixes()}
         
         SELECT DISTINCT  ?pattern ?label ?description (COUNT(DISTINCT ?instance) AS ?occurences) (GROUP_CONCAT(DISTINCT ?superPattern ; separator=';') AS ?superPatterns) (GROUP_CONCAT(DISTINCT ?component ; separator=';') AS ?components)
         WHERE  
           {   { SELECT  ?pattern ?instance ?label ?description
                 WHERE { GRAPH ?graph 
                      { ?instance  opla:isPatternInstanceOf  ?pattern .
                        ?pattern  a                     opla:Pattern ;
                               rdfs:label            ?label ;
                               rdfs:comment          ?description
                      }
                  }
                 GROUP BY ?pattern ?instance ?label ?description
               }
             UNION
               { SELECT  ?pattern ?label ?description ?superPattern ?component
                 WHERE { GRAPH ?graph
                   { ?pattern  a             opla:Pattern ;
                               rdfs:label    ?label ;
                               rdfs:comment  ?description
                     OPTIONAL
                       { ?pattern  opla:specializationOfPattern  ?superPattern2B }
                     OPTIONAL
                       { ?component2B  opla:componentOfPattern  ?pattern }
                     BIND(if(bound(?superPattern2B), ?superPattern2B, "") AS ?superPattern)
                     BIND(if(bound(?component2B), ?component2B, "") AS ?component)
                   }
                  }
                 GROUP BY ?pattern ?label ?description ?superPattern ?component
               }
           }
         GROUP BY ?pattern ?label ?description
      `;          
    }
}
