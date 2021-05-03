import React from "react";

import { Icon } from "semantic-ui-react";

export default function GoToButton({ style = {} }) {
    // const datasetURL =
    // http://localhost:3000/test-odpreactor/datasets/http%3A%2F%2Farco.istc.cnr.it%2Fldr%2Frdf%2Fd1608109514/patterns/https%3A%2F%2Fw3id.org%2Farco%2Fontology%2Flocation%2Ftime-indexed-typed-location/color/noColor

    const defaultStyle = {
        padding: 20,
        color: "white",
        borderRadius: 5,
        cursor: "pointer",
        zIndex: 10,
    };

    return (
        <div
            className="go-to-button"
            style={{
                ...defaultStyle,
                ...style,
            }}
            onClick={() => window.history.back()}
        >
            <Icon name="home" /> Back
        </div>
    );
}
