import React, { useState, useEffect } from "react";
import { clone, filter, find } from "lodash";

/**
 * availableView: {
 *      label
 *      uri
 *      checked
 * }
 */

/**
 * styles: {
 *     controllerContainer
 *     checkboxContainer
 *     checkboxButton
 *     checkboxLabel
 * }
 *
 * classes: {
 *     controllerContainer
 *     checkboxContainer
 *     checkboxLabel
 * }
 *
 * onViewConfigurationChange = ([viewUri1, viewUri2]) => {
 *      e.g. forEach uri => save selected View
 * }
 */

export default function ViewController({
    availableViews = [],
    styles = {},
    classes = {},
    onViewConfigurationChange = (clickedUri, checked) => {},
    onSelectAll = () => {},
    onDeselectAll = () => {},
    showSelectAllButtons = true,
}) {
    if (availableViews.length < 2) showSelectAllButtons = false;

    const defaultClasses = {
        controllerContainer: "",
        checkboxContainer: "",
        checkboxLabel: "",
        selectAllButton: "",
    };
    classes = { ...defaultClasses, ...classes };

    return (
        <div
            style={{ ...styles.controllerContainer }}
            className={`${classes.controllerContainer}`}
        >
            {availableViews.map((availableView, key) => {
                return (
                    <div
                        style={{ ...styles.checkboxContainer }}
                        className={`${classes.checkboxContainer}`}
                    >
                        <input
                            type="checkbox"
                            id={`view-checkbox-${availableView.uri}`}
                            style={{ ...styles.checkboxButton }}
                            checked={availableView.checked}
                            name={availableView.label}
                            value={availableView.uri}
                            onChange={(e) => {
                                onViewConfigurationChange(
                                    e.target.value,
                                    e.target.checked
                                );
                            }}
                        />
                        <label
                            for={`view-checkbox-${availableView.uri}`}
                            style={{ ...styles.checkboxLabel }}
                            className={`${classes.checkboxLabel}`}
                        >
                            {availableView.label}
                        </label>
                    </div>
                );
            })}
            {showSelectAllButtons && (
                <div
                    style={{
                        border: "1px solid",
                        borderRadius: 2,
                        ...styles.selectAllButtonContainer,
                    }}
                >
                    <div
                        style={{
                            fontSize: 15,
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}
                    >
                        <div
                            style={{
                                cursor: "pointer",
                                margin: "auto",
                                paddingBottom: 15,
                                paddingTop: 15,
                                flexGrow: 1,
                                borderRight: "1px solid",
                                textAlign: "center",
                                ...styles.selectAllButton,
                            }}
                            className={classes.selectAllButton}
                            onClick={onSelectAll}
                        >
                            Select All
                        </div>
                        <div
                            style={{
                                cursor: "pointer",
                                margin: "auto",
                                paddingBottom: 15,
                                paddingTop: 15,
                                flexGrow: 1,
                                textAlign: "center",
                                ...styles.deSelectAllButton,
                            }}
                            className={classes.selectAllButton}
                            onClick={onDeselectAll}
                        >
                            Deselect All
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
