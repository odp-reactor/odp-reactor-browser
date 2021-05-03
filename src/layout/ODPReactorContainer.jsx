import React from "react";

export default function ODPReactorContainer({ children }) {
    return <div style={appContainerStyle}>{children || null}</div>;
}

const appContainerStyle = {
    // height: "100vh",
    // width: "100vw",
    // display: "flex",
    // justifyContent: "center",
    // margin: "auto",
};
