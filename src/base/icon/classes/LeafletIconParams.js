import L from 'leaflet';

/**
 * Params used to build a leaflet icon.
 * Constructor will override default params
 */
export default class LeafletIconParams {
    /**
     * @param {Object} params a JSON object with params as attributes.
     * Params keys:
     * @param {string} iconUrl the path to iconUrl
     * @param {string} iconRetinaUrl
     * @param {number[]} iconAnchor by default top left corner of icon points to provided coordinates, change this to move your icon
     * @param {*} popupAnchor
     * @param {*} shadowUrl
     * @param {*} shadowSize
     * @param {*} shadowAnchor
     * @param {number} iconWidth the width of the icon
     * @param {number} iconHeight the heigth of the icon
     * @param {string} className css class
     */
    constructor(params) {
        this.iconUrl = params.iconUrl;
        this.iconRetinaUrl = params.iconRetinaUrl;
        this.iconAnchor = params.iconAnchor;
        this.popupAnchor = params.popupAnchor;
        this.shadowUrl = params.shadowUrl;
        this.shadowSize = params.shadowSize;
        this.shadowAnchor = params.shadowAnchor;
        this.iconSize = new L.Point(params.iconWidth, params.iconHeight);
        this.className = params.className;
    }
}
