import { CityType } from "../../entities/city";

export const cities: Record<string, CityType> = {
    moscow: {
        name: "moscow",
        bbox: {
            topLeftlatitude: 55.911086,
            topLeftlongitude: 37.369779,
            botRightlatitude: 55.573962,
            botRightlongitude: 37.877266,
        }
    },
    tbilisi: {
        name: "tbilisi",
        bbox: {
            topLeftlatitude: 41.841536,
            topLeftlongitude: 44.663224,
            botRightlatitude: 41.614769,
            botRightlongitude: 45.022556,
        }
    }
}