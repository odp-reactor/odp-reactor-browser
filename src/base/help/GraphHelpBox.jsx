import React, { useState } from "react";
import Joyride, { STATUS, ACTIONS } from "react-joyride";

import { useLayoutCtx } from "../../layout/ctx/useLayoutCtx";
import { useHelpCtx } from "./ctx/useHelpCtx";

import TemporaryMessage from "./TemporaryMessage";

export default function GraphHelpBox() {
    const { isFirstAccess } = useHelpCtx("graph");
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
                    This visualisation shows you a summary of the entire
                    knowledge graph. <br /> Diamonds represent concepts (i.e.
                    classes) and circles represent "views" on these concepts.{" "}
                    <br /> Only key concepts are visualised but you can
                    customise the visualisation to show additional ones. <br />{" "}
                    The presence of an edge between a concept and a view shows
                    that the concept is involved in that view with a prominent
                    role. <br /> Move the mouse over circles and diamonds to get
                    details about them and the data they contain. <br /> Double
                    click on any node of the graph to explore its content.{" "}
                    <br /> For example in the "Cultural Property Measurements"
                    you can find data about relevant measurements applied to
                    cultural properties (e.g. height, length, etc.), along with
                    their values.
                </div>
            ),
            locale: { skip: <strong aria-label="skip">End tutorial</strong> },
            placement: "center",
            target: "body",
            hideCloseButton: true,
        },
        {
            target: ".menu-main",
            locale: { skip: <strong aria-label="skip">End tutorial</strong> },
            content: "Filter or interact with data through this panel",
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
            target: ".filters-menu-button",
            content: "Here you see the available filters",
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
            target: ".filter-help-tooltip-patternPie",
            content:
                "Every filter has a specific behaviour. Mouse over the question mark to show a tooltip with explanations",
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
            target: ".layouts-menu-button",
            content: "Select your preferred layout between graph or list",
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
            target: ".graph-layouts-menu-button",
            content: "Choose among different graph layouts",
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
        // {
        //     target: ".filter-occurences",
        //     content:
        //         "Tune filter values to refine your search within the knowledge graph",
        //     locale: { skip: <strong aria-label="skip">End tutorial</strong> },
        //     hideCloseButton: true,
        // },
        {
            target: ".graph-tooltip-checkbox",
            content:
                "Click here to disable or enable the explanations that appear when your mouse moves over graph circles and diamonds",
            locale: { skip: <strong aria-label="skip">End tutorial</strong> },
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

        const element = document.querySelector(step.target);
        if (element) {
            element.scrollIntoView({
                // behavior: "smooth",
                block: "center",
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
                    // scrollToFirstStep={true}
                    // scrollToSteps={true}
                    showProgress={true}
                    showSkipButton={true}
                    disableScrolling={true}
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
