import Auth from "../auth/Auth";
import FavoritesList from "./FavoritesList";
import { Button, View } from "react-native";
import { Typography, Base, Buttons } from "../../styles";
import authModel from "../../models/auth";
import userModel from "../../models/user";
import StationDetails from "../station/StationDetails";
import DelayDetails from '../delay/DelayDetails';
import MessageList from '../message/MessageList';
import StationDetailsTitle from '../station/StationDetailsTitle';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserPage from "./UserPage";

const Stack = createNativeStackNavigator();


export default function User(props) {

    return (

        <Stack.Navigator initialRouteName="Profile" >
            <Stack.Screen
                name="Profile"
                options={{ headerShown: false }}>
                {(screenProps) => <UserPage {...screenProps}
                    favorites={props.favorites}
                    setFavorites={props.setFavorites}
                    setStations={props.setStations}
                    isLoggedIn={props.isLoggedIn}
                    setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Details" options={({ route }) => ({
                headerTitle: (screenProps) => <StationDetailsTitle
                    {...screenProps}
                    isLoggedIn={props.isLoggedIn}
                    route={route}
                    favorites={props.favorites}
                    setFavorites={props.setFavorites}
                    setStations={props.setStations} />,
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: '#000'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            })}>
                {(screenProps) => <StationDetails {...screenProps}
                    messages={props.messages}
                    setMessages={props.setMessages}
                    stationInfo={props.stationInfo}
                    setStationInfo={props.setStationInfo}
                />}
            </Stack.Screen><Stack.Screen
                name="Försening"
                options={({ route }) => ({
                    title: route.params.name,
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                })}
            >
                {(screenProps) => <DelayDetails {...screenProps} stationInfo={props.stationInfo} setStationInfo={props.setStationInfo} />}
            </Stack.Screen>
            <Stack.Screen
                name="Meddelande"
                options={({ route }) => ({
                    headerBackTitleVisible: false,
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    }
                })}
            >
                {(screenProps) => <MessageList {...screenProps} messages={props.messages} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}