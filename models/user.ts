import storage from "./storage"
import config from "../config/config.json";
import StationInterface from "../interfaces/station";
const user = {
    getData: async () => {
        try {
            const token = await storage.readToken();
            const response = await fetch(`${config.auth_url}data?api_key=${config.api_key}`, {
                method: "GET",
                headers: {
                    'x-access-token': token.token
                },
            });

            const result = await response.json();
            let data = [];
            for (const station of result.data) {
                data.push(
                    {
                        id: station.id,
                        email: station.email,
                        artefact: JSON.parse(station.artefact)
                    }
                )
            }
            return data;
        } catch (e) {
            // error reading value
        }
    },

    addData: async (artefact: StationInterface) => {
        try {
            const token = await storage.readToken();
            const data = {
                api_key: config.api_key,
                artefact: JSON.stringify(artefact)
            }
            const response = await fetch(`${config.auth_url}data?api_key=${config.api_key}`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'x-access-token': token.token,
                    'content-type': 'application/json'
                },
            });

            const result = await response.json();
        } catch (e) {
            // error reading value
        }
    },

    removeData: async (id: number) => {
        try {
            const token = await storage.readToken();
            const data = {
                api_key: config.api_key,
                id: id
            }
            const response = await fetch(`${config.auth_url}data?api_key=${config.api_key}`, {
                method: "DELETE",
                body: JSON.stringify(data),
                headers: {
                    'x-access-token': token.token,
                    'content-type': 'application/json'
                },
            });

        } catch (e) {
            // error reading value
            console.log(e);
        }
    },

    filterFavorites: function (stations: StationInterface[], favorites: StationInterface[]) {
        return stations.filter(object1 => {
            return !favorites.some(object2 => {
                return object1.LocationSignature === object2.LocationSignature;
            });
        });
    }
}

export default user;
