import Auth from "../auth/Auth";
import FavoritesList from "./FavoritesList";
import { View, Pressable, Text } from "react-native";
import { Typography, Base, Buttons } from "../../styles";
import authModel from "../../models/auth";
import FavoriteInterface from "../../interfaces/favorite";

interface Props {
    navigation: any,
    favorites: FavoriteInterface[],
    setFavorites: Function,
    setStations: Function,
    isLoggedIn: boolean,
    setIsLoggedIn: Function
}

export default function UserPage({ navigation, favorites, setFavorites, setStations, isLoggedIn, setIsLoggedIn }: Props) {
    return (
        <View style={Base.base}>
            {isLoggedIn ?
                <View style={Base.base}>
                    <FavoritesList
                        navigation={navigation}
                        favorites={favorites}
                        setFavorites={setFavorites}
                        setStations={setStations} />
                    <Pressable
                        onPress={async () => {
                            await authModel.logout();
                            setIsLoggedIn(false);
                        }}
                        style={Buttons.modalOpenDark}
                    >
                        <Text style={Typography.button}>Logga ut</Text>
                    </Pressable>

                </View>
                :
                <Auth title="Min Sida" setIsLoggedIn={setIsLoggedIn} buttonStyle={Buttons.modalOpenGreen} />

            }
        </View>
    )
}