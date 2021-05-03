import { useEffect, useState } from "react";

import { useSparqlClient } from "../sparql/useSparqlClient";
import { ConceptInstanceRepository } from "./ConceptInstanceRepository";
import { ConceptInstanceQueryBuilder } from "./ConceptInstanceQueryBuilder";

export function useConceptInstances(conceptUri) {
    // get all dependencies
    const { sparqlClient } = useSparqlClient();
    const [data, setData] = useState(undefined);
    // get repository
    const conceptInstanceRepository = ConceptInstanceRepository.create({
        dbClient: sparqlClient,
        conceptInstanceQueryBuilder: new ConceptInstanceQueryBuilder(),
    });
    useEffect(() => {
        async function fetchData() {
            const conceptInstances = await conceptInstanceRepository.findConceptInstancesByConceptWithPatternInstancesTheyBelongsTo(
                conceptUri
            );
            setData(conceptInstances);
        }
        fetchData();
    }, []);
    return data;
}
