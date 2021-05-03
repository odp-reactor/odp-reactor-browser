import React, { useEffect } from "react";
import { useFilterCtx } from "./useFilterCtx";

// here understand how to return filter -> you should return filter or undefined if not exist
// return filter, if undefined filterUI must compute options and callback and setNewFilter

export default function useFiltersMountedFlag() {
    const { filtersMountedFlag, setFiltersMountedFlag } = useFilterCtx();
    return { filtersMountedFlag, setFiltersMountedFlag };
}
