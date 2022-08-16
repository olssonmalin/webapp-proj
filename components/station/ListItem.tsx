
import { Text, TouchableHighlight } from "react-native";
import { Base, Typography } from "../../styles";


export default function ListItem({ navigation, station }) {

    return (
        <TouchableHighlight
            underlayColor="#3A3A3C"
            onPress={() => {
                navigation.navigate('Details', {
                    station: station,
                    name: station.AdvertisedLocationName
                });
            }}
            style={Base.pressableRow}
        >
            <Text style={Typography.normal}>{station.AdvertisedLocationName}</Text>
        </TouchableHighlight>
    )
}