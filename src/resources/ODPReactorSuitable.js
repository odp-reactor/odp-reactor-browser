// this class is more an interface
// here all the methods to make a linked data resource

import { map, filter } from "lodash";

// working with ODPReactor
export class ODPReactorSuitable {
    constructor() {}
    onGraphinResourceNodeDoubleClick() {
        if (this.graphinProperties)
            return this.graphinProperties.graphinResourceNodeDoubleClick;
    }
    onGraphinPatternNodeDoubleClick() {
        if (this.graphinProperties) {
            return this.graphinProperties.graphinPatternNodeDoubleClick;
        }
    }
    getGraphinStyle(key) {
        if (this.graphinProperties) {
            if (key) {
                if (this.graphinProperties.style) {
                    return this.graphinProperties.style;
                }
            }
            return this.graphinProperties.style;
        }
    }
    getGraphinShape() {
        if (this.graphinProperties) {
            return this.graphinProperties.shape;
        }
    }
    // @deprecated
    getGraphinOnNodeOverTooltip() {
        if (this.graphinProperties) {
            return this.graphinProperties.onNodeOverTooltip;
        }
    }
    onListItemClick() {
        if (this.listProperties) return this.listProperties.listItemClick;
    }
    onListEntityClick(entityURI) {
        if (this.listProperties)
            return () => {
                this.listProperties.listEntityClick(entityURI);
            };
    }
    getListKeys() {
        if (this.listProperties)
            return map(this.listProperties.listKeys, (keysObject) => {
                return keysObject;
            });
    }
    getHeaderLabels(keys) {
        const keyIds = keys.map((k) => {
            return k.id;
        });
        if (this.listProperties) {
            return map(keyIds, (keyId) => {
                const keyObjectWithIdK = filter(
                    this.listProperties.listKeys,
                    (keyObject) => {
                        return keyObject.id === keyId;
                    }
                )[0];
                return keyObjectWithIdK;
            });
        }
    }
    getListTitle() {
        if (this.listProperties) {
            return this.listProperties.listTitle;
        }
    }
}
