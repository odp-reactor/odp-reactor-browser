import MeasurementConverter from "./MeasurementConverter";
import Measurement from "./Measurement";

const mConverter = new MeasurementConverter();

test("Convert from 1 m to cm", () => {
    const v = 1;
    const unit = "m";
    const newU = "cm";
    const m = Measurement.create({ unit: unit, value: v });
    const newM = mConverter.convert(m, newU);
    expect(newM.getValue()).toBe(100);
    expect(newM.getUnit()).toBe("cm");
});

test("Uknown measurement conversion should return undefined measure", () => {
    const newM = mConverter.convert(1, "m", "blablabla");
    expect(newM).toBe(undefined);
});
