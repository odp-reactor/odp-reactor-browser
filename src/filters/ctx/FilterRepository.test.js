import { FilterRepository } from "./FilterRepository";
import Filter from "../Filter";
import { FilterPatternByViewStrategy } from "../filter-algorithms/FilterPatternByViewStrategy";

describe("Integration test for save and load a filter", () => {
    const mockSessionStorageKey = "http://example_uri/ns/";
    const sampleFilterId = "filter-by-view";
    const filtered = ["http://example_resource/ns"];
    const filterRepository = new FilterRepository(mockSessionStorageKey);
    const filterPatternByViewStrategy = FilterPatternByViewStrategy.create({
        filtered,
    });
    const filterPatternView = Filter.create({
        id: sampleFilterId,
        options: {
            active: true,
            filterCallback: filterPatternByViewStrategy,
        },
    });
    const fakeBrokenFilterId = "broken-filter";
    const brokenFilter = Filter.create({
        id: fakeBrokenFilterId,
        options: {
            active: true,
            filterCallback: undefined, // this will cause the break
        },
    });
    test("It should save and load Filter. Filter should keep it's state", () => {
        const filters = [filterPatternView];
        filterRepository.saveAll(filters);
        const loadedFilters = filterRepository.loadAll();
        console.log("TestRepository");
        console.log(loadedFilters);
        expect(loadedFilters).toBeDefined();
        expect(loadedFilters.length).toBe(1);
        const loadedFilterPatternByView = loadedFilters[0];
        expect(loadedFilterPatternByView).toBeDefined();
        expect(loadedFilterPatternByView.getId()).toBe(sampleFilterId);
        expect(loadedFilterPatternByView.isActive()).toBeTruthy();
        const filteredResource = loadedFilterPatternByView.getStrategyOption(
            "filtered"
        );
        console.log(filteredResource);
        expect(filteredResource).toBeDefined();
        expect(filteredResource.length).toBe(1);
        expect(filteredResource.includes(filtered[0])).toBeTruthy();
    });
    test("It should save and load filterPatternView and doesn't load brokenFilter", () => {
        const filters = [filterPatternView, brokenFilter];
        filterRepository.saveAll(filters);
        const loadedFilters = filterRepository.loadAll();
        console.log("TestRepository");
        console.log(loadedFilters);
        expect(loadedFilters).toBeDefined();
        expect(loadedFilters.length).toBe(1);
        const loadedFilterPatternByView = loadedFilters[0];
        expect(loadedFilterPatternByView).toBeDefined();
        expect(loadedFilterPatternByView.getId()).toBe(sampleFilterId);
        expect(loadedFilterPatternByView.isActive()).toBeTruthy();
        const filteredResource = loadedFilterPatternByView.getStrategyOption(
            "filtered"
        );
        console.log(filteredResource);
        expect(filteredResource).toBeDefined();
        expect(filteredResource.length).toBe(1);
        expect(filteredResource.includes(filtered[0])).toBeTruthy();
    });
});
