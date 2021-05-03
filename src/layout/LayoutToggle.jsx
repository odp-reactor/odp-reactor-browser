import React, { useState, useEffect } from "react";

import { Button } from "semantic-ui-react";
import { useLayoutCtx } from "./ctx/useLayoutCtx";

export default function LayoutToggle() {
    const { layoutOptions, setLayoutOptions } = useLayoutCtx();
    const [value, setValue] = useState(layoutOptions.layout);

    useEffect(() => {
        setLayoutOptions({
            ...layoutOptions,
            layout: value,
        });
    }, [value]);

    return (
        <div
            style={{
                color: "white",
                display: "flex",
                justifyContent: "space-evenly",
                marginBottom: 10,
                marginTop: 20,
            }}
            title={"Switch layout"}
        >
            <Button.Group>
                <Button
                    active={value === "graph" ? true : false}
                    toggle={value === "graph" ? true : false}
                    onClick={() => {
                        setValue("graph");
                    }}
                >
                    Graph
                </Button>
                <Button.Or />
                <Button
                    active={value === "list" ? true : false}
                    toggle={value === "list" ? true : false}
                    onClick={() => {
                        setValue("list");
                    }}
                >
                    List
                </Button>
            </Button.Group>
        </div>
    );
}
