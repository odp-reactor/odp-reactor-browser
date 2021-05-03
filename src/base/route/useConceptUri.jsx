import React from "react";
import { useParams } from "react-router-dom";

export function useConceptUri() {
    const { concept } = useParams();
    return concept ? decodeURIComponent(concept) : undefined;
}
