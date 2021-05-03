import { FilterStrategyFactory } from "./FilterStrategyFactory";
import { FilterPatternByViewStrategy } from "./FilterPatternByViewStrategy";

const filterPatternByView1 = FilterPatternByViewStrategy.create({
    filtered: ["id0"],
});

test("Should create FilterPatternByView strategy from DTO", () => {
    const strategyClass = filterPatternByView1.class;
    let serializedPatternByView = JSON.stringify(filterPatternByView1);
    const strategyDTO = JSON.parse(serializedPatternByView);
    const unserializedFilterPatternByView1 = FilterStrategyFactory.make(
        strategyDTO
    );
    expect(unserializedFilterPatternByView1).toBeDefined();
    expect(unserializedFilterPatternByView1.constructor.name).toBe(
        strategyClass
    );
    expect(unserializedFilterPatternByView1.class).toBe(strategyClass);
    expect(unserializedFilterPatternByView1.filtered).toBeDefined();
    expect(unserializedFilterPatternByView1.filtered.length).toBe(1);
    expect(
        unserializedFilterPatternByView1.filtered.includes("id0")
    ).toBeTruthy();
});
