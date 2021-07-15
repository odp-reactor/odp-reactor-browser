type GeoJSON = {
    type: string
}

type GeoJSONGeometry = {
    type: string
    coordinates : [][]
}

type GeoJSONFeature = {
    type: string
    geometry: GeoJSONGeometry
}

type GeoJSONFeatureCollection = {
    type: string
    features : GeoJSONFeature[]
}