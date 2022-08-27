import DelayInterface from "../interfaces/delay";
import StationInterface from "../interfaces/station";
import delayModel from "./delays";
import stationModel from "./stations";

const search = {

    searchNumber: function searchNumber(number: string, delays: DelayInterface[]) {
        const result = delays.filter(delay => delay.AdvertisedTrainIdent.includes(number));
        return result;
    },

    searchStation: async function searchStation(searchStr: string, delays: DelayInterface[]) {

        const stations = await stationModel.getStations();
        const result = delays.filter(delay =>
            stationModel.findName(delay.ToLocation[0].LocationName, stations)
                .toLowerCase()
                .includes(searchStr));

        return result;
    },

    getSearchResult: async function getSearchResult(searchString: any) {
        let result;
        let delays = await delayModel.getDelays();
        delays = delays.filter((delay: DelayInterface) => delay.FromLocation !== undefined);

        if (isNaN(searchString)) {
            result = this.searchStation(searchString.toLowerCase(), delays);
        } else {
            result = this.searchNumber(searchString, delays);
        }

        return result;
    },

    getSearchResultStation: async function getSearchResultStations(searchString: string) {
        const stations = await stationModel.getStations();
        const result = stations.filter((station: StationInterface) => station.AdvertisedLocationName
            .toLowerCase()
            .includes(searchString.toLowerCase()));

        return result;
    }
}

export default search;