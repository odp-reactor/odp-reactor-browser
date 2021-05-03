import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { SwitchContainer } from "./SwitchContainer";
import "semantic-ui-css/semantic.min.css";
import "leaflet/dist/leaflet.css";
import "./KG.css";

export function ODPReactorGraphRoot({ children }) {
    return (
        <Router>
            <SwitchContainer />
        </Router>
    );
}
