import config from "../config/config.json";
import DelayInterface from "../interfaces/delay";
import StationInterface from "../interfaces/station";
import StationInfo from "../interfaces/stationInfo";
import stationModel from "./stations";

const delays = {

    getDelays: async function getDelays(): Promise<Partial<StationInterface[]>> {
        const response = await fetch(`${config.base_url}delayed`);
        const result = await response.json();

        return result.data.filter((delay: Partial<DelayInterface>) => delay.FromLocation !== undefined);
    },

    getDelaysStation: async function getDelaysStation(station: string): Promise<Partial<DelayInterface>[]> {
        const response = await fetch(`${config.base_url}delayed`);
        let result = await response.json();
        result = result.data.filter((delay: DelayInterface) => delay.FromLocation !== undefined);
        result = result.filter((delay: DelayInterface) => delay.FromLocation[0].LocationName === station);

        return result;
    },

    getTime: function getTime(timeString: string): string {
        const dateObject = new Date(timeString);

        return `${(dateObject.getHours() < 10 ? '0' : '') + dateObject.getHours()}:${(dateObject.getMinutes() < 10 ? '0' : '') + dateObject.getMinutes()}`;
    },

    createStationInfoObject: async function createStationInfoObject(): Promise<StationInfo[]> {
        const stations: StationInterface[] = await stationModel.getStations();
        let info = {};
        for (const station in stations) {
            const lon = stations[station].Geometry.WGS84.split("(")[1].split(" ")[0];
            const lat = stations[station].Geometry.WGS84.split(")")[0].split(" ")[2];
            info[stations[station].LocationSignature] = { name: stations[station].AdvertisedLocationName, coordinates: { lat: lat, lon: lon } };
        }

        return info;
    },

}

export default delays;