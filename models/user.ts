import storage from "./storage"
import config from "../config/config.json";
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
            // const data = result.data.map(obj => JSON.parse(obj.artefact))
            return result.data;
        } catch (e) {
            // error reading value
        }
    },

    addData: async (artefact) => {
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

    removeData: async (id) => {
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

    filterFavorites: function (stations, favorites) {
        return stations.filter(object1 => {
            return !favorites.some(object2 => {
                return object1.LocationSignature === object2.LocationSignature;
            });
        });
    }
}

export default user;
