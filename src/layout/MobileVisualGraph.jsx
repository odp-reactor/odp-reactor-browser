import React from "react";
import { Graph } from "react-d3-graph";


import { useRouteCommandFactory } from "../base/route/useRouteCommandFactory";
import { useSparqlClient } from "../sparql/useSparqlClient";
import { RouteFactory, RouteEnum } from "../base/route/RouteFactory" 

export function MobileVisualGraph({ visualGraph = [] }) {

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


    const { sparqlClient } = useSparqlClient() 
    const routeCommandFactory = useRouteCommandFactory()
    const onClickNode = function(nodeId, node) {

        const nodeProps = node.data

        let route;
        const routeParams = {
            sparqlEndpoint : sparqlClient.sparqlEndpoint,
            graph: sparqlClient.graph,
            uri: nodeProps.uri
        }
        if (nodeProps.type === "Pattern") {
            route = RouteFactory.getRoute(RouteEnum.PATTERN_INSTANCES, routeParams)
        } else if (nodeProps.type === "Class") {
            route = RouteFactory.getRoute(RouteEnum.CONCEPT_INSTANCES, routeParams)
        }
        const routeCommand = routeCommandFactory(route)

        console.log(nodeProps)
        // routeCommand.execute();
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
