/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";

import DropdownIcon from "./DropdownIcon";
import { useBinaryState } from "./ld-ui-hooks";

import { Menu, Icon, Checkbox } from "semantic-ui-react";
import { useLayoutCtx } from "./ctx/useLayoutCtx";

import {
    TrademarkCircleOutlined,
    ChromeOutlined,
    BranchesOutlined,
    ApartmentOutlined,
    AppstoreOutlined,
    CopyrightCircleOutlined,
    CustomerServiceOutlined,
    ShareAltOutlined,
} from "@ant-design/icons";

const itemMap = [
    { name: "concentric", icon: <ChromeOutlined /> },
    { name: "graphin-force", icon: <BranchesOutlined /> },
    { name: "dagre", icon: <ApartmentOutlined /> },
    { name: "grid", icon: <AppstoreOutlined /> },
    { name: "radial", icon: <ShareAltOutlined /> },
];

export default function LayoutSelector(props) {
    const { layoutOptions, setLayoutOptions } = useLayoutCtx();
    const [open, handleOpen] = useBinaryState(false);

    useEffect(() => {
        if (open) {
            handleOpen();
        }
    }, [props.menuOpen]);

    return (
        <Menu.Item className="menu-item graph-layouts-menu-button">
            <div
                style={{ cursor: "pointer", fontSize: 18 }}
                onClick={handleOpen}
                title={"Change graph disposition"}
            >
                <Icon name="pie graph" />
                <div
                    className={`menu-main-title ${
                        // props.menuOpen ? "menu-main-open" : ""
                        "menu-main-open"
                    }`}
                >
                    Graph Layouts
                </div>
                <DropdownIcon
                    style={{
                        transform: open ? null : "rotate(270deg)",
                        position: "relative",
                        cursor: "pointer",
                        width: "fit-content",
                        // display: props.menuOpen ? "inline-block" : "none",
                        display: "inline-block",
                        float: "right",
                    }}
                    className={
                        // props.menuOpen
                        //     ? "menu-dropdown menu-open-dropdown"
                        //     : "menu-dropdown"
                        "menu-dropdown menu-open-dropdown"
                    }
                />
            </div>
            {open ? (
                <div
                    style={{ marginBottom: 10, marginTop: 30, marginLeft: 20 }}
                >
                    <Menu.Menu>
                        {itemMap.map((item, key) => {
                            return (
                                <Menu.Item
                                    key={key}
                                    onClick={() => {
                                        props.onClick(item.name);
                                    }}
                                >
                                    {item.icon} {item.name}
                                </Menu.Item>
                            );
                        })}
                    </Menu.Menu>
                </div>
            ) : null}
        </Menu.Item>
    );
}
