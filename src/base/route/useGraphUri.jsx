import { useParams } from "react-router-dom";

export function useGraphUri() {
    const { graph } = useParams();
    return graph ? decodeURIComponent(graph) : undefined;
}
