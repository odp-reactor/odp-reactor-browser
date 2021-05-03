import React from "react";
import { useParams } from "react-router-dom";

export function usePatternUri() {
    const { pattern } = useParams();
    return pattern ? decodeURIComponent(pattern) : undefined;
}
