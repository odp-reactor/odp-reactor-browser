const axios = require('axios');

export class HttpRestClient {
    async get(route, { queryParams, headers } ){
        console.log("Axios route: ", route, process.env)
        return axios.get(route, { params: queryParams })
    }
    async post(){}
    async put(){}
    async delete(){}
}