import React from "react";
import { nanoid } from "nanoid";

export function IncludeElementsWithMissingPropertyCheckbox({
    styles = { checkbox: {}, checkboxLabel: {} },
    classes = { checkbox: "", checkboxLabel: "" },
    onChange,
    checked,
    propertyName = "property",
}) {
    const checkboxId = `show-missing-property-elements-${nanoid()}`;

    console.log("Include", checked, nanoid());

    return (
        <div style={{ ...styles.checkbox }} className={`${classes.checkbox}`}>
            <input
                type="checkbox"
                id={checkboxId}
                style={{ ...styles.checkboxButton }}
                checked={checked}
                onChange={(e) => {
                    onChange(e.target.checked);
                }}
            />
            <label
                for={checkboxId}
                style={{ ...styles.checkboxLabel }}
                className={`${classes.checkboxLabel}`}
            >
                {`Include elements with missing ${propertyName}`}
            </label>
        </div>
    );
}
