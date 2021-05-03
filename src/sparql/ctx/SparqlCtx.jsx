import React from "react";

const SparqlCtx = React.createContext({
    sparqlCtx: {
        sparqlClient: undefined,
    },
});

export { SparqlCtx };
