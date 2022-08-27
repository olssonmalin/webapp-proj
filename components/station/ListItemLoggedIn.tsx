import { TouchableHighlight, Text, View } from "react-native";
import { Base, Typography } from "../../styles";
import SwipeableRow from "../user/SwipableRow";
import StationInterface from "../../interfaces/station";

interface Props {
    navigation: any,
    station: StationInterface,
    addToFavorite: Function
}

export default function ListItemLoggedIn({ navigation, station, addToFavorite }: Props) {

    return (
        <SwipeableRow action={addToFavorite} id={station} styling={Base.swipeAdd} text="Favorit">
            <TouchableHighlight
                underlayColor="#3A3A3C"
                onPress={() => {
                    navigation.navigate('Details', {
                        station: station,
                        name: station.AdvertisedLocationName,
                        isFavorite: false,
                    });
                }}

            >
                <View style={Base.pressableRow}>
                    <Text style={Typography.normal}>{station.AdvertisedLocationName}</Text>
                </View>
            </TouchableHighlight>
        </SwipeableRow>
    )
}