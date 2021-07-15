import React, {useState, useEffect} from "react"

import {Input, Button} from "semantic-ui-react"

import {Geocoder} from "../../locations/Geocoder"

interface OnReceivedPolygonResultCallback {
    (result: GeoJSONFeature): void;
}

type SearchBarPlaceholderProps = {
    searchBarPlaceholder : string,
    onResult : OnReceivedPolygonResultCallback;
}

const geocoder = new Geocoder()

function isAtLeastThreeChar(address: string) {
    return address.length > 2
}

function isValidPolygon(featureCollection: GeoJSONFeatureCollection) {
    const validGeometryType = ["Polygon", "MultiPolygon"]
    return featureCollection && featureCollection.features[0] && featureCollection.features[0].geometry && validGeometryType.includes(featureCollection.features[0].geometry.type) ? true : false
}

export function GeoAddressLookupBar({
    searchBarPlaceholder,
    onResult = ()=>{}
} : SearchBarPlaceholderProps) {

    const [searchAddress, setSearchAddress] = useState("")

    const handleInput = (e: any) => {
        setSearchAddress(e.target.value)
    }

    const onSearchButtonClick = () => {
        if (isAtLeastThreeChar(searchAddress)) {
            geocoder.geocode(searchAddress, true).then((featureCollection)=>{
                if (isValidPolygon(featureCollection)) {
                    onResult(featureCollection.features[0])
                } else {
                    console.log("useErrorAlert here")
                }
            })
        }
    } 

    return (
        <div className="" style={{ marginLeft: 20, marginBottom: 10, display: "flex" }}>
            <Input
                icon="search"
                className="geo-search-item"
                placeholder={searchBarPlaceholder}
                onChange={handleInput}
            ></Input>
            <Button onClick={onSearchButtonClick}>Search</Button>
        </div>
    );
}