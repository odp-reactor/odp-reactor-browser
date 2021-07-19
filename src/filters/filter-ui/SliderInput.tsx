import React, { useEffect, useState } from "react"

import { decimalPlaces } from "../../base/math";


type SliderInputProps = {
    range: number[],
    domain: number[],
    onChange: OnChangeSliderExtremeValue,
    left: boolean,
    step: number
}

interface OnChangeSliderExtremeValue {
    (newRange : number[]) : void;
}

const LEFT = 0
const RIGHT = 1
const DEFAULT_RANGE = [0,0]

export function SliderInput({
    range=DEFAULT_RANGE,
    domain,
    onChange,
    left=true,
    step=1
}: SliderInputProps) {

    const [extreme, setExtreme] = useState(left ? range[LEFT] : range[RIGHT])

    useEffect(() => {

        const updateTimeout = setTimeout(()=>{
            if (!Number.isNaN(extreme)) {
                if (left) {
                    // update left extreme of the range
                    // if a number less then the boundary of the domain 
                    // then set the extreme to the lower boundary of the domain
                    if ((extreme >= domain[LEFT]) && (extreme <= range[RIGHT])) {
                        onChange([extreme, range[RIGHT]])
                    } else {
                        onChange([domain[LEFT], range[RIGHT]])
                    }
                } else {
                    if ((extreme <= domain[RIGHT]) && (extreme >= range[LEFT])) {
                        onChange([range[LEFT], extreme])
                    } else {
                        onChange([range[LEFT], domain[RIGHT]])
                    }
                }
            }
        },1000)

        return ()=>{
            clearTimeout(updateTimeout)
        }
    },[extreme])


    // this effect sync when you modify the extreme with the slider instead of the input
    useEffect(()=>{
        const updateTimeout = setTimeout(()=>{

            if (left) {
                if (!Number.isNaN(range[LEFT]) && range[LEFT] != extreme) {
                    setExtreme(range[LEFT])
                }
            } else {
                if (!Number.isNaN(range[RIGHT]) && range[RIGHT] != extreme) {
                    setExtreme(range[RIGHT])
                }
            }
        }, 200)

        return ()=>{
            clearTimeout(updateTimeout)
        }
    },[range])


    if (!range || Number.isNaN(range[LEFT]) || Number.isNaN(range[RIGHT])) {
        return null
    }


    const changeExtreme = (e : any) => {
        const newExtreme = Number.parseFloat(e.target.value)
        setExtreme(newExtreme)
    }

    const decimals = decimalPlaces(extreme)

    return <div style={
        {
            float: left ? "left" : "right"
        }
    }>
        <input
        type="number"
        step={step}
        style={{
            maxWidth: 60,
            height: 25,
            borderRadius: 5
        }}
        value={decimals > 2 ? extreme.toPrecision(2) : extreme}
        onChange={changeExtreme}       
    />
    </div>
}