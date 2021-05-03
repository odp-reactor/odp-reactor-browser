import Qty from "js-quantities";

import Measurement from "./Measurement";

export default class MeasurementConverter {
    convert(m, newU) {
        try {
            const [newV, nU] = Qty(m.getValue(), m.getUnit())
                .format(newU)
                .toString()
                .split(" ");
            return Measurement.create({
                label: m.getLabel(),
                description: m.getDescription(),
                uri: m.getUri(),
                unit: nU,
                value: newV * 1,
            });
        } catch (e) {
            return undefined;
        }
    }
}
