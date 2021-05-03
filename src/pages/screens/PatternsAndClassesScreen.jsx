import React from "react";
import PatternMenu from "../../layout/PatternMenu";
import List from "../../layout/List";
import ODPReactorContainer from "../../layout/ODPReactorContainer";
import { useLayoutCtx } from "../../layout/ctx/useLayoutCtx";
import VisualGraph from "../../layout/VisualGraph";
import { MobileVisualGraph } from "../../layout/MobileVisualGraph";
import { useTouch } from "../../layout/useTouch";
import AlertBox from "../../base/alert/AlertBox";
import { Navbar } from "../../layout/Navbar";

import PatternFilter from "../../filters/filter-ui/PatternFilter";
import LeftOccurencesSliderFilter from "../../filters/filter-ui/LeftOccurencesSliderFilter";
import RightOccurencesSliderFilter from "../../filters/filter-ui/RightOccurencesSliderFilter";
import ClassCentralityMeasureFilter from "../../filters/filter-ui/ClassCentralityMeasureFilter";
import { Grid } from "semantic-ui-react";

import GraphHelpBox from "../../base/help/GraphHelpBox";

export default function PatternsAndClassesScreen({ filteredKnowledgeGraph }) {
    const { layoutOptions } = useLayoutCtx();
    const { isTouch } = useTouch();

    const kg = filteredKnowledgeGraph !== null;

    console.log("Istouch:", isTouch);

    return (
        <ODPReactorContainer>
            <Navbar />
            <AlertBox />
            <GraphHelpBox />
            <Grid container stackable columns={2}>
                <Grid.Column width={12}>
                    {layoutOptions.layout === "list" && kg && (
                        <List
                            list={filteredKnowledgeGraph.toList()}
                            title="Views"
                        /> // queste pagine dovrebbero andare fuori dalla lib
                    )}
                    {kg && !isTouch ? (
                        <VisualGraph
                            visualGraph={filteredKnowledgeGraph.toVisualGraph()}
                        />
                    ) : (
                        <MobileVisualGraph
                            visualGraph={filteredKnowledgeGraph.toVisualGraph(
                                true
                            )}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={4}>
                    <PatternMenu>
                        <PatternFilter
                            topBorder={true}
                            title="View"
                            id="patternPie"
                            description="Check items to show views of the specified type. While a view is unchecked all related concepts are not shown. If no view is selected all the views are shown by default"
                        />
                        <LeftOccurencesSliderFilter
                            topBorder={true}
                            title="Min occurences"
                            id="leftOccurences"
                            description="Tune this filter to show only views with the number of occurences greater than the selected value"
                        />
                        <RightOccurencesSliderFilter
                            title="Max occurences"
                            id="rightOccurences"
                            description="Tune this filter to show only views with the number of occurences less than the selected value"
                        />
                        <ClassCentralityMeasureFilter
                            topBorder={true}
                            title="Concept relevance"
                            id="centrality"
                            description="Tune this filter to show concepts with an importance score greater than the selected value. The importance score is computed as the number of associated entities in the knowledge graph, normalized into 0-1. By default one key concept per view is shown."
                        />
                    </PatternMenu>
                </Grid.Column>
            </Grid>
        </ODPReactorContainer>
    );
}
