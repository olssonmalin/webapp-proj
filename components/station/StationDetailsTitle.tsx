import { Text, View, Pressable } from "react-native"
import { Typography, Base } from "../../styles"

import { Ionicons } from '@expo/vector-icons';
import userModel from "../../models/user";
import stationModel from "../../models/stations";
import StationInterface from "../../interfaces/station";
import FavoriteInterface from "../../interfaces/favorite";

interface Props {
    isLoggedIn: boolean,
    route: any,
    favorites: FavoriteInterface[],
    setFavorites: Function,
    setStations: Function
}

export default function StationDetailsTitle({ isLoggedIn, route, favorites, setFavorites, setStations }: Props) {

    const title = route.params.name;
    const station = route.params.station;
    function isFavorite() {
        for (const favorite of favorites) {
            const favoriteStation = favorite.artefact;
            if (favoriteStation.LocationSignature === station.LocationSignature) {
                return favorite.id;
            }
        }
        return false;
    }

    async function fetchDataLoggedIn() {
        const responseFavorites = await userModel.getData();
        setFavorites(responseFavorites);
        const responseStations = await stationModel.getStations();
        const favoriteStations = responseFavorites.map(data => data.artefact);
        const diff = userModel.filterFavorites(responseStations, favoriteStations);
        setStations(diff);
    }

    async function addToFavorite(station: StationInterface) {
        await userModel.addData(station);
        fetchDataLoggedIn();
    }

    async function removeFavorite(id: number) {
        await userModel.removeData(id);
        fetchDataLoggedIn();
    }

    return (
        <View style={Base.stationDetailsTitle}>
            <Text style={Typography.stationTitle}>{title}</Text>
            {isLoggedIn &&
                <Pressable
                    onPress={async () => {
                        const id = isFavorite();
                        {
                            id ?
                                removeFavorite(id) :
                                addToFavorite(station)
                        }
                    }}
                >
                    {isFavorite() ?
                        <Ionicons style={Typography.iconTitle} name="ios-star" size={19} color="#fff" /> :
                        <Ionicons style={Typography.iconTitle} name="ios-star-outline" size={19} color="#fff" />
                    }

                </Pressable>}
        </View >
    )
}