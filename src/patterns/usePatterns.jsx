import { useEffect, useState } from "react";

import { useSparqlClient } from "../sparql/useSparqlClient";
import { PatternRepository } from "./PatternRepository";
import { PatternQueryBuilder } from "./PatternQueryBuilder";

export function usePatterns() {
    // get all dependencies
    const { sparqlClient } = useSparqlClient();
    const [data, setData] = useState(undefined);
    // get repository
    const patternRepository = PatternRepository.create({
        dbClient: sparqlClient,
        patternQueryBuilder: new PatternQueryBuilder(),
    });
    useEffect(() => {
        async function fetchData() {
            const patternWithRelations = await patternRepository.findPatternsWithRelations();
            setData(patternWithRelations);
        }
        fetchData();
    }, []);
    return data;
}
