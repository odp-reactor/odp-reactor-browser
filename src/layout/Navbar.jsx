import React from "react";
import GoToButton from "./GoToButton";

import logo from "../images/logo.png" 

export function Navbar({}) {
    return (
        <div>
            <div id="navbar" className="ui fluid container">
                <nav
                    className={"ui menu inverted grid"}
                    style={{
                        backgroundColor: "rgba(0,0,0,.87)",
                    }}
                >
                    <a
                        className="brand item"
                        href={
                            process.env.REACT_APP_LDR_URL
                        }
                    >
                        {/* <GoToButton
                            style={{
                                // position: "absolute",
                                // top: 0,
                                // left: 0,
                                background: "#6c7ae0",
                            }}
                        /> */}
                        <img
                            style={{ height: 22, width: 22 }}
                            className="ui mini image"
                            src={logo || `Set a favicon url: process.env.REACT_APP_LOGO`}
                            alt="ld-reactor"
                        />
                    </a>
                    <a className="item" href={`${process.env.REACT_APP_LDR_URL}/about`}>
                        About {process.env.REACT_APP_NAME}{" "}
                    </a>
                    <a className="item" href={`${process.env.REACT_APP_LDR_URL}/datasets`}>
                        Knowledge Graphs
                    </a>
                    <div className="right menu">
                        {/* <div
                            className="item link"
                            onClick={this.showHelpModal}
                        >
                            <i className="small help circle icon"></i>
                        </div> */}
                        <a
                            href="https://github.com/Christian-Nja/odp-reactor"
                            className="ui item link"
                        >
                            <i className="github circle icon"></i> Github
                        </a>
                    </div>
                </nav>
            </div>
        </div>
    );
}
