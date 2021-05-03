export class RouteFactory {
    /**
     * @param {string} routeType string to choose route type (see {@link RouteEnum})
     * @param {object} params any kind of param to build routes (e.g. sparqlEndpoint, graph, resource uri)
     */
    static getRoute(routeType, params) {
        console.log("RouteType:",routeType)
        switch(routeType) {
            case RouteEnum.PATTERN_INSTANCES:
                return `${
                    process.env.PUBLIC_URL
                }/endpoints/${encodeURIComponent(
                    params.sparqlEndpoint
                )}/graphs/${
                    encodeURIComponent(params.graph)}/patterns/${encodeURIComponent(params.uri)}`;
            case RouteEnum.CONCEPT_INSTANCES:
                return `${
                    process.env.PUBLIC_URL
                }/endpoints/${encodeURIComponent(
                    params.sparqlEndpoint
                )}/graphs/${
                    encodeURIComponent(params.graph)
                }/concepts/${encodeURIComponent(params.uri)}`;
            case RouteEnum.RESOURCE:
                return `${process.env.REACT_APP_LDR_URL}/dataset/${encodeURIComponent(params.datasetId)}/resource/${encodeURIComponent(params.uri)}`
        }
        return undefined
    }
}

export const RouteEnum = {
    PATTERN_INSTANCES : "patternInstances",
    CONCEPT_INSTANCES : "conceptInstances",
    RESOURCE : "resource"
}