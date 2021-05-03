import React, { useState } from "react";
import Joyride, { STATUS, ACTIONS } from "react-joyride";

import { useLayoutCtx } from "../../layout/ctx/useLayoutCtx";
import { useHelpCtx } from "./ctx/useHelpCtx";

import TemporaryMessage from "./TemporaryMessage";

export default function ConceptInstancesHelpBox() {
    const { isFirstAccess } = useHelpCtx("class-instances");
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
                    In this page you can see a list of resources. Every resource
                    may have one or more views. <br />
                    Click a resource in the list to see its details.
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
            content: "Type into the search bar to find resources",
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
                "Here you can see the number of resources shown displayed in the this list",
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
            target: ".filter-viewFilter",
            content:
                "Filter resources by associated views. By clicking on a resource you will be shown a particular view of resource properties",
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

        console.log("JoyRide callback");
        console.log(data);

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

        console.groupCollapsed(type);
        console.groupEnd();
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
