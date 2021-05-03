import React from "react";

import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { Tick, Track, Handle, TooltipRail } from "./SliderComponents";
import { decimalPlaces } from "../../base/math";

const sliderStyle = {
    margin: "5%",
    position: "relative",
    width: "90%",
};

SliderFilter.defaultProps = {
    id: "slider",
    options: {},
};

const MIN = 0;
const MAX = 1;

export default function SliderFilter({
    range,
    domain,
    setRange,
    formatTicks = (d) => {
        const decimals = decimalPlaces(d);
        return `${decimals > 1 ? d.toPrecision(2) : d}`;
    },
    reversed = false,
    sliderStep = 0.1,
}) {
    // filter cannot work with one node
    const onChange = (newRange) => {
        if (!Number.isNaN(newRange[0]) && !Number.isNaN(newRange[1])) {
            setRange(newRange);
        } else {
            setRange([domain[reversed ? 1 : 0]]);
        }
    };

    if (domain[MIN] < domain[MAX]) {
        return (
            <div style={{ height: 40, width: "100%", marginTop: 20 }}>
                <Slider
                    mode={1}
                    step={sliderStep}
                    domain={domain}
                    rootStyle={sliderStyle}
                    onChange={onChange}
                    values={range}
                >
                    <Rail>
                        {(railProps) => (
                            <TooltipRail
                                {...railProps}
                                formatTooltip={formatTicks}
                            />
                        )}
                    </Rail>
                    {/* <Rail>
                             {({ getRailProps }) => (
                                <div style={railStyle} {...getRailProps()} />
                            )} 
                        </Rail> */}
                    <Handles>
                        {({ handles, getHandleProps }) => (
                            <div className="slider-handles">
                                {handles.map((handle) => (
                                    <Handle
                                        key={handle.id}
                                        handle={handle}
                                        domain={domain}
                                        getHandleProps={getHandleProps}
                                        formatTooltip={formatTicks}
                                    />
                                ))}
                            </div>
                        )}
                    </Handles>
                    <Tracks
                        left={reversed ? true : false}
                        right={reversed ? false : true}
                    >
                        {({ tracks, getTrackProps }) => (
                            <div className="slider-tracks">
                                {tracks.map(({ id, source, target }) => (
                                    <Track
                                        key={id}
                                        source={source}
                                        target={target}
                                        getTrackProps={getTrackProps}
                                    />
                                ))}
                            </div>
                        )}
                    </Tracks>
                    <Ticks values={domain}>
                        {({ ticks }) => (
                            <div className="slider-ticks">
                                {ticks.map((tick) => (
                                    <Tick
                                        key={tick.id}
                                        tick={tick}
                                        count={ticks.length}
                                        format={formatTicks}
                                    />
                                ))}
                            </div>
                        )}
                    </Ticks>
                </Slider>
            </div>
        );
    } else return null;
}
