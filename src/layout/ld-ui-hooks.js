import { useState, useEffect } from "react";

/* LD-UI-REACT
_____________________________________________________________ */

export function useTouch() {
    const [isTouch, setIsTouch] = useState(isTouchDevice());

    useEffect(() => {
        function handleResize() {
            console.log("I should handle resize");
            const isStillTouch = isTouchDevice();
            console.log("touch:", isStillTouch);
            if (isTouch !== isStillTouch) {
                setIsTouch(isStillTouch);
            }
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return { isTouch };
}

function isTouchDevice() {
    return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
    );
}

// to refactor you need to initialize the state outside o KG and pass the context, setContext from there
export function useHelp(context, setContext, message) {
    const setMessage = () => {
        setContext({ ...context, help: message });
    };
    return setMessage;
}

/**
 * @description A function to invert binary state.
 * @example 
 *  const [open, handleOpen] = useBinaryState(false)
 *  const [isLoaded, handleLoaded] = useBinaryState(true) 

 * @author Christian Colonna
 * @date 22-11-2020
 * @export
 * @param {boolean} [open=false]
 * @returns {function} the handler arrow function to change state set it onClick|Hover.. listeners
 */
export function useBinaryState(startOpen = false) {
    const [open, setOpen] = useState(startOpen);

    const handleOpen = () => {
        let newOpen = !open;
        setOpen(newOpen);
    };
    return [open, handleOpen];
}

/**
 * @description An hook for array with binary values
 *              Returns a function to update the state.
 *              Function accept an element as arg, if element is in state
 *              array it removes it else it add it.
 * @author Christian Colonna
 * @date 30-11-2020
 * @export
 * @param {any[]} [initialArg=[]] initial state
 * @returns {(item: any)=>{}} if item is in state array remove it else add it
 */
export function useBinaryArrayState(initialArg = []) {
    const [state, setState] = useState(initialArg);

    const updateState = (index) => {
        state.includes(index)
            ? // index in array then pull out
              setState(
                  state.filter((item) => {
                      return item !== index;
                  })
              )
            : // index not in array then push in
              setState((state) => [...state, index]);
    };
    return [state, updateState];
}

/* LEAFLET
_____________________________________________________________ */

/**
 * Mount a pane to the Leaflet map.
 * You can mount a layer for d3 or other graphic libraries or FeatureGroups.
 *
 * @param {Object} mapRef a ref to a Leaflet map
 * @param {string} paneName a name for the pane
 * @param {number} paneZIndex default 450
 */
export function usePane(mapRef, paneName, paneZIndex = 450) {
    useEffect(() => {
        mapRef.current.createPane(paneName);
        mapRef.current.getPane(paneName).style.zIndex = paneZIndex; // overlay-pane is 400 https://github.com/Leaflet/Leaflet/blob/v1.0.0/dist/leaflet.css#L87

        mapRef.current.getPane(paneName).style.pointerEvents = "none";
    }, []);
}

/* GRAPHIN
_____________________________________________________________ */

/**
 * @description A hook for Graphin visualization library. Bind filter function on node doubleclick
 * @author Christian Colonna
 * @date 16-11-2020
 * @export
 * @param {*} graphRef
 * @param {callback} filter (node) => {}
 */
export function useGraphinDoubleClick(graphRef, filter, depArray) {
    useEffect(() => {
        if (graphRef.current) {
            const { graph } = graphRef.current;
            const handleNodeDoubleClick = (e) => {
                const node = e.item._cfg.model.data;
                filter(node);
            };
            graph.on("node:dblclick", handleNodeDoubleClick);

            // release listener when component unmount
            return () => {
                graph.off("node:dblclick", handleNodeDoubleClick);
            };
        }
    }, []);
}

export function useGraphinHover(graphRef) {
    useEffect(() => {
        const { graph } = graphRef.current;

        const clearAllStats = () => {
            graph.setAutoPaint(false);
            graph.getNodes().forEach(function (node) {
                graph.clearItemStates(node);
            });
            graph.getEdges().forEach(function (edge) {
                graph.clearItemStates(edge);
            });
            graph.paint();
            graph.setAutoPaint(true);
        };
        const onMouseEnter = (e) => {
            const item = e.item;
            graph.setAutoPaint(false);
            graph.getNodes().forEach(function (node) {
                graph.clearItemStates(node);
                graph.setItemState(node, "highlight.dark", true);
            });
            graph.setItemState(item, "highlight.dark", false);
            graph.setItemState(item, "highlight.light", true);
            graph.getEdges().forEach(function (edge) {
                if (edge.getSource() === item) {
                    graph.setItemState(
                        edge.getTarget(),
                        "highlight.dark",
                        false
                    );
                    graph.setItemState(
                        edge.getTarget(),
                        "highlight.light",
                        true
                    );
                    graph.setItemState(edge, "highlight.light", true);
                    edge.toFront();
                } else if (edge.getTarget() === item) {
                    graph.setItemState(
                        edge.getSource(),
                        "highlight.dark",
                        false
                    );
                    graph.setItemState(
                        edge.getSource(),
                        "highlight.light",
                        true
                    );
                    graph.setItemState(edge, "highlight.light", true);
                    edge.toFront();
                } else {
                    graph.setItemState(edge, "highlight.light", false);
                }
            });
            graph.paint();
            graph.setAutoPaint(true);
        };
        graph.on("node:mouseenter", onMouseEnter);
        graph.on("node:mouseleave", clearAllStats);
        graph.on("canvas:click", clearAllStats);

        return () => {
            graph.off("node:mouseenter", onMouseEnter);
            graph.on("node:mouseleave", clearAllStats);
            graph.on("canvas:click", clearAllStats);
        };
    }, []);
}

/* GENERICS
_____________________________________________________________ */

/**
 * Returns window dimensions, listening to resize event.
 *
 * Example:
 *
 * const Component = () => {
 *     const { height, width } = useWindowDimensions();
 * }
 */
export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}

/**
 * Returns an object with browser window dimension
 * @returns {Object} {width, height}
 */
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}
