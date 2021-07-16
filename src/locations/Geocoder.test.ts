import {Geocoder} from "./Geocoder"

const geocoder = new Geocoder()

describe('Geocoder geocodes and reverse geocodes. [!] Warning: if the test fails check if public API service is reachable', () => {
    test("it should return Piemonte coordinates polygon", async ()=>{
        const piemonte = await geocoder.geocode("piemonte", true)
        expect(piemonte).toBeDefined()
        expect(piemonte.type).toBe('FeatureCollection')
    })
})

