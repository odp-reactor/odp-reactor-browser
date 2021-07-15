const axios = require('axios');

export class HttpRestClient {
    async get(route, { queryParams, headers } = {} ){
        return axios.get(route, queryParams ? { params: queryParams } : null)
    }
    async post(){}
    async put(){}
    async delete(){}
}