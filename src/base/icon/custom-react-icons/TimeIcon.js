import React from 'react';

import CustomIcon from '../components/CustomIcon';

import svg from '../uri-encoded-icons/clock-calendar.svg.uri';

export default function TimeIcon(props) {
    return <CustomIcon src={svg} message={props.message}></CustomIcon>;
}
