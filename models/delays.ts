import config from "../config/config.json";
import stationModel from "./stations";

const delays = {

    getDelays: async function getDelays() {
        const response = await fetch(`${config.base_url}delayed`);
        const result = await response.json();

        return result.data.filter(delay => delay.FromLocation !== undefined);
    },

    getDelaysStation: async function getDelaysStation(station) {
        const response = await fetch(`${config.base_url}delayed`);
        let result = await response.json();
        result = result.data.filter(delay => delay.FromLocation !== undefined);
        result = result.filter(delay => delay.FromLocation[0].LocationName === station);

        return result;
    },

    getTime: function getTime(timeString) {
        const dateObject = new Date(timeString);

        return `${(dateObject.getHours() < 10 ? '0' : '') + dateObject.getHours()}:${(dateObject.getMinutes() < 10 ? '0' : '') + dateObject.getMinutes()}`;
    },

    createNameObject: async function createNameObject() {
        const stations = await stationModel.getStations();
        let names = {};
        for (const station in stations) {
            names[stations[station].LocationSignature] = stations[station].AdvertisedLocationName;
        }

        return names;
    },

    createStationInfoObject: async function createStationInfoObject() {
        const stations = await stationModel.getStations();
        let info = {};
        for (const station in stations) {
            const lon = stations[station].Geometry.WGS84.split("(")[1].split(" ")[0];
            const lat = stations[station].Geometry.WGS84.split(")")[0].split(" ")[2];
            info[stations[station].LocationSignature] = { name: stations[station].AdvertisedLocationName, coordinates: { lat: lat, lon: lon } };
        }

        return info;
    },

    createDelayLocationObject: async function createDelayLocationObject() {
        const stations = await stationModel.getStations();
        const delays = await this.getDelays();
        const locations = [];

        for (const delay in delays) {
            if (delays[delay].FromLocation !== undefined) {
                const fromLocation = delays[delay].FromLocation[0].LocationName;
                const currentStation = stations.filter(station => station.LocationSignature === fromLocation);
                const lon = currentStation[0].Geometry.WGS84.split("(")[1].split(" ")[0];
                const lat = currentStation[0].Geometry.WGS84.split(")")[0].split(" ")[2];
                locations.push({ "signature": fromLocation, "lat": parseFloat(lat), "lon": parseFloat(lon), "data": delays[delay] });
            }
        }

        return locations;
    }
}

export default delays;