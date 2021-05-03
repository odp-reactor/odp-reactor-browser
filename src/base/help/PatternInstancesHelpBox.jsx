import React, { useState } from "react";
import Joyride, { STATUS, ACTIONS } from "react-joyride";

import { useLayoutCtx } from "../../layout/ctx/useLayoutCtx";
import { useHelpCtx } from "./ctx/useHelpCtx";

import TemporaryMessage from "./TemporaryMessage";

export default function PatternInstancesHelpBox() {
    const { isFirstAccess } = useHelpCtx("pattern-instances");
    const { layoutOptions, setLayoutOptions } = useLayoutCtx();
    const [runTour, setRunTour] = useState(isFirstAccess);

    const startTourOnClick = (e) => {
        e.preventDefault();
        setRunTour(true);
    };

    const steps = [
        {
            content: (
                <div>
                    In this page you can see a list of views. Click on a list
                    row to access the view instance and see data and resources
                    involved in this view.
                </div>
            ),
            locale: { skip: <strong aria-label="skip">End tutorial</strong> },
            placement: "center",
            target: "body",
            hideCloseButton: true,
        },
        {
            target: ".search-component",
            locale: { skip: <strong aria-label="skip">End tutorial</strong> },
            content:
                "Type into the search bar to find views. E.g. type 'chiesa' to search all the views available for elements related to 'chiesa'",
            spotlightClicks: true,
            styles: {
                options: {
                    zIndex: 10000,
                },
            },
            placement: "right",
            hideCloseButton: true,
        },
        {
            target: "#list-header",
            locale: { skip: <strong aria-label="skip">End tutorial</strong> },
            content:
                "Click header to sort elements in ascending and descending order on clicked property. Elements will be grouped by the same value for clicked property",
            spotlightClicks: true,
            styles: {
                options: {
                    zIndex: 10000,
                },
            },
            placement: "right",
            hideCloseButton: true,
        },
        {
            target: ".result-display",
            content:
                "Here you can see the number of views displayed in this list",
            locale: { skip: <strong aria-label="skip">End tutorial</strong> },
            spotlightClicks: true,
            styles: {
                options: {
                    zIndex: 10000,
                },
            },
            placement: "left",
            hideCloseButton: true,
        },
        {
            target: ".menu-main",
            locale: { skip: <strong aria-label="skip">End tutorial</strong> },
            content:
                "For every view you can find semantically related filters to skim items. E.g. you can filter Cultural Property Locations by location type, Cultural Property Measurements by height or length.",
            spotlightClicks: true,
            styles: {
                options: {
                    zIndex: 10000,
                },
            },
            placement: "left",
            hideCloseButton: true,
        },
        {
            target: ".go-to-button",
            content: "Click here to go back to the knowledge graph page",
            locale: { skip: <strong aria-label="skip">End tutorial</strong> },
            spotlightClicks: true,
            styles: {
                options: {
                    zIndex: 10000,
                },
            },
            placement: "bottom",
            hideCloseButton: true,
        },
        {
            target: ".help-button",
            content: "Click here to see this tutorial again",
            locale: { skip: <strong aria-label="skip">End tutorial</strong> },
            hideCloseButton: true,
        },
    ];

    const handleJoyrideCallback = (data) => {
        const { status, type, step, action, index } = data;

        const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

        if (finishedStatuses.includes(status)) {
            setRunTour(false);
        }
        // main menu

        if (step.target === ".filters-menu-button") {
            setLayoutOptions({
                ...layoutOptions,
                exampleFiltersOpen: true,
            });
        }

        if (step.target === ".layouts-menu-button") {
            setLayoutOptions({
                ...layoutOptions,
                exampleLayoutOpen: true,
            });
        }

        if (step.target === ".filter-occurences") {
            setLayoutOptions({
                ...layoutOptions,
                exampleFilterOccurencesOpen: true,
            });
        }

        if (step.target === ".menu-main") {
            setLayoutOptions({
                ...layoutOptions,
                exampleMenuOpen: true,
            });
        }

        if (action === "stop") {
            setLayoutOptions({
                ...layoutOptions,
                exampleMenuOpen: false,
                exampleLayoutOpen: false,
                exampleFiltersOpen: false,
                exampleFilterOccurencesOpen: false,
            });
        }

        // console.groupCollapsed(type);
        // console.groupEnd();
    };

    return (
        <div style={boxStyle}>
            <div style={msgStyle} onClick={startTourOnClick}>
                <Joyride
                    callback={handleJoyrideCallback}
                    steps={steps}
                    continuous={true}
                    run={runTour}
                    scrollToFirstStep={true}
                    showProgress={true}
                    showSkipButton={true}
                    styles={{
                        options: {
                            zIndex: 10000,
                        },
                    }}
                />
                <TemporaryMessage
                    message={""}
                    style={{
                        color: "rgb(13, 60, 97)",
                        backgroundColor: "rgb(232, 244, 253)",
                        borderRadius: 4,
                        color: "rgb(13, 60, 97)",
                        position: "absolute",
                        top: -125,
                        left: 0,
                        width: "fit-content",
                        fontWeight: "bolder",
                        padding: 20,
                    }}
                />
            </div>
        </div>
    );
}

const msgStyle = {
    size: 12,
    fontSize: "medium",
};
const boxStyle = {
    position: "fixed",
    top: 650,
    left: 0,
    zIndex: 10,
    cursor: "pointer",
    background: "grey",
    opacity: 0.9,
    textAlign: "center",
    transition: 0.3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};
