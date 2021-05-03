import { QueryBuilder } from "../base/query/QueryBuilder";

export class PatternInstanceQueryBuilder extends QueryBuilder {
    getPatternInstancesByPattern(patternURI) {
        // build the query for specific pattern
        let [
            instanceDependentVariables,
            body,
        ] = this.getInstanceInstanceDependentData(patternURI);

        return `
        
        ${this.getPrefixes()}

        SELECT DISTINCT ?instance 
                       ?label ?type 
                       ?patternLabel ?patternDescription ?nodes 
                       ${instanceDependentVariables}
        WHERE {
            ?instance opla:isPatternInstanceOf ?type .
            ?type opla:specializationOfPattern* <${patternURI}> .
            ?type rdfs:label ?patternLabel .
            ?type rdfs:comment ?patternDescription .
          
            OPTIONAL { 
              SELECT DISTINCT  ?instance (SAMPLE(?label) as ?label)  
                 WHERE {
                    ?instance <http://www.w3.org/2000/01/rdf-schema#label> ?label2B . 
                    BIND ( IF (BOUND (?label2B), ?label2B, '')  as ?label) . 
                      } 
            } . 
            
            OPTIONAL { 
              SELECT DISTINCT ?instance 
                              (GROUP_CONCAT(DISTINCT ?nodeType; SEPARATOR=";") AS ?nodes) 
                  WHERE { 
                    ?instance opla:hasPatternInstanceMember ?node .  
                    OPTIONAL { ?node rdf:type ?typet . } 
                    BIND (CONCAT(?node, " ",?typet) AS ?nodeType)
                        } GROUP BY ?instance 
                  } 
            ${body} 
      }`;
    }

