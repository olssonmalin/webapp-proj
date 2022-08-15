import delayModel from "./delays";
import stationModel from "./stations";

const search = {

    searchNumber: function searchNumber(number, delays) {
        const result = delays.filter(delay => delay.AdvertisedTrainIdent.includes(number));
        return result;
    },

    searchStation: async function searchStation(searchStr, delays) {

        const stations = await stationModel.getStations();
        const result = delays.filter(delay =>
            stationModel.findName(delay.ToLocation[0].LocationName, stations)
                .toLowerCase()
                .includes(searchStr));

        return result;
    },

    getSearchResult: async function getSearchResult(searchString) {
        let result;
        let delays = await delayModel.getDelays();
        delays = delays.filter(delay => delay.FromLocation !== undefined);

        if (isNaN(searchString)) {
            result = this.searchStation(searchString.toLowerCase(), delays);
        } else {
            // searchString = parseInt(searchString);
            result = this.searchNumber(searchString, delays);
        }

        return result;
    },

    getSearchResultStation: async function getSearchResultStations(searchString) {
        const stations = await stationModel.getStations();
        const result = stations.filter(station => station.AdvertisedLocationName
            .toLowerCase()
            .includes(searchString.toLowerCase()));

        return result;
    }
}

export default search;