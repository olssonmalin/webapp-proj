import config from "../config/config.json";

const messages = {

    getMessages: async function getMessages() {
        const response = await fetch(`${config.base_url}messages`);
        const result = await response.json();

        // console.log(result.data);
        return result.data;
    },

    findMessagesDelay: async function findMessagesDelay(toLocation, fromLocation) {
        const allMessages = await this.getMessages();

        function includesRoute(impact) {


            if (impact.AffectedLocation !== undefined) {
                return impact.AffectedLocation.includes(fromLocation);
            } else if (impact.FromLocation !== undefined) {
                return impact.FromLocation.includes(fromLocation);
            }
            return false;
        }


        const result = allMessages.filter(message => message.TrafficImpact.filter(includesRoute).length > 0);
        return result;
    },

    findMessagesStation: async function findMessagesStation(station) {
        const allMessages = await this.getMessages();

        function includesStation(impact) {

            if (impact.AffectedLocation !== undefined) {
                return impact.AffectedLocation.includes(station);
            }
            return false;
        }

        const result = allMessages.filter(message => message.TrafficImpact !== undefined && message.TrafficImpact.filter(includesStation).length > 0);
        return result;
    }
}

export default messages;
