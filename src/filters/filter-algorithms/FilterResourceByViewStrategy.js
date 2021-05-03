import { every, some, map, filter as lodashFilter } from "lodash";

export class FilterResourceByViewStrategy {
    constructor(views) {
        this.views = views;
        this.class = this.constructor.name;
    }
    static create({ views }) {
        if (!views) return undefined;
        return new FilterResourceByViewStrategy(views);
    }
    filter(resource) {
        // no view selected return no resource
        if (
            !some(this.views, (view) => {
                return view.checked === true;
            })
        ) {
            return false;
        }
        if (
            !resource.patternInstances ||
            resource.patternInstances.length === 0
        ) {
            return false;
        } else {
            const checkedViewsUri = map(
                lodashFilter(this.views, (availableView) => {
                    return availableView.checked === true;
                }),
                (checkedView) => {
                    return checkedView.uri;
                }
            );
            const patternInstancesViews = map(
                resource.patternInstances,
                (patternInstance) => {
                    return patternInstance.type;
                }
            );
            if (
                // risorsa compare in almeno un istanza con il tipo tra i tipi selezionati
                // e.g. selezion Pattern1, Pattern2
                // risorsa deve comparire in almeno pattern_1 type Pattern1, pattern_2 type Pattern2
                every(checkedViewsUri, (checkedView) => {
                    return patternInstancesViews.includes(checkedView);
                })
            ) {
                return true;
            }
        }
    }
}
