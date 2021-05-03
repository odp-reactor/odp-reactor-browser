import React from "react";
import { Graph } from "react-d3-graph";
export function MobileVisualGraph({ visualGraph = [] }) {
    console.log(visualGraph);

    // the graph configuration, just override the ones you need
    const myConfig = {
        height: 1000, //"100%",
        directed: true,
        staticGraphWithDragAndDrop: true,
        // automaticRearrangeAfterDropNode: true,
        width: 1000, //"100%",
        // nodeHighlightBehavior: true,
        node: {
            labelPosition: "bottom",
            labelProperty: "label",
        },
        link: {
            renderLabel: true,
        },
    };

    const onClickNode = function (nodeId, node) {
        // const onNodeClick = node.data.onGraphinPatternNodeDoubleClick();
        const onNodeClick =
            node.data &&
            node.data.graphinProperties &&
            node.data.graphinProperties.graphinPatternNodeDoubleClick;
        onNodeClick();
    };

    const onClickLink = function (nodeId) {
        console.log(`Clicked link ${nodeId}`);
    };

    return (
        <div id="d3-graph-container">
            <Graph
                id="graph-id" // id is mandatory
                data={visualGraph}
                config={myConfig}
                onClickNode={onClickNode}
                onClickLink={onClickLink}
                nodeHighlightBehavior={true}
            />
        </div>
    );
}

// {
//     "automaticRearrangeAfterDropNode": false,
//     "collapsible": false,
//     "directed": false,
//     "focusAnimationDuration": 0.75,
//     "focusZoom": 1,
//     "freezeAllDragEvents": false,
//     "height": 400,
//     "highlightDegree": 1,
//     "highlightOpacity": 1,
//     "linkHighlightBehavior": false,
//     "maxZoom": 8,
//     "minZoom": 0.1,
//     "nodeHighlightBehavior": false,
//     "panAndZoom": false,
//     "staticGraph": false,
//     "staticGraphWithDragAndDrop": false,
//     "width": 800,
//     "d3": {
//       "alphaTarget": 0.05,
//       "gravity": -100,
//       "linkLength": 100,
//       "linkStrength": 1,
//       "disableLinkForce": false
//     },
//     "node": {
//       "color": "#d3d3d3",
//       "fontColor": "black",
//       "fontSize": 8,
//       "fontWeight": "normal",
//       "highlightColor": "SAME",
//       "highlightFontSize": 8,
//       "highlightFontWeight": "normal",
//       "highlightStrokeColor": "SAME",
//       "highlightStrokeWidth": "SAME",
//       "labelProperty": "id",
//       "mouseCursor": "pointer",
//       "opacity": 1,
//       "renderLabel": true,
//       "size": 200,
//       "strokeColor": "none",
//       "strokeWidth": 1.5,
//       "svg": "",
//       "symbolType": "circle"
//     },
//     "link": {
//       "color": "#d3d3d3",
//       "fontColor": "black",
//       "fontSize": 8,
//       "fontWeight": "normal",
//       "highlightColor": "SAME",
//       "highlightFontSize": 8,
//       "highlightFontWeight": "normal",
//       "labelProperty": "label",
//       "mouseCursor": "pointer",
//       "opacity": 1,
//       "renderLabel": false,
//       "semanticStrokeWidth": false,
//       "strokeWidth": 1.5,
//       "markerHeight": 6,
//       "markerWidth": 6,
//       "strokeDasharray": 0,
//       "strokeDashoffset": 0,
//       "strokeLinecap": "butt"
//     }
//   }
