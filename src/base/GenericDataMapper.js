import { map, forEach } from "lodash";

export class GenericDataMapper {
    async parseResults(comunicaBindings) {
        /*
        {
            uri:
            label:
            otherProp:
        }
        */
        let bindings = await comunicaBindings;
        const resources = map(bindings, (binding) => {
            const jsonResource = {};
            const variables = Array.from(binding.keys());
            forEach(variables, (v) => {
                const result = binding.get(v);
                jsonResource[stripeQuestionMark(v)] = result.value; // value convert from rdf object NamedNode, Literal giving just the value
            });
            return jsonResource;
        });
        return resources;
    }
}

const stripeQuestionMark = (sparqlVariable) => {
    return sparqlVariable.replace("?", "");
};
