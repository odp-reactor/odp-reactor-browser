import React, { useEffect, useState } from "react";
import { FilterCtx } from "./FilterCtx";
import { clone, remove, find, cloneDeep } from "lodash";
import Filter from "../Filter";
import { FilterRepository } from "./FilterRepository";

// resourceUri: the filter works on. It is used to scope the filter
export default function FilterCtxProvider({
    children,
    resourceUri,
    resetFilters = false,
}) {
    const filterRepository = new FilterRepository(resourceUri);

    const savedFilters = filterRepository.loadAll() || [];

    const [filters, setFilters] = useState(resetFilters ? [] : savedFilters);

    const [filterShouldReset, setFilterShouldReset] = useState(false);

    const notifyReset = () => {
        setFilterShouldReset(true);
    };

    const useResetFilter = (onFilterReset) => {
        console.log("Tooo many callss function", onFilterReset);
        useEffect(() => {
            console.log("Tooo many callss", onFilterReset);
            if (filterShouldReset) {
                onFilterReset();
                setFilterShouldReset(false);
            }
        }, [filterShouldReset]);
    };

    const setNewFilter = (id, options) => {
        if (!getFilterById(id)) {
            const filter = Filter.create({ id, options });
            filters.push(filter);
            const newFilters = cloneDeep(filters);
            setFilters(newFilters);
            filterRepository.saveAll(newFilters);
        }
    };

    const setNewNonPersistentFilter = (id, options) => {
        options = { ...options, nonPersistent: true };
        if (!getFilterById(id)) {
            const filter = Filter.create({ id, options });
            filters.push(filter);
            const newFilters = cloneDeep(filters);
            setFilters(newFilters);
        }
    };
    const deleteNonPersistentFilter = (id) => {
        const newFilters = clone(filters);
        remove(newFilters, (f) => {
            return f.id === id;
        });
        setFilters(newFilters);
    };

    const getFilterById = (id) => {
        return find(filters, (f) => {
            return f.getId() === id;
        });
    };

    const setFilterOptionsById = (id, options) => {
        let filterToUpdate = getFilterById(id);
        filterToUpdate.setOptions(options);
        const newFilters = cloneDeep(filters);
        setFilters(newFilters);
        filterRepository.saveAll(newFilters);
    };
    const setInvertedFilterStateById = (id) => {
        let filterToUpdate = getFilterById(id);
        filterToUpdate.invertState();
        const newFilters = cloneDeep(filters);
        setFilters(newFilters);
        filterRepository.saveAll(newFilters);
    };

    // set default filters
    return (
        <FilterCtx.Provider
            value={{
                filters,
                useResetFilter,
                notifyReset,
                getFilterById,
                setNewFilter,
                setFilterOptionsById,
                setInvertedFilterStateById,
                setNewNonPersistentFilter,
                deleteNonPersistentFilter,
            }}
        >
            {children || null}
        </FilterCtx.Provider>
    );
}
