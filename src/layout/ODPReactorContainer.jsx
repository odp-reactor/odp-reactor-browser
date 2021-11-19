import React from "react";
import { CustomLoader } from "../base/loader/CustomLoader";

import "./ODPReactorContainer.css"

export default function ODPReactorContainer({ children }) {

    return <div style={appContainerStyle}>
        <div className="odpr-container">
            {children || null}
        </div>
        <div className="odpr-spinner">
            <CustomLoader/>
        </div>
    </div>;
}

const appContainerStyle = {
    // height: "100vh",
    // width: "100vw",
    // display: "flex",
    // justifyContent: "center",
    // margin: "auto",
};

