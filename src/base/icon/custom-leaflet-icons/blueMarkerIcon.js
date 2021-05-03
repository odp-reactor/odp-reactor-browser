import leafletIcon from '../functions/leafletIcon';
import LeafletIconParams from '../classes/LeafletIconParams';

import svg from '../uri-encoded-icons/blu-marker.svg.uri';

const blueMarkerIconParams = new LeafletIconParams({
    iconUrl: svg,
    className: 'ld-ui-div-icon',
    iconAnchor: [15, 50],
    popupAnchor: [0, -50],
});

/**
 * Marker icon
 */
const blueMarkerIcon = leafletIcon(blueMarkerIconParams);

export default blueMarkerIcon;
