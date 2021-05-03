import { useEffect, useState } from "react";

import { useSparqlClient } from "../sparql/useSparqlClient";
import { PatternInstanceRepository } from "./PatternInstanceRepository";
import { PatternInstanceQueryBuilder } from "./PatternInstanceQueryBuilder";

export function usePatternInstances(patternURI) {
    // get all dependencies
    const { sparqlClient } = useSparqlClient();
    const [data, setData] = useState(undefined);
    // get repository
    const patternInstanceRepository = PatternInstanceRepository.create({
        dbClient: sparqlClient,
        patternInstanceQueryBuilder: new PatternInstanceQueryBuilder(),
    });
    useEffect(() => {
        async function fetchData() {
            const patternInstances = await patternInstanceRepository.findPatternInstancesByPattern(
                patternURI
            );
            setData(patternInstances);
        }
        fetchData();
    }, []);
    return data;
}
