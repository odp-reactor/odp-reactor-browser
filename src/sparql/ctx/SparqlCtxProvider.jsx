import React from "react";
import { SparqlCtx } from "./SparqlCtx";
import { SparqlClient } from "./SparqlClient";
import { useSparqlEndpointUri } from "../../base/route/useSparqlEndpointUri"
import { useGraphUri } from "../../base/route/useGraphUri"

export function SparqlCtxProvider({ children }) {

    const sparqlEndpoint = useSparqlEndpointUri()
    const graph = useGraphUri()

    console.log("[*] SparqlEndpoint & Graph:", sparqlEndpoint, graph)

    const sparqlClient = SparqlClient.create({ sparqlEndpoint, graph });

    // set default filters
    return (
        <SparqlCtx.Provider
            value={{
                sparqlClient,
            }}
        >
            {children || null}
        </SparqlCtx.Provider>
    );
}
