import React from 'react';

import CustomIcon from '../components/CustomIcon';

import svg from '../uri-encoded-icons/star.svg.uri';

export default function StarIcon(props) {
    return (
        <CustomIcon
            src={svg}
            message={props.message}
            iconClassName={props.iconClassName}
            descriptionClassName={props.descriptionClassName}
        ></CustomIcon>
    );
}
