import React, {useState, useEffect} from "react"

import {Input, Button} from "semantic-ui-react"

import {Geocoder} from "../../locations/Geocoder"

interface OnReceivedPolygonResultCallback {
    (result: GeoJSONFeature): void;
}

interface OnResulNotFoundCallback {
    (searchAddress : string) : void;
}

type SearchBarPlaceholderProps = {
    searchBarPlaceholder : string,
    searchButtonNextLine : boolean,
    onResult : OnReceivedPolygonResultCallback;
    onResultNotFound: OnResulNotFoundCallback
}

const geocoder = new Geocoder()

function isAtLeastThreeChar(address: string) {
    return address.length > 2
}

function isValidPolygon(featureCollection: GeoJSONFeatureCollection) {
    const validGeometryType = ["Polygon", "MultiPolygon"]
    return featureCollection && featureCollection.features[0] && featureCollection.features[0].geometry && validGeometryType.includes(featureCollection.features[0].geometry.type) ? true : false
}

// async function raiseOnTimeout(operation : ()=> Promise<any> , milliseconds:number) {
//     return new Promise(function(resolve,reject) {
//         setTimeout(function() {
//             reject(new Error("Operation didn't complete in " + milliseconds + " ms"))
//         }, milliseconds)

//         operation().then(res=>{resolve(res)}, err=> {reject(err)})
//     })
// }

export function GeoAddressLookupBar({
    searchBarPlaceholder,
    searchButtonNextLine = false,
    onResult = ()=>{},
    onResultNotFound = ()=>{}
} : SearchBarPlaceholderProps) {

    const [searchAddress, setSearchAddress] = useState("")

    const handleInput = (e: any) => {
        setSearchAddress(e.target.value)
    }

    const onSearchButtonClick = () : void => {
        if (isAtLeastThreeChar(searchAddress)) {
            geocoder.geocode(searchAddress, true).then((featureCollection : any )=>{
                if (isValidPolygon(featureCollection)) {
                    onResult(featureCollection.features[0])
                } else {
                    onResultNotFound(searchAddress)
                }
            })
        }
    }

    const onEnterKeyboardButtonSearchClick = (e : any) : void => {
        if(e.key === 'Enter')
            onSearchButtonClick()
    }

    const flexFlow = searchButtonNextLine ? "wrap" : "nowrap"

    return (
        <div className="" style={{ marginLeft: 20, marginBottom: 0, marginTop: 10, display: "flex", flexFlow: flexFlow, flexDirection: "row" }}>
            <Input
                icon="search"
                className="geo-search-item"
                placeholder={searchBarPlaceholder}
                onChange={handleInput}
                onKeyPress={onEnterKeyboardButtonSearchClick}
            ></Input>
            <Button onClick={onSearchButtonClick}>Search</Button>
        </div>
    );
}