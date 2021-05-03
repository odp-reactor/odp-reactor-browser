import React from "react";
import { useState } from "react";
import { LayoutCtx } from "./LayoutCtx";
import useGraphinLayout from "./useGraphinLayout";

export default function LayoutCtxProvider({
    children,
    defaultLayout = {
        layout: "graph",
        exampleMenuOpen: false,
        exampleFilterOpen: false,
        exampleLayoutOpen: false,
        exampleFiltersOpen: false,
        exampleFilterOccurencesOpen: false,
    },
}) {
    const [layoutOptions, setLayoutOptions] = useState(defaultLayout);

    const graphinLayoutHandler = useGraphinLayout();

    return (
        <LayoutCtx.Provider
            value={{ layoutOptions, setLayoutOptions, graphinLayoutHandler }}
        >
            {children || null}
        </LayoutCtx.Provider>
    );
}
