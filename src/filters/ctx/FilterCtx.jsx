import React from "react";

const FilterCtx = React.createContext({
    filters: [],
    filtersMounted: false,
});

export { FilterCtx };
