import { Resource } from "./Resource";

import MeasurementConverter from "./MeasurementConverter";

export default class Measurement extends Resource {
    constructor(
        uri,
        label,
        description,
        value,
        unit,
        mConverter = new MeasurementConverter()
    ) {
        super(uri, label, description);
        this.value = value;
        this.unit = unit;
        this.mConverter = mConverter;
    }

    static create({ uri, label, value, description, unit }) {
        return new Measurement(uri, label, description, value, unit);
    }

    convert(newUnit) {
        // const mConverter = new MeasurementConverter();
        return this.mConverter.convert(this, newUnit);
    }

    getValue() {
        return this.value;
    }

    getUnit() {
        return this.unit;
    }
}
