
import { View, Text, Button, ScrollView, TouchableHighlight, FlatList } from "react-native";
import { DataTable } from 'react-native-paper';
import { Base, Typography, Buttons } from "../../styles";


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