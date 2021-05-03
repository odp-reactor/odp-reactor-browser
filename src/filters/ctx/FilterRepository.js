import Filter from "../Filter";
import { forEach, remove, filter } from "lodash";
import { FilterStrategyFactory } from "../filter-algorithms/FilterStrategyFactory";

// ctx resource is the "graph center" around which is organized the visualization
// e.g. at graph level is a grap uri
// at class instances level is a class uri (the instances type)
// at pattern instances level is the pattern uri
// it's used as a key to scope filters!
export class FilterRepository {
    constructor(ctxResource) {
        this.sessionStorageKey = `filters-${ctxResource}`;
    }
    saveAll(filters) {
        remove(filters, (f) => {
            return f.options.nonPersistent === true;
        });
        forEach(filters, (f) => {
            const filterId = f.getId();
            window.sessionStorage.setItem(
                `${this.sessionStorageKey}-${filterId}`,
                JSON.stringify(f)
            );
        });
    }
    loadAll() {
        const deserializedFilters = [];
        const sessionStorageFilterKeys = Object.keys(window.sessionStorage);
        const filterKeys = filter(
            sessionStorageFilterKeys,
            (sessionStorageFilterKey) => {
                return sessionStorageFilterKey.includes(this.sessionStorageKey);
            }
        );
        forEach(filterKeys, (filterKey) => {
            try {
                const f = JSON.parse(window.sessionStorage.getItem(filterKey));
                const deserializedF = Filter.create({
                    id: f.id,
                    options: {
                        ...f.options,
                        filterCallback: FilterStrategyFactory.make(
                            f.options.filterCallback
                        ),
                    },
                });
                deserializedFilters.push(deserializedF);
            } catch (e) {
                console.log(`[!] Cannot retrieve filter ${filterKey}`, e);
            }
        });
        return deserializedFilters;
    }
}
