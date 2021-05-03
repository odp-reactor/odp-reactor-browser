import { GenericRepository } from "../base/GenericRepository";

export class PatternInstanceRepository {
    constructor(
        dbClient,
        patternInstanceQueryBuilder,
        patternInstanceDataMapper
    ) {
        //classespatternInstanceDataMapper
        this.genericRepository = new GenericRepository(
            dbClient,
            patternInstanceDataMapper
        );
        this.patternInstanceQueryBuilder = patternInstanceQueryBuilder;
    }
    static create({
        dbClient,
        patternInstanceDataMapper,
        patternInstanceQueryBuilder,
    }) {
        return new PatternInstanceRepository(
            dbClient,
            patternInstanceQueryBuilder,
            patternInstanceDataMapper
        );
    }
    async findPatternInstancesByPattern(patternURI) {
        return this.genericRepository.fetchByQueryObject(
            this.patternInstanceQueryBuilder.getPatternInstancesByPattern(
                patternURI
            )
        );
    }
}
