import { useContext, useEffect } from "react";
import { LayoutCtx } from "./LayoutCtx";

const mobileGraphCSSAttribute = "d3-graph-container";
const graphCSSAttribute = "graphin-container";
const listCSSAttribute = "list-container";

export function useLayoutCtx() {
    const {
        layoutOptions,
        setLayoutOptions,
        graphinLayoutHandler,
    } = useContext(LayoutCtx);

    // effect to make visible and invisible graph and list on layout switching
    useEffect(() => {
        let graphContainer = document.getElementById(graphCSSAttribute);
        let mobileGraphContainer = document.getElementById(
            mobileGraphCSSAttribute
        );
        let listContainer = document.getElementById(listCSSAttribute);
        if (layoutOptions.layout === "graph") {
            if (graphContainer) {
                graphContainer.style.display = "";
            }
            if (mobileGraphContainer) {
                mobileGraphContainer.style.display = "";
            }
            if (listContainer) {
                listContainer.style.display = "none";
            }
        } else {
            if (graphContainer) {
                graphContainer.style.display = "none";
            }
            if (mobileGraphContainer) {
                mobileGraphContainer.style.display = "none";
            }
            if (listContainer) {
                listContainer.style.display = "";
            }
        }
    }, [layoutOptions]);

    return {
        layoutOptions,
        setLayoutOptions,
        graphinLayoutHandler,
    };
}
