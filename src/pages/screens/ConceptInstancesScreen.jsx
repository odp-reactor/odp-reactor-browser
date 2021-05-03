import React, { useState } from "react";
import PatternMenu from "../../layout/PatternMenu";
import List from "../../layout/List";
import ODPReactorContainer from "../../layout/ODPReactorContainer";
import AlertBox from "../../base/alert/AlertBox";
import ViewFilter from "../../filters/filter-ui/ViewFilter";
import GoToButton from "../../layout/GoToButton";
import { Grid } from "semantic-ui-react";
import ConceptInstancesHelpBox from "../../base/help/ConceptInstancesHelpBox";
import { Navbar } from "../../layout/Navbar";

export default function ConceptInstancesScreen({ filteredKnowledgeGraph }) {
    // we need here the available views for a URI
    // check the mechanism for change checked value in the checkbox

    return (
        <ODPReactorContainer>
            <GoToButton
                style={{
                    background: "#6c7ae0",
                    width: "fit-content",
                    position: "absolute",
                    padding: 15,
                    marginTop: 48,
                }}
            />
            <Navbar />
            <AlertBox />
            <ConceptInstancesHelpBox />
            <Grid container stackable columns={2}>
                <Grid.Column width={12}>
                    <List list={filteredKnowledgeGraph.toList()} />
                </Grid.Column>
                <Grid.Column width={4}>
                    <PatternMenu
                        showLayoutButton={false}
                        style={{ position: "absolute" }}
                    >
                        <ViewFilter
                            topBorder={true}
                            id="viewFilter"
                            title="Resource View"
                            description="Show only resources that are associated with the selected view."
                        />
                    </PatternMenu>
                </Grid.Column>
            </Grid>
        </ODPReactorContainer>
    );
}
