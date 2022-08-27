import config from "../config/config.json";
import StationInterface from "../interfaces/station";

const stations = {

    getStations: async function getStations(): Promise<StationInterface[]> {
        const response = await fetch(`${config.base_url}stations`);
        const result = await response.json();

        return result.data;
    },

    findName: function findName(trainId: string, stations: StationInterface[]) {
        const station = stations.filter((obj) => {
            return obj.LocationSignature === trainId;
        })

        return station[0].AdvertisedLocationName;
    }
}

export default stations;
