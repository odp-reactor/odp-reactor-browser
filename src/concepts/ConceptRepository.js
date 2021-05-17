import { GenericRepository } from "../base/GenericRepository";

export class ConceptRepository {
    constructor(dbClient, conceptQueryBuilder, conceptDataMapper) {
        //classesDataMapper
        this.genericRepository = new GenericRepository(
            dbClient,
            conceptDataMapper
            // new ClassDataMapper()
        );
        this.conceptQueryBuilder = conceptQueryBuilder;
    }
    static create({ dbClient, conceptDataMapper, conceptQueryBuilder }) {
        return new ConceptRepository(
            dbClient,
            conceptQueryBuilder,
            conceptDataMapper
        );
    }
    async findClassesWithPatternsAndScores() {
        const classesWithPatternsAndScores = this.genericRepository.fetchByQueryObject(
            this.conceptQueryBuilder.getClassesWithPatternsAndScores()
        );
        return classesWithPatternsAndScores;
    }
}
