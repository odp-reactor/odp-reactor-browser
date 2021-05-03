import htmlIcon from "../functions/htmlIcon";

import svg from "../uri-encoded-icons/museum-icon.svg.uri";

export default function museumIcon(message) {
    return htmlIcon(svg, message, "cultural-property");
}
