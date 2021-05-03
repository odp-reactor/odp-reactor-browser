import { useEffect, useState } from "react";

import { useSparqlClient } from "../sparql/useSparqlClient";
import { ConceptRepository } from "./ConceptRepository";
import { ConceptQueryBuilder } from "./ConceptQueryBuilder";

export function useConceptsWithPatternsAndScores() {
    // get all dependencies
    const { sparqlClient } = useSparqlClient();
    const [data, setData] = useState(undefined);
    // get repository
    const conceptRepository = ConceptRepository.create({
        dbClient: sparqlClient,
        conceptQueryBuilder: new ConceptQueryBuilder(),
    });
    useEffect(() => {
        async function fetchData() {
            const conceptWithViewsAndScores = await conceptRepository.findClassesWithPatternsAndScores();
            setData(conceptWithViewsAndScores);
        }
        fetchData();
    }, []);
    return data;
}
