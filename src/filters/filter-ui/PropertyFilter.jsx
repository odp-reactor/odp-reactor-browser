import React, { useEffect, useState } from "react";

import { PieChart } from "react-minimal-pie-chart";
import { useBinaryArrayState } from "../../hooks/ld-ui-hooks";
import { useKGCtx } from "../../../knowledgegraph/KGCtx/useKGCtx";
import useFilter from "../../../filters/FilterCtx/useFilter";

import ColorGenerator from "../../classes/ColorGenerator";
import { FilterResourceByPropertyStrategy } from "../../../filters/filter-algorithms/FilterResourceByPropertyStrategy";

PropertyFilter.defaultProps = {
    id: "pie",
    options: {},
    property: "id",
};

/**
 * @description Filter data
 * @author Christian Colonna
 * @date 29-11-2020
 * @export
 * @param {[{ label : string, count : number, color : string, id : string
 * }]} {Object[]} { nodes } label: Property label, count: number of instances, color: color
 * @param {function} onFilter callback is called every time change filtered array,
 *                            it receives as argument the array of element filtered out.
 *                            Array contains index of the element as it passed as input to the filter.
 * @returns {JSX.Element}
 */
export default function PropertyFilter({ id = "pie", property = "id" }) {
    const { knowledgeGraph } = useKGCtx();

    const resources = knowledgeGraph.getResources();
    console.log(resources);

    const initialFilterOptions = {
        active: false,
        filterCallback: filterAlgorithm,
    };

    const { filter, setFilterOptions } = useFilter(id, initialFilterOptions);

    const [filtered, setFiltered] = useBinaryArrayState(
        (filter && filter.getStrategyOption("filtered")) || []
    );
    const [hovered, setHovered] = useState(null);

    const filterAlgorithm = FilterResourceByPropertyStrategy.create({
        filtered,
        property,
    });

    useEffect(() => {
        if (filter) {
            setFilterOptions({
                ...filter.options,
                filterCallback: filterAlgorithm,
            });
        }
    }, [filtered]);

    let values = {};

    resources.forEach((node) => {
        if (!values[node[property]]) {
            values[node[property]] = {
                id: node.id,
                color: node.color,
                value: 1,
            };
        } else {
            values[node[property]].value++;
        }
    });
    const colors = new ColorGenerator({
        colorCount: Object.keys(values).length,
    });

    const rndColors = colors.getColor();
    const data = Object.keys(values).map((k) => {
        let c = rndColors.next();
        return {
            id: values[k].id,
            title: k,
            value: values[k].value,
            color: filtered.includes(k) ? "grey" : c.value,
        };
    });

    return (
        <div>
            <div class="pie-chart-title">
                {data[hovered] ? data[hovered].title : null}
            </div>
            <PieChart
                lengthAngle={-360}
                animate
                paddingAngle={1}
                data={data}
                label={() => {
                    return data[hovered] ? data[hovered].value : null;
                }}
                segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
                labelStyle={{
                    fontSize: "20px",
                    fontFamily: "sans-serif",
                    fill: data[hovered] ? data[hovered].color : null,
                }}
                onMouseOver={(_, index) => {
                    setHovered(index);
                }}
                onMouseOut={() => {
                    setHovered(null);
                }}
                onClick={(_, index) => {
                    setFiltered(data[index].title);
                }}
                lineWidth={30}
                labelPosition={0}
            />
        </div>
    );
}
