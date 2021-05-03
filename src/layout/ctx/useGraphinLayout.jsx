import React, { useState } from "react";

/**
 * @description A hook for Graphin visualization library. Returns layout and a function to set layout.
 * @author Christian Colonna
 * @date 10-11-2020
 * @export
 * @param {Object} baseLayout
 * @param {string} [baseLayout.name=force]
 * @param {Object} [baseLayout.options={}]
 * @returns {Object} layoutHandler
 */
export default function useLayout(baseLayout) {
    const defaultLayout = {
        type: "graphin-force",
        preset: {
            type: "concentric",
        },
        animation: false,
        preventOverlap: true,
        defSpringLen: (_edge, source, target) => {
            // ** La lunghezza della molla di 200 viene restituita per impostazione predefinita * /
            // ** Se vuoi produrre un effetto di raggruppamento, puoi considerare di impostare dinamicamente la lunghezza iniziale del bordo in base al grado dei nodi su entrambi i lati del bordo: minore è il grado, più corto è il bordo * /
            // const nodeSize = 30;
            // const Sdegree = sorgente.dati.layout.laurea;
            // const Tdegree = target.dati.layout.laurea;
            // const minDegree = Math.min(Sdegree, Tdegree);
            // console.log(minDegree < 3 ? nodeSize * 5 : minDegree * nodeSize);
            return 280;
            // return minDegree < 3 ? nodeSize * 5 : minDegree * nodeSize ;
        },
    };
    const [layout, setLayout] = useState(defaultLayout);
    return {
        type: layout,
        setLayout: (newLayout) => {
            setLayout({
                ...layout,
                type: newLayout,
            });
        },
    };
}
