import React, { useState, useEffect } from "react";
import ReactList from "react-list";

import "./List.css";
import { Icon, Popup } from "semantic-ui-react";

import SearchBarFilter from "../filters/filter-ui/SearchBarFilter";
import { find, forEach, orderBy, map, cloneDeep, uniqBy } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
import OutsideClickHandler from "react-outside-click-handler";
import { SparqlEndpointRepository } from "../sparql/SparqlEndpointRepository"

import { useSparqlClient } from "../sparql/useSparqlClient"
import { useRouteCommandFactory } from "../base/route/useRouteCommandFactory";
import { RouteFactory, RouteEnum } from "../base/route/RouteFactory";
import { showSpinner } from "./showSpinner";

/**
 * You can modify max-height to change table height and eventually remove max-height in
 * .body css class. This will make an infinite table you can handle with pagination.
 *
 * This a nice example:
 *  https://datatables.net/extensions/searchpanes/examples/initialisation/viewTotal.html
 */

const highlightRow = (e) => {
    let columnClass = e.target.classList[1];
    if (columnClass !== "icon" && typeof columnClass !== "undefined") {
        let columnCells = document.getElementsByClassName(columnClass);
        for (let c of columnCells) {
            let isHeader = c.classList[0] === "header-cell";
            if (isHeader) {
                c.classList.add("header-column-hover");
            } else {
                c.classList.add("column-hover");
            }
        }
    }
};

const clearRowLight = (e) => {
    let columnClass = e.target.classList[1];
    let columnCells = document.getElementsByClassName(columnClass);
    for (let c of columnCells) {
        let isHeader = c.classList[0] === "header-cell";
        if (isHeader) {
            c.classList.remove("header-column-hover");
        } else {
            c.classList.remove("column-hover");
        }
    }
};



