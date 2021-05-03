import React from "react";
import { Icon } from "semantic-ui-react";

export default function DropdownIcon({
    style = {},
    onClick = () => {},
    title,
    className = "",
}) {
    return (
        <div
            style={style}
            onClick={onClick}
            title={"Show/Close filter regulator"}
        >
            <Icon
                name="angle down"
                color="grey"
                size="large"
                className={`${className}`}
            />
        </div>
    );
}
