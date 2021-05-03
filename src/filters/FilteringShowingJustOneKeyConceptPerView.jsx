import { forEach, orderBy, find } from "lodash";
import React from "react";
import Filter from "./Filter";

import KnowledgeGraphPipe from "./KnowledgeGraphPipe";

const MORE_IMPORTANT_CONCEPT = 0;

export default function FilteringShowingJustOneKeyConceptPerView({
    filteredKnowledgeGraph,
    filters,
    children,
}) {
    const concepts = filteredKnowledgeGraph.getClasses();
    // set concept not visible if it has no related view
    forEach(concepts, (c) => {
        const views = filteredKnowledgeGraph.getPatternsByClassIsNativeTo(
            c.getUri()
        );
        const hasViews = views.length !== 0;
        filteredKnowledgeGraph.updateResourceProperty(
            c.getUri(),
            "hasViews",
            hasViews ? true : false
        );
    });

    const conceptsFilters = [
        Filter.create({
            id: "hideConceptsWithoutViews",
            options: {
                active: true,
                filterCallback: new HideConceptsWithViewsStrategy(),
            },
        }),
    ];

    // if filter by centrality is not active
    // add a filter to remove all concepts but the first for a view
    if (
        find(filters, (f) => {
            return f.getId() === "centrality" && !f.isActive();
        })
    ) {
        const patterns = filteredKnowledgeGraph.getPatterns();
        forEach(patterns, (pattern) => {
            const classesBelongingToPattern = filteredKnowledgeGraph.getClassesNativeToPattern(
                pattern.getUri()
            );
            const oneClassIsVisibleForThisPattern = find(
                classesBelongingToPattern,
                (c) => {
                    return c.isVisible;
                }
            );
            if (!oneClassIsVisibleForThisPattern) {
                const classesSortedByRelevance = orderBy(
                    classesBelongingToPattern,
                    [(d) => Number.parseInt(d.centralityScore)],
                    ["desc"]
                );
                if (classesSortedByRelevance[MORE_IMPORTANT_CONCEPT]) {
                    filteredKnowledgeGraph.updateResourceProperty(
                        classesSortedByRelevance[
                            MORE_IMPORTANT_CONCEPT
                        ].getUri(),
                        "isVisible",
                        true
                    );
                }
            }
        });
        conceptsFilters.push(
            Filter.create({
                id: "showOneKeyConceptPerKey",
                options: {
                    active: true,
                    filterCallback: new ShowOneKeyConceptPerViewStrategy(),
                },
            })
        );
    }

    // filter again
    const centralityKgPipe = KnowledgeGraphPipe.create(filteredKnowledgeGraph);
    // remove nodes connected to edge
    filteredKnowledgeGraph = centralityKgPipe.chain(conceptsFilters).toGraph();

    return (
        <div>
            {children
                ? React.Children.map(children, (child) => {
                      return React.cloneElement(child, {
                          filteredKnowledgeGraph: filteredKnowledgeGraph,
                      });
                  })
                : null}
        </div>
    );
}

class HideConceptsWithViewsStrategy {
    filter(resource) {
        if (resource.getType() === "Class") {
            if (!resource.hasViews) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }
}

class ShowOneKeyConceptPerViewStrategy {
    constructor() {}
    filter(resource) {
        if (resource.getType() === "Class") {
            if (!resource.isVisible) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }
}
