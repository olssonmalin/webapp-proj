import config from "../config/config.json";

const stations = {

    getStations: async function getStations() {
        const response = await fetch(`${config.base_url}stations`);
        const result = await response.json();

        // console.log(result.data);
        return result.data;
    },

    findName: function findName(trainId, stations) {
        // console.log(stations);
        const station = stations.filter((obj) => {
            return obj.LocationSignature === trainId;
        })

        return station[0].AdvertisedLocationName;
        // console.log(station[0].AdvertisedLocationName);
    }
}

export default stations;
