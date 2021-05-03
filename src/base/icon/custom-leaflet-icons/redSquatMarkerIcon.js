import leafletIcon from '../functions/leafletIcon';
import LeafletIconParams from '../classes/LeafletIconParams';

import svg from '../uri-encoded-icons/squat-marker-red.svg.uri';

const redMarkerIconParams = new LeafletIconParams({
    iconUrl: svg,
    className: 'ld-ui-div-icon',
    iconAnchor: [15, 50],
    popupAnchor: [0, -50],
});

/**
 * Marker icon
 */
const redSquatMarkerIcon = leafletIcon(redMarkerIconParams);

export default redSquatMarkerIcon;