export default function List({
    list,
    title,
    itemTooltip = "click to explore resources",
    listContainerStyle = {},
}) {

    const { sparqlClient } = useSparqlClient()
    const sparqlEndpointRepo = new SparqlEndpointRepository()
    const routeCommandFactory = useRouteCommandFactory(true)
    
    const onListItemClick = async (uri) => {
        console.log("[*] clicked node: ", uri)
        console.log("[*] sparqlClient",sparqlClient)
        const datasetId = await sparqlEndpointRepo.getDatasetIdBySparqlEndpointAndGraph({
            sparqlEndpoint: sparqlClient.sparqlEndpoint,
            graph: sparqlClient.graph
        })
        const routeParams = {
            datasetId: datasetId,
            uri: uri
        }
        const routeCommand = routeCommandFactory(RouteFactory.getRoute(RouteEnum.RESOURCE, routeParams))


        showSpinner()
        routeCommand.execute()
    }

    const defaultSortBy = {
        uri: undefined,
        label: undefined,
        id: undefined,
    };

    const [resources, setResources] = useState(list);
    const [sortResourceBy, setSortBy] = useState(defaultSortBy);

    const [sortDirection, setSortDirection] = useState("asc");

    console.log("LIST LENGTH", list.length);

    const sortingFunction = (resourcesList) => {
        let orderByKey = sortResourceBy.id;
        return orderBy(
            resourcesList,
            [
                (resourcesList) => {
                    if (resourcesList[orderByKey])
                        if (typeof resourcesList[orderByKey] === "string") {
                            return resourcesList[orderByKey].toLowerCase();
                        }
                    return resourcesList[orderByKey];
                },
            ],
            [sortDirection]
        );
    };

    const taggingFunction = (resourcesList) => {
        let resourceData = "";

        const newResources = [];
        forEach(resourcesList, (r) => {
            let orderByKey = sortResourceBy.uri
                ? sortResourceBy.uri
                : sortResourceBy.id;

            if (r[orderByKey] !== resourceData) {
                resourceData = r[orderByKey];
                r.initialRow = true;
                newResources.push(r);
            } else {
                r.initalRow = false;
                newResources.push(r);
            }
        });
        return newResources;
    };

    useEffect(() => {
        const newResources = taggingFunction(sortingFunction(cloneDeep(list)));
        setResources(newResources);
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    }, [sortResourceBy, list]);

    const renderMoreData = () => {
        setResourcesToRenderCount(resourcesToRenderCount + 20);
    };
    const [resourcesToRenderCount, setResourcesToRenderCount] = useState(20);
    const resourcesToRender = resources.slice(0, resourcesToRenderCount);

    const SAMPLE_RESOURCE = resources.length - 1;
    // keys will be used to render header and access node information
    const keys = resources[SAMPLE_RESOURCE]
        ? resources[SAMPLE_RESOURCE].getListKeys()
        : [];

    const headerLabels = resources[SAMPLE_RESOURCE]
        ? resources[SAMPLE_RESOURCE].getHeaderLabels(keys)
        : [];
    title = resources[SAMPLE_RESOURCE]
        ? resources[SAMPLE_RESOURCE].getListTitle()
        : "Instances";

    const [stickyWidth, setStickyWidth] = useState(null);

    useEffect(() => {
        window.onscroll = function () {
            myFunction();
        };

        // Get the header
        var header = document.getElementById("list-header");
        var table = document.getElementById("list-table");

        // Get the offset position of the navbar
        var sticky = header.offsetTop;

        // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
        function myFunction() {
            const width = table.clientWidth;
            if (window.pageYOffset > sticky) {
                header.classList.add("sticky-listbar");
                header.style.width = `${width}px`;
            } else {
                header.classList.remove("sticky-listbar");
                header.style.width = `100%`;
            }
        }
    }, []);

    //============================================== to remove

    const [scrolledToElement, setScrolledToElement] = useState(false);

    const renderRow = (index, key) => {
        let columnId = -1;
        if (resources.length > 0) {
            return (
                <div
                    // title={itemTooltip}
                    key={key}
                    className="table-item body-row "
                    // style={key % 2 == 0 ? { backgroundColor: "#f5f5f5" } : null}
                    id={resources[index].getUri()}
                    style={
                        resources[index].initialRow
                            ? {
                                  borderTop: "1px solid grey",
                              }
                            : {}
                    }
                >
                    {keys.map((keyObject) => {
                        const k = keyObject.id;
                        const kUri = keyObject.uri;
                        columnId++;
                        if (resources[index])
                            return (
                                <div
                                    className={`body-cell column-cell-${columnId}`}
                                    onMouseEnter={highlightRow}
                                    onMouseOut={clearRowLight}
                                    style={
                                        kUri && resources[index][kUri]
                                            ? { cursor: "pointer" }
                                            : {}
                                    }
                                    onClick={
                                        () => { 
                                            kUri &&
                                            resources[index][kUri] &&
                                            onListItemClick(resources[index][kUri])
                                        }
                                    }
                                >
                                    {resources[index][k]
                                        ? truncate(
                                              resources[index][k],
                                              Number.parseInt(
                                                  160 / headerLabels.length
                                              )
                                          )
                                        : "--"}
                                    {resources[index][`${k}MeasurementUnit`]
                                        ? " " +
                                          resources[index][
                                              `${k}MeasurementUnit`
                                          ]
                                        : null}
                                    {kUri && resources[index][kUri] ? (
                                        <div>
                                            <Icon name="linkify" />
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            );
                    })}
                </div>
            );
        }
    };

    let headerColumnId = -1;

    return (
        <div
            style={{ ...defaultListContainerStyle, ...listContainerStyle }}
            id="list-container"
        >
            <OutsideClickHandler
                onOutsideClick={() => {
                    setSortBy(defaultSortBy);
                }}
            >
                <div style={{ fontFamily: "Montserrat-Medium" }}>
                    <div
                        id="scroll-to-top-button"
                        onClick={scrollToTop}
                        style={{
                            position: "absolute",
                            left: -50,
                            top: 380,
                            cursor: "pointer",
                        }}
                    >
                        <div style={{ position: "fixed" }}>
                            <Icon name="arrow alternate circle up" size="big" />
                        </div>
                    </div>
                    <div>
                        <h1
                            style={{
                                backgroundColor: "#002933",
                                fontSize: 18,
                                color: "#fff",
                                padding: 10,
                                // borderRadius: "10px 10px 0px 0px",
                                textTransform: "uppercase",
                            }}
                            id="scroll-to-top"
                        >
                            {title}
                        </h1>
                        <div id="table-header-container">
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "baseline",
                                }}
                                id="search-container"
                            >
                                <SearchBarFilter />
                                {list.length !== 0 ? (
                                    <div
                                        className="result-display"
                                        style={{ marginRight: 50 }}
                                    >
                                        Showing 1 to {resources.length} of{" "}
                                        {resources.length} resources |{" "}
                                        {
                                            uniqBy(
                                                list,
                                                sortResourceBy &&
                                                    sortResourceBy.uri
                                                    ? sortResourceBy.uri
                                                    : sortResourceBy.id
                                            ).length
                                        }{" "}
                                        {sortResourceBy.label
                                            ? `different ${sortResourceBy.label.toLowerCase()}`
                                            : ""}
                                    </div>
                                ) : (
                                    <div
                                        className="result-display"
                                        style={{ marginRight: 50 }}
                                    >
                                        Showing 0 to 0 resources
                                    </div>
                                )}
                            </div>
                            <div className="header" id="list-header">
                                <div className="header-row">
                                    {headerLabels.map((hk) => {
                                        const h = hk.label;
                                        headerColumnId++;
                                        // get keys from first node
                                        return (
                                            <div
                                                className={`header-cell column-cell-${headerColumnId} `}
                                                onClick={() => {
                                                    setSortBy(hk);
                                                }}
                                                style={
                                                    hk.id === sortResourceBy.id
                                                        ? {
                                                              backgroundColor:
                                                                  headerLabels.length >
                                                                  1
                                                                      ? "rgb(108, 122, 224)"
                                                                      : "",
                                                              cursor: "pointer",
                                                          }
                                                        : {
                                                              cursor: "pointer",
                                                          }
                                                }
                                            >
                                                {h}{" "}
                                                {hk.id === sortResourceBy.id ? (
                                                    sortDirection === "asc" ? (
                                                        <Icon name="sort content descending" />
                                                    ) : (
                                                        <Icon name="sort content ascending" />
                                                    )
                                                ) : (
                                                    <Icon name="sort" />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="table" id="list-table">
                        <div className={"body"}>
                            <InfiniteScroll
                                dataLength={resourcesToRender.length}
                                next={renderMoreData}
                                hasMore={
                                    resourcesToRender.length < resources.length
                                        ? true
                                        : false
                                }
                                style={{ overflow: "hidden" }}
                                loader={<h4>Loading...</h4>}
                            >
                                <ReactList
                                    // itemsRenderer={(items, ref) => renderTable(items, ref)}
                                    itemRenderer={renderRow}
                                    length={resourcesToRender.length}
                                    type="variable"
                                    // scrollTo={
                                    //     context.clickedListElement
                                    //         ? context.clickedListElement
                                    //         : null
                                    // }
                                />
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    );
}

const defaultListContainerStyle = {
    marginLeft: "5%",
    marginRight: "2%",
    position: "relative",
    top: 70,
};

const scrollToTop = () => {
    const top = document.getElementById("scroll-to-top");
    const elementPosition = top.offsetTop;
    window.scrollTo({ behavior: "smooth", top: elementPosition - 200 });
};

// var elementPosition = document.getElementById('id').offsetTop;

// window.scrollTo({
//   top: elementPosition - 10, //add your necessary value
//   behavior: "smooth"  //Smooth transition to roll
// });

function truncate(s, maxLength = 40) {
    if (s.length > maxLength)
        return (
            <Popup
                trigger={<div>{s.substring(0, maxLength)} ...</div>}
                mouseEnterDelay={0}
                on="hover"
                content={`${s}`}
                inverted
                position="bottom left"
            />
        );
    else return s;
}
