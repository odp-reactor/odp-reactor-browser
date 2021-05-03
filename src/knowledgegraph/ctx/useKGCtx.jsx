import { useContext, useEffect } from "react";
import { KGCtx } from "./KGCtx";

export function useKGCtx() {
    const { knowledgeGraph, classUri } = useContext(KGCtx);

    return {
        knowledgeGraph,
        classUri,
    };
}
