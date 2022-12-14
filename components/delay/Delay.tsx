import DelayList from "./DelayList";
import DelayDetails from "./DelayDetails";

import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();


export default function Delay(props) {

    return (

        <Stack.Navigator initialRouteName="Alla förseningar" >
            <Stack.Screen
                name="Alla förseningar"
                options={({ route }) => ({
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                })}
            >

                {(screenProps) => <DelayList {...screenProps} delays={props.delays} setDelays={props.setDelays} stationInfo={props.stationInfo} setStationInfo={props.setStationInfo} />}
            </Stack.Screen>
            <Stack.Screen
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
                {(screenProps) => <DelayDetails {...screenProps} stationInfo={props.stationInfo} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}