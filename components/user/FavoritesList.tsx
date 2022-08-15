import { View, Text, Pressable, Button, Animated, TouchableHighlight, FlatList } from "react-native";
import { Typography, Base, Buttons } from "../../styles";
import userModel from "../../models/user";
import stationModel from "../../models/stations";
import { useEffect } from "react";
import ListItemFavorite from "./ListItemFavorite";


export default function FavoritesList({ navigation, favorites, setFavorites, setStations }) {

    async function fetchData() {

        const responseFavorites = await userModel.getData();
        setFavorites(responseFavorites);
        const responseStations = await stationModel.getStations();

        const favoriteStations = responseFavorites.map(data => JSON.parse(data.artefact));
        const diff = userModel.filterFavorites(responseStations, favoriteStations);
        setStations(diff);
    }

    async function removeFavorite(id) {
        await userModel.removeData(id);
        fetchData();
    }

    useEffect(() => {
        fetchData();
    }, []);


    const renderItem = ({ item }) => (
        <ListItemFavorite data={item} navigation={navigation} removeFavorite={removeFavorite} />
    );

    const header = () => {
        return (
            <View style={Base.base}>
                <Text style={Typography.header3}>Favoriter</Text>
                <Text style={Typography.header4}>Svep åt vänster för att ta bort en favorit</Text>
            </View>
        )
    }


    return (
        <View style={Base.base}>
            <FlatList
                data={favorites}
                renderItem={renderItem}
                ListHeaderComponent={header}
            />
        </View>
    )
};