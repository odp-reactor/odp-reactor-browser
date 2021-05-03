import { useParams } from "react-router-dom";

export function useSparqlEndpointUri() {
    const { endpoint } = useParams();
    return endpoint ? decodeURIComponent(endpoint) : undefined;
}
