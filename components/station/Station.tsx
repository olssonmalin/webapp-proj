import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StationList from "./StationList";
import StationDetails from "./StationDetails";
import DelayDetails from '../delay/DelayDetails';
import MessageList from '../message/MessageList';
import StationDetailsTitle from './StationDetailsTitle';

const Stack = createNativeStackNavigator();


export default function Station(props) {


    return (

        <Stack.Navigator initialRouteName="Tågstationer" >
            <Stack.Screen name="Tågstationer" options={{ headerShown: false }}>
                {(screenProps) => <StationList {...screenProps}
                    stations={props.stations}
                    setStations={props.setStations}
                    isLoggedIn={props.isLoggedIn}
                    setIsLoggedIn={props.setIsLoggedIn}
                    favorites={props.favorites}
                    setFavorites={props.setFavorites} />
                }
            </Stack.Screen>
            <Stack.Screen name="Details" options={({ route }) => ({
                headerTitle: (screenProps) => <StationDetailsTitle
                    {...screenProps}
                    isLoggedIn={props.isLoggedIn}
                    route={route}
                    favorites={props.favorites}
                    setFavorites={props.setFavorites}
                    setStations={props.setStations} />,
                // title: route.params.name,
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: '#000'
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
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
                    },
                })}
            >
                {(screenProps) => <DelayDetails {...screenProps} stationInfo={props.stationInfo} messages={props.messages} setMessages={props.setMessages} />}
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
                    },
                })}
            >
                {(screenProps) => <MessageList {...screenProps} messages={props.messages} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}
