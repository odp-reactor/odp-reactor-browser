import Measurement from "./Measurement";

const v = 1;
const unit = "m";
const m = Measurement.create({ unit: unit, value: v });

test("Should create a new Measurement", () => {
    expect(m).toBeDefined();
});

test("Should have measurement value 1", () => {
    expect(m.getValue()).toBe(v);
});

test("Should have measurement unit m", () => {
    expect(m.getUnit()).toBe(unit);
});
