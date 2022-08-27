import config from "../config/config.json";
import DelayInterface from "../interfaces/delay";
import MessageInterface from "../interfaces/message";
import StationInterface from "../interfaces/station";

const messages = {

    getMessages: async function getMessages(): Promise<MessageInterface> {
        const response = await fetch(`${config.base_url}messages`);
        const result = await response.json();

        return result.data;
    },

    findMessagesDelay: async function findMessagesDelay(toLocation: Partial<DelayInterface>, fromLocation: Partial<DelayInterface>): Promise<Partial<MessageInterface>> {
        const allMessages = await this.getMessages();

        function includesRoute(impact) {


            if (impact.AffectedLocation !== undefined) {
                return impact.AffectedLocation.includes(fromLocation);
            } else if (impact.FromLocation !== undefined) {
                return impact.FromLocation.includes(fromLocation);
            }
            return false;
        }


        const result = allMessages.filter((message: MessageInterface) => message.TrafficImpact.filter(includesRoute).length > 0);
        return result;
    },

    findMessagesStation: async function findMessagesStation(station: string): Promise<MessageInterface[]> {
        const allMessages = await this.getMessages();

        function includesStation(impact) {

            if (impact.AffectedLocation !== undefined) {
                return impact.AffectedLocation.includes(station);
            }
            return false;
        }

        const result = allMessages.filter((message: MessageInterface) => message.TrafficImpact !== undefined && message.TrafficImpact.filter(includesStation).length > 0);
        return result;
    }
}

export default messages;
