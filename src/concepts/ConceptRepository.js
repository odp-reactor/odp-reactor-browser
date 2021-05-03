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
    // async findAllClassesWithCentralityScore() {
    //     const classesWithCentralityScore = this.genericRepository.fetchByQueryObject(
    //         this.classQuery.getClassesWithCentralityScore()
    //     );
    //     return classesWithCentralityScore;
    // }
    // async findClassesWithPatternsTheyBelongsTo() {
    //     const classesAndPatterns = this.genericRepository.fetchByQueryObject(
    //         this.classQuery.getClassesWithPatternsTheyBelongsTo()
    //     );
    //     return classesAndPatterns;
    // }

    // async findResourcesByClassWithPatternInstancesTheyBelongsTo(classUri) {
    //     const resources = this.genericRepository.fetchByQueryObject(
    //         this.classQuery.getResourcesByClassWithPatternInstancesTheyBelongsTo(
    //             classUri
    //         )
    //     );
    //     return resources;
    // }
    // async findPatternsByClass(classUri) {
    //     const patterns = this.genericRepository.fetchByQueryObject(
    //         this.classQuery.getPatternsByClass(classUri)
    //     );
    //     return patterns;
    // }
    // async findAllPatternInstancesWithTypeByResource(resourceUri) {
    //     const patternInstances = this.genericRepository.fetchByQueryObject(
    //         this.classQuery.getPatternInstancesWithTypeByResource(resourceUri)
    //     );
    //     return patternInstances;
    // }
}
