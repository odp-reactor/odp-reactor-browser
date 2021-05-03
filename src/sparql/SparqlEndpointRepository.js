import { HttpRestClient } from "../base/http/HttpRestClient"

export class SparqlEndpointRepository {
    constructor(client, dataMapper) {
        this.client = client || new HttpRestClient()
        this.dataMapper = dataMapper
    }
    async getDatasetIdBySparqlEndpointAndGraph({ sparqlEndpoint, graph}) {
        const res = await this.client.get(`${process.env.REACT_APP_LDR_URL}/datasetId`,
            { queryParams: {
                    sparqlEndpoint : sparqlEndpoint,
                    graph: graph
            } } )
        // if res check the response
        return res.data && res.data.datasetId ? res.data.datasetId : undefined
    }
}