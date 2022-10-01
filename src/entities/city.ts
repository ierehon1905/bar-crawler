export type CityType = {
    name: string,
    bbox: {
        topLeftlatitude: number,
        topLeftlongitude: number,
        botRightlatitude: number,
        botRightlongitude: number,
    },
}