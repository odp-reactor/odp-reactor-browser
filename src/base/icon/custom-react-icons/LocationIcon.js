import React from 'react';

import CustomIcon from '../components/CustomIcon';

import svg from '../uri-encoded-icons/location.svg.uri';

export default function LocationIcon(props) {
    return <CustomIcon src={svg} message={props.message}></CustomIcon>;
}
