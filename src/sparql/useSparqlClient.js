import { useContext } from "react";
import { SparqlCtx } from "./ctx/SparqlCtx";

export function useSparqlClient() {
    const { sparqlClient } = useContext(SparqlCtx);
    return { sparqlClient };
}
