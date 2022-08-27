interface StationInterface {
    AdvertisedLocationName: string,
    Geometry: {
        WGS84: string
    },
    LocationSignature: string,
    PlatformLine: []
}

export default StationInterface;