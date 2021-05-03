import { GenericRepository } from "../base/GenericRepository";
import { map } from "lodash";

export class ConceptInstanceRepository {
    constructor(
        dbClient,
        conceptInstanceQueryBuilder,
        conceptInstanceDataMapper
    ) {
        //classesDataMapper
        this.genericRepository = new GenericRepository(
            dbClient,
            conceptInstanceDataMapper
            // new ClassDataMapper()
        );
        this.conceptInstanceQueryBuilder = conceptInstanceQueryBuilder;
    }
    static create({
        dbClient,
        conceptInstanceDataMapper,
        conceptInstanceQueryBuilder,
    }) {
        return new ConceptInstanceRepository(
            dbClient,
            conceptInstanceQueryBuilder,
            conceptInstanceDataMapper
        );
    }
    async findConceptInstancesByConceptWithPatternInstancesTheyBelongsTo(
        conceptUri
    ) {
        const conceptsWithPatternInstances = await this.genericRepository.fetchByQueryObject(
            this.conceptInstanceQueryBuilder.getConceptInstancesByConceptWithPatternInstancesTheyBelongsTo(
                conceptUri
            )
        );

        return map(conceptsWithPatternInstances, (r) => {
            if (r.belongsToPatternInstances === "") {
                return {
                    uri: r.uri,
                    label: r.label,
                    classLabel: r.classLabel,
                };
            }
            let patternInstances = r.belongsToPatternInstances.split("|");
            patternInstances = map(patternInstances, (patternInstance) => {
                const [uri, type, typeLabel] = patternInstance.split(";");
                return {
                    uri: uri,
                    type: type,
                    typeLabel: typeLabel,
                };
            });
            return {
                uri: r.uri,
                label: r.label,
                patternInstances: patternInstances,
                classLabel: r.classLabel,
            };
        });
    }
}
