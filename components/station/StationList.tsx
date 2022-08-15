import stationModel from "../../models/stations";
import { Text, View, SectionList } from "react-native";
import { useEffect } from "react";
import Search from "../form/Search";
import Auth from "../auth/Auth";
import { Base, Typography, Buttons } from "../../styles";
import userModel from "../../models/user";
import ListItem from "./ListItem";
import ListItemLoggedIn from "./ListItemLoggedIn";
import ListItemFavorite from "../user/ListItemFavorite";


export default function StationList({ stations, setStations, navigation, isLoggedIn, setIsLoggedIn, favorites, setFavorites }) {

    async function fetchData() {
        const responseStations = await stationModel.getStations();
        setStations(responseStations);
    }

    async function fetchDataLoggedIn() {
        const responseFavorites = await userModel.getData();
        setFavorites(responseFavorites);
        const responseStations = await stationModel.getStations();
        const favoriteStations = responseFavorites.map(data => JSON.parse(data.artefact));
        const diff = userModel.filterFavorites(responseStations, favoriteStations);
        setStations(diff);
    }

    async function addToFavorite(station) {
        await userModel.addData(station);
        fetchDataLoggedIn();
    }

    async function removeFavorite(id) {
        await userModel.removeData(id);
        fetchDataLoggedIn();
    }

    useEffect(() => {
        isLoggedIn ?
            fetchDataLoggedIn()
            :
            fetchData();
    }, []);


    const renderItemLoggedIn = ({ item }) => (
        <ListItemLoggedIn station={item} navigation={navigation} addToFavorite={addToFavorite} />
    );

    const renderItem = ({ item }) => (
        <ListItem station={item} navigation={navigation} />
    );

    const renderItemFavorite = ({ item }) => (
        <ListItemFavorite data={item} navigation={navigation} removeFavorite={removeFavorite} />
    );

    const renderAuth = ({ item }) => (
        <View>
            <View style={Base.pressableRow}>
                <Text style={Typography.normal}>{item}</Text>
            </View>
            <Auth setIsLoggedIn={setIsLoggedIn} title="Stationer" buttonStyle={Buttons.modalOpenDark} />
        </View>
    );

    const DATA = [
        {
            title: "Favoriter",
            renderItem: isLoggedIn ? renderItemFavorite : renderAuth,
            data: isLoggedIn ? favorites : ["Logga in för att lägga till favoriter"],
        },
        {
            title: "Stationer",
            renderItem: isLoggedIn ? renderItemLoggedIn : renderItem,
            data: stations,
        }
    ]

    return (
        <View style={Base.base}>
            <Search title="Stationer" setResult={setStations} placeholder="Sök station" />

            {isLoggedIn &&
                <Text style={Typography.header4}>Svep åt vänster för att lägga till eller ta bort en favorit</Text>
            }
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ section: { renderItem } }) => <View>{renderItem}</View>}
                renderSectionHeader={({ section }) => (
                    <View style={Base.base}>
                        <Text style={Typography.header3}>{section.title}</Text>
                    </View>
                )}
            />
        </View>
    )
}