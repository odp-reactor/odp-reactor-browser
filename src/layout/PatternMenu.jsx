import React, { useState, useEffect } from "react";
import { Menu, Icon, Popup, Divider } from "semantic-ui-react";

import LayoutSelector from "./LayoutSelector";
import LayoutToggle from "./LayoutToggle";

import { useLayoutCtx } from "./ctx/useLayoutCtx";

import { useTouch } from "./useTouch";

import "react-toggle/style.css"; // for ES6 modules

import "./PatternMenu.css";
import { useFilterCtx } from "../filters/ctx/useFilterCtx";
import { every, map } from "lodash";

export default function PatternMenu({
    showLayoutButton = true,
    children,
    style,
}) {
    const { layoutOptions, graphinLayoutHandler } = useLayoutCtx();

    const exampleMenuOpen = layoutOptions.exampleMenuOpen;

    const { isTouch } = useTouch();

    const menuStyle = {
        // position: "fixed",
        zIndex: 10,
        marginTop: 30,
    };

    const { filters, notifyReset } = useFilterCtx();

    const allFiltersHaveDefaultConfig =
        filters &&
        every(
            map(filters, (f) => {
                return { hasDefaultConfig: f.hasDefaultConfig() };
            }),
            ["hasDefaultConfig", true]
        );

    console.log("Filters should be defaults:", filters);

    return (
        <div
            style={{ ...menuStyle, ...style }}
            className={`menu-main ${"menu-main-over"}`}
        >
            <Menu vertical inverted>
                <Menu.Item className="menu-item filters-menu-button">
                    <div
                        style={{
                            color: "white",
                            fontSize: 18,
                            height: 20,
                            width: "100%",
                        }}
                    >
                        <div
                            className={`menu-main-title ${"menu-main-open"} filters-title`}
                            style={{ display: "flex" }}
                        >
                            <Icon name="filter" className="filters-icon" />
                            <div style={{ marginLeft: 15 }}>Filters</div>
                        </div>
                        {!allFiltersHaveDefaultConfig && (
                            <div
                                style={{ float: "right", cursor: "pointer" }}
                                onClick={() => {
                                    notifyReset();
                                }}
                            >
                                <Icon name="check" /> Reset
                            </div>
                        )}
                    </div>
                    <Menu.Menu className={""}>
                        {children &&
                            React.Children.toArray(children).map((c, index) => {
                                let child = c;
                                // return filters
                                return (
                                    <Menu.Item
                                        key={index}
                                        className={`menu-item filter-item filter-${
                                            child.props.id
                                        } ${
                                            child.props.topBorder
                                                ? "filter-item-border-top"
                                                : ""
                                        }`}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                marginBottom: 25,
                                                marginTop: 10,
                                            }}
                                        >
                                            {/* <Popup
                                                trigger={ */}

                                            <div
                                                className={
                                                    // getFilterById(
                                                    //     child.props.id
                                                    // ) &&
                                                    // getFilterById(
                                                    //     child.props.id
                                                    // ).isActive()
                                                    //     ? "active-filter filter-title"
                                                    //     : "filter-title"
                                                    "filter-title"
                                                }
                                                // style={{
                                                //     cursor: "pointer",
                                                // }}
                                                // onClick={() => {
                                                //     setInvertedFilterStateById(
                                                //         child.props.id
                                                //     );
                                                // }}
                                            >
                                                {child.props.title}
                                            </div>

                                            {/* }
                                                mouseEnterDelay={500}
                                                on="hover"
                                                content="Enable/disable filter"
                                                position="top center"
                                            /> */}
                                            <div
                                                className={
                                                    "toggle-help-container"
                                                }
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {/* <Popup
                                                    trigger={
                                                        <div>
                                                            <Toggle
                                                                id={
                                                                    child.props
                                                                        .id
                                                                }
                                                                checked={
                                                                    getFilterById(
                                                                        child
                                                                            .props
                                                                            .id
                                                                    ) &&
                                                                    getFilterById(
                                                                        child
                                                                            .props
                                                                            .id
                                                                    ).isActive()
                                                                }
                                                                onChange={() => {
                                                                    setInvertedFilterStateById(
                                                                        child
                                                                            .props
                                                                            .id
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    }
                                                    mouseEnterDelay={500}
                                                    on="hover"
                                                    content="Enable/disable filter"
                                                    position="top center"
                                                /> */}
                                                <div
                                                    className={`filter-help-tooltip-${child.props.id}`}
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <Popup
                                                        trigger={
                                                            <Icon
                                                                name="help"
                                                                size="large"
                                                                circular
                                                            />
                                                        }
                                                        on={["hover", "click"]}
                                                        content={
                                                            child.props
                                                                .description ||
                                                            "Filter Data"
                                                        }
                                                        position="top left"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <Menu.Menu
                                            className={`${child.props.id}-filter-button`}
                                        >
                                            {child}
                                        </Menu.Menu>
                                    </Menu.Item>
                                );
                            })}
                    </Menu.Menu>
                </Menu.Item>
                {showLayoutButton && (
                    <Menu.Item className="menu-item layouts-menu-button layout-item-border-top">
                        <div
                            style={{
                                fontSize: 18,
                            }}
                            // onClick={setLayoutButton}
                        >
                            <Icon name="picture" />
                            <div
                                className={`menu-main-title ${"menu-main-open"}`}
                            >
                                Layout
                            </div>
                        </div>
                        <Menu.Menu>
                            <LayoutToggle></LayoutToggle>
                        </Menu.Menu>
                    </Menu.Item>
                )}
                {showLayoutButton &&
                    layoutOptions.layout === "graph" &&
                    !isTouch && (
                        <LayoutSelector
                            value={graphinLayoutHandler.name}
                            onClick={(newLayout) => {
                                graphinLayoutHandler.setLayout(newLayout);
                            }}
                            menuOpen={exampleMenuOpen}
                        ></LayoutSelector>
                    )}
            </Menu>
        </div>
    );
}
