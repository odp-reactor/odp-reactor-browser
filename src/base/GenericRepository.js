import { GenericDataMapper } from "./GenericDataMapper";

export class GenericRepository {
    constructor(dbClient, dataMapper) {
        this.dbClient = dbClient;
        this.dataMapper = dataMapper || new GenericDataMapper();
    }
    async fetchByQueryObject(queryString) {
        const results = this.dbClient.executeQuery(queryString);
        return this.dataMapper.parseResults(results); // parse can be a sql results parser
    }
    upsert() {}
    save() {}
    remove() {}
}
