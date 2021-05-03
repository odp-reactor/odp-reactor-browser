import { useContext } from "react";
import { FilterCtx } from "./FilterCtx";

export function useFilterCtx() {
    const {
        filters,
        useResetFilter,
        notifyReset,
        setNewFilter,
        setInvertedFilterStateById,
        setFilterOptionsById,
        getFilterById,
        setNewNonPersistentFilter,
        deleteNonPersistentFilter,
    } = useContext(FilterCtx);
    return {
        filters,
        useResetFilter,
        notifyReset,
        setNewFilter,
        setInvertedFilterStateById,
        getFilterById,
        setFilterOptionsById,
        setNewNonPersistentFilter,
        deleteNonPersistentFilter,
    };
}
