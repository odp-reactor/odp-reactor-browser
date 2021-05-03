import leafletIcon from '../functions/leafletIcon';
import LeafletIconParams from '../classes/LeafletIconParams';

import svg from '../uri-encoded-icons/black-arrowhead-pointing-up.svg.uri';

const blackArrowHeadIconParams = new LeafletIconParams({
    iconUrl: svg,
    className: 'ld-ui-div-icon',
    iconAnchor: [15, 50],
    popupAnchor: [0, -50],
});

const blackArrowHeadIcon = leafletIcon(blackArrowHeadIconParams);

export default blackArrowHeadIcon;
