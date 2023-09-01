import React from 'react';
import Loader from 'react-loader-spinner';


export function CustomLoader({}) {
    return <div style={{textAlign: "center", position:"absolute", top: "45vh", left: "45vw"}}> 
            <Loader type={"RevolvingDot"}
                color={"#2185d0"}
                height={100}
                width={100}
            />
        </div>

}
