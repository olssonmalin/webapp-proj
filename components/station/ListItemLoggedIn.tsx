import { TouchableHighlight, Text, View } from "react-native";
import { Base, Typography } from "../../styles";
import SwipeableRow from "../user/SwipableRow";

export default function ListItemLoggedIn({ navigation, station, addToFavorite }) {

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