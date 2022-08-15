import Auth from "../auth/Auth";
import FavoritesList from "./FavoritesList";
import { Button, View, Pressable, Text } from "react-native";
import { Typography, Base, Buttons } from "../../styles";
import authModel from "../../models/auth";
import userModel from "../../models/user";


export default function UserPage({ navigation, favorites, setFavorites, setStations, isLoggedIn, setIsLoggedIn }) {
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