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
import FavoriteInterface from "../../interfaces/favorite";
import StationInterface from "../../interfaces/station";

interface Props {
    stations: StationInterface[],
    setStations: Function,
    navigation: any,
    isLoggedIn: boolean,
    setIsLoggedIn: Function,
    favorites: FavoriteInterface[],
    setFavorites: Function
}

export default function StationList({ stations, setStations, navigation, isLoggedIn, setIsLoggedIn, favorites, setFavorites }: Props) {

    async function fetchData() {
        const responseStations = await stationModel.getStations();
        setStations(responseStations);
    }

    async function fetchDataLoggedIn() {
        const responseFavorites = await userModel.getData();
        setFavorites(responseFavorites);
        const responseStations = await stationModel.getStations();
        const favoriteStations = responseFavorites.map(data => data.artefact);
        // const diff = userModel.filterFavorites(responseStations, favoriteStations);
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

    useEffect(() => {
        isLoggedIn ?
            fetchDataLoggedIn()
            :
            fetchData();
    }, []);


    const renderItemLoggedIn = ({ item }: { item: StationInterface }) => (
        <ListItemLoggedIn station={item} navigation={navigation} addToFavorite={addToFavorite} />
    );

    const renderItem = ({ item }: { item: StationInterface }) => (
        <ListItem station={item} navigation={navigation} />
    );

    const renderItemFavorite = ({ item }: { item: FavoriteInterface }) => (
        <ListItemFavorite data={item} navigation={navigation} removeFavorite={removeFavorite} />
    );

    const renderAuth = ({ item }: { item: string }) => (
        <View>
            <View style={Base.pressableRow}>
                <Text style={Typography.normal}>{item}</Text>
            </View>
            <Auth setIsLoggedIn={setIsLoggedIn} title="Stationer" buttonStyle={Buttons.modalOpenDark} />
        </View>
    );

    // const DATA = [
    //     {
    //         title: "Favoriter",
    //         renderItem: isLoggedIn ? renderItemFavorite : renderAuth,
    //         data: isLoggedIn ? favorites : ["Logga in för att lägga till favoriter"],
    //     },
    //     {
    //         title: "Stationer",
    //         renderItem: isLoggedIn ? renderItemLoggedIn : renderItem,
    //         data: stations,
    //     }
    // ]
    let DATA;
    {
        isLoggedIn ?
            DATA = [
                {
                    title: "Favoriter",
                    renderItem: renderItemFavorite,
                    data: favorites,
                },
                {
                    title: "Stationer",
                    renderItem: renderItemLoggedIn,
                    data: stations,
                }
            ] :
            DATA = [
                {
                    title: "Favoriter",
                    renderItem: renderAuth,
                    data: ["Logga in för att lägga till favoriter"],
                },
                {
                    title: "Stationer",
                    renderItem: renderItem,
                    data: stations,
                }
            ]
    }

    return (
        <View style={Base.base}>
            <Search title="Stationer" setResult={setStations} placeholder="Sök station" />

            {isLoggedIn &&
                <Text style={Typography.header4}>Svep åt vänster för att lägga till eller ta bort en favorit</Text>
            }
            <SectionList
                sections={DATA}
                // keyExtractor={(item, index) => item + index}
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