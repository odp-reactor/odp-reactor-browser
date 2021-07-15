import { HttpRestClient } from "../base/http/HttpRestClient";

export class Geocoder {

    constructor(private httpClient: HttpRestClient = new HttpRestClient()) {
    }

    async geocode(address: string, toPolygon : boolean=false) : Promise<GeoJSONFeatureCollection> {
        const res = await this.httpClient.get(`https://nominatim.openstreetmap.org/search?q=${address}&format=geojson${toPolygon && "&polygon_geojson=1"}`)
        return res.data ? res.data : undefined
    }
}