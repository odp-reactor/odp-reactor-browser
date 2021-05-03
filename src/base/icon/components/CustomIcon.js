import React from 'react';

export default function CustomIcon(props) {
    return (
        <i>
            <img
                src={props.src}
                className={`ld-ui-div-icon simple-icon ${
                    props.iconClassName ? props.iconClassName : ''
                }`}
            ></img>
            <p
                className={`icon-description ${
                    props.descriptionClassName ? props.descriptionClassName : ''
                }`}
            >
                {props.message}
            </p>
            <br />
        </i>
    );
}
