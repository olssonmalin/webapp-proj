import { View, Text, Pressable, Button, Animated, TouchableHighlight, FlatList } from "react-native";
import { Typography, Base, Buttons } from "../../styles";

import { Ionicons } from '@expo/vector-icons';

import SwipeableRow from "./SwipableRow";
import FavoriteInterface from "../../interfaces/favorite";

interface Props {
    navigation: any,
    data: FavoriteInterface,
    removeFavorite: Function
}

export default function ListItemFavorite({ navigation, data, removeFavorite }: Props) {

    // const station = JSON.parse(data.artefact);
    const station = data.artefact;

    return (
        <SwipeableRow action={removeFavorite} id={data.id} styling={Base.swipeRemove} text="Ta bort">
            <TouchableHighlight
                underlayColor="#3A3A3C"
                onPress={() => {
                    navigation.navigate('Details', {
                        station: station,
                        name: station.AdvertisedLocationName,
                        isFavorite: true,
                        id: data.id,
                    });
                }}
            >
                <View style={Base.pressableRow}>
                    <Pressable
                        onPress={async () => {
                            await removeFavorite(data.id);
                        }}
                    >
                        <Ionicons style={Typography.icon} name="ios-star" size={19} color="#fff" />
                    </Pressable>
                    <Text style={Typography.normal}>{station.AdvertisedLocationName}</Text>
                </View>
            </TouchableHighlight>
        </SwipeableRow>
    )

};