    getInstanceInstanceDependentData(patternURI) {
        switch (patternURI) {
            case "https://w3id.org/arco/ontology/location/time-indexed-typed-location":
            case "http://www.ontologydesignpatterns.org/cp/owl/time-indexed-situation":
            case "http://www.ontologydesignpatterns.org/cp/owl/situation": {
                return [
                    "?locationType ?startTime ?endTime ?lat ?long ?addressLabel ?cProp ?cPropLabel",
                    `    OPTIONAL {SELECT ?instance (SAMPLE(?cProp) as ?cProp) (SAMPLE(?cPropLabel) as?cPropLabel) {OPTIONAL {?instance opla:hasPatternInstanceMember ?titl . ?titl rdf:type <https://w3id.org/arco/ontology/location/TimeIndexedTypedLocation> . ?cProp <https://w3id.org/arco/ontology/location/hasTimeIndexedTypedLocation> ?titl .?cProp rdfs:label ?cPropLabel .}}}OPTIONAL{ SELECT ?instance (SAMPLE(?locationType) as ?locationType) { OPTIONAL { ?instance opla:hasPatternInstanceMember ?titl . ?titl rdf:type <https://w3id.org/arco/ontology/location/TimeIndexedTypedLocation> . ?titl <https://w3id.org/arco/ontology/location/hasLocationType> ?locationType2B . ?locationType2B rdfs:label ?locationLabel . FILTER (lang(?locationLabel) = 'it') } BIND ( IF ( BOUND (?locationLabel), ?locationLabel, "" ) as ?locationType ) .} GROUP BY ?instance } OPTIONAL{ SELECT ?instance (SAMPLE(?addressLabel) as ?addressLabel) WHERE { OPTIONAL { ?instance opla:hasPatternInstanceMember ?titl . ?titl rdf:type <https://w3id.org/arco/ontology/location/TimeIndexedTypedLocation> . ?titl <https://w3id.org/arco/ontology/location/atSite> ?site . ?site <http://dati.beniculturali.it/cis/siteAddress>?siteAddress . ?siteAddress rdfs:label ?addressLabel2B . } BIND ( IF (BOUND (?addressLabel2B),?addressLabel2B,'')  as ?addressLabel ) .} GROUP BY ?instance } OPTIONAL{ SELECT ?instance (SAMPLE(?startTime) AS ?startTime) (SAMPLE(?endTime) as ?endTime) { OPTIONAL { ?instance opla:hasPatternInstanceMember ?titl . ?titl rdf:type <https://w3id.org/arco/ontology/location/TimeIndexedTypedLocation> . ?titl <https://w3id.org/italia/onto/TI/atTime> ?tInterval .  ?tInterval <https://w3id.org/arco/ontology/arco/startTime> ?startTime2B ; <https://w3id.org/arco/ontology/arco/endTime> ?endTime2B . }                       BIND ( IF ( BOUND (?startTime2B), ?startTime2B, "" ) as ?startTime ) . BIND ( IF ( BOUND (?endTime2B), ?endTime2B, "" ) as ?endTime ) . } GROUP BY ?instance } OPTIONAL{ SELECT ?instance (SAMPLE(?lat) as ?lat) (SAMPLE(?long) AS ?long) { OPTIONAL { ?instance opla:hasPatternInstanceMember ?titl .                    ?titl rdf:type <https://w3id.org/arco/ontology/location/TimeIndexedTypedLocation> . ?titl <https://w3id.org/arco/ontology/location/atSite> ?site .
              ?site <https://w3id.org/italia/onto/CLV/hasGeometry> ?geometry .
              ?geometry <https://w3id.org/italia/onto/CLV/lat>     ?lat2B .
              ?geometry <https://w3id.org/italia/onto/CLV/long>    ?long2B .   }
              BIND ( IF (BOUND (?lat2B),  ?lat2B,  '')  as ?lat) .
              BIND ( IF (BOUND (?long2B), ?long2B, '')  as ?long) .
             } GROUP BY ?instance
          }`,
                ];
            }
            case "https://w3id.org/arco/ontology/denotative-description/measurement-collection":
            case "http://www.ontologydesignpatterns.org/cp/owl/collection": {
                return [
                    "?measures ?cProp ?cPropLabel",
                    `OPTIONAL { SELECT ?instance ?cProp (SAMPLE(?cPropLabel) as ?cPropLabel) WHERE {
                      OPTIONAL   { ?instance opla:hasPatternInstanceMember ?cProp .
                                    ?cProp <https://w3id.org/arco/ontology/denotative-description/hasMeasurementCollection> ?mc .
                                    ?cProp rdfs:label ?cPropLabel
                                 }
                                 } GROUP BY ?instance ?cProp  }   
                  OPTIONAL { SELECT ?instance (GROUP_CONCAT(DISTINCT ?measure; SEPARATOR=";") AS ?measures) {  
                      ?instance opla:hasPatternInstanceMember ?node .
                      { ?node <https://w3id.org/arco/ontology/denotative-description/hasValue> ?val .
                      ?val <https://w3id.org/italia/onto/MU/value> ?value .
                  { SELECT ?instance (SAMPLE (?units) as ?unit) WHERE {
                          OPTIONAL {
                              ?instance opla:hasPatternInstanceMember ?node .
                              ?node <https://w3id.org/arco/ontology/denotative-description/hasValue> ?val .
                              ?val <https://w3id.org/italia/onto/MU/hasMeasurementUnit> ?u .
                              ?u rdfs:label ?units . }        
                          } GROUP BY ?instance
                  }                            
                  } 
                      BIND (CONCAT(?node, " ",?value, " ",STR(?unit)) AS ?measure)
                    } 
            }`,
                ];
            }
            case "https://w3id.org/arco/ontology/location/cultural-property-component-of":
            case "http://www.ontologydesignpatterns.org/cp/owl/part-of": {
                return [
                    "?parts ?cProp ?cPropLabel",
                    `OPTIONAL { SELECT ?instance (GROUP_CONCAT(DISTINCT ?node; SEPARATOR=";") AS ?parts) { OPTIONAL { 
                  ?instance opla:hasPatternInstanceMember ?node .
                  ?node <https://w3id.org/arco/ontology/arco/isCulturalPropertyComponentOf> ?cProp .
                  } 
                } 
        }OPTIONAL { SELECT ?instance (SAMPLE(?cProp) as ?cProp) (SAMPLE(?cPropLabel) as ?cPropLabel) WHERE {
          ?instance opla:hasPatternInstanceMember ?component .
                                ?component <https://w3id.org/arco/ontology/arco/isCulturalPropertyComponentOf> ?cProp .
                                ?cProp rdfs:label ?cPropLabel
                             } 
   } `,
                ];
            }
            default:
                return ["", ""];
        }
    }
}
