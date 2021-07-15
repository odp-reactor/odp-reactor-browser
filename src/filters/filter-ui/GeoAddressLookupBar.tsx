import React, {useState, useEffect} from "react"

import {Input} from "semantic-ui-react"

import {Geocoder} from "../../locations/Geocoder"

interface OnReceivedPolygonResultCallback {
    (result: GeoJSON): void;
}

type SearchBarPlaceholderProps = {
    searchBarPlaceholder : string,
    onResult : OnReceivedPolygonResultCallback;
    geocodingReqeustDelay: number
}

const DEFAULT_GEOCODING_DELAY = 1000
const geocoder = new Geocoder()

function isAtLeastThreeChar(address: string) {
    return address.length > 2
}

export function GeoAddressLookupBar({
    searchBarPlaceholder,
    onResult = ()=>{},
    geocodingReqeustDelay=DEFAULT_GEOCODING_DELAY

} : SearchBarPlaceholderProps) {

    const [searchAddress, setSearchAddress] = useState("")

    const handleInput = (e: any) => {
        setSearchAddress(e.target.value)
    }

    // refactor this interaction with user click on a search button
    // to be open for autocompletion enahancement

    useEffect(() => {
        // set a delay after a user modify input before updating filtering
        const delayDebounceFn = setTimeout(() => {
            if (isAtLeastThreeChar(searchAddress)) {
                geocoder.geocode(searchAddress, true).then((geoJSON)=>{
                    console.log("GeocodedPolygon:", geoJSON)
                    // if isValidPolygon() {onResult(geoJSON)}
                    // else useError, setErrorAlert ...
                })
            }
        }, geocodingReqeustDelay);
        return () => clearTimeout(delayDebounceFn);
    }, [searchAddress]);

    return (
        <div className="search-component" style={{ marginLeft: 20 }}>
            <Input
                icon="search"
                className="search-item"
                placeholder={searchBarPlaceholder}
                onChange={handleInput}
            ></Input>
        </div>
    );
}