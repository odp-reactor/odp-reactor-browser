import { GenericRepository } from "../base/GenericRepository";

export class PatternRepository {
    constructor(dbClient, patternQueryBuilder, patternDataMapper) {
        //classesDataMapper
        this.genericRepository = new GenericRepository(
            dbClient,
            patternDataMapper
        );
        this.patternQueryBuilder = patternQueryBuilder;
    }
    static create({ dbClient, patternDataMapper, patternQueryBuilder }) {
        return new PatternRepository(
            dbClient,
            patternQueryBuilder,
            patternDataMapper
        );
    }
    async findPatternsWithRelations() {
        const classesWithPatternsAndScores = this.genericRepository.fetchByQueryObject(
            this.patternQueryBuilder.getPatternsWithRelations()
        );
        return classesWithPatternsAndScores;
    }
}
