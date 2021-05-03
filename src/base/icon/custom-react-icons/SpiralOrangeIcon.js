import React from 'react';

import CustomIcon from '../components/CustomIcon';

import svg from '../uri-encoded-icons/hypnosis.svg.uri';

export default function SpiralOrangeIcon(props) {
    return (
        <CustomIcon
            src={svg}
            message={props.message}
            iconClassName={props.iconClassName}
            descriptionClassName={props.descriptionClassName}
        ></CustomIcon>
    );
}
