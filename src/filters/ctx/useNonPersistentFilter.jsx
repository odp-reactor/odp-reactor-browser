import React, { useEffect } from "react";
import { useFilterCtx } from "./useFilterCtx";

// here understand how to return filter -> you should return filter or undefined if not exist
// return filter, if undefined filterUI must compute options and callback and setNewFilter

export default function useNonPersistentFilter(id, options) {
    const {
        getFilterById,
        setNewNonPersistentFilter,
        deleteNonPersistentFilter,
        setFilterOptionsById,
        setInvertedFilterStateById,
    } = useFilterCtx();
    const filter = getFilterById(id);
    // if no filter we mount it
    useEffect(() => {
        if (!filter) {
            setNewNonPersistentFilter(id, options);
        }
        return () => {
            deleteNonPersistentFilter(id);
        };
    }, []);
    const setFilterOptions = (options) => {
        setFilterOptionsById(id, options);
    };
    const setInvertedFilterState = () => {
        setInvertedFilterStateById(id);
    };
    return { filter, setFilterOptions, setInvertedFilterState };
}
