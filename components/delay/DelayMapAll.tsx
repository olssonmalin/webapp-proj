import { Text, View, StyleSheet } from "react-native";
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import delayModel from "../../models/delays";
import { useRef, useState, useEffect } from "react";
import { Base, Buttons, Typography } from "../../styles";
import StationInfo from "../../interfaces/stationInfo";
import DelayInterface from "../../interfaces/delay";

interface Props {
    navigation: any,
    stationInfo: {
        [key: string]: StationInfo
    },
    delays: DelayInterface[]
}

export default function DelayMapAll({ navigation, stationInfo, delays }: Props) {

    const mapRef = useRef(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                image={require('../../img/marker/user-location.png')}
            >

                <Callout
                    tooltip={true}
                >
                    <View style={Buttons.calloutContainer}>
                        <View style={Buttons.calloutView}>
                            <Text style={[Typography.normal, Typography.calloutStation]}>Min Plats</Text>
                        </View>
                        <View style={Buttons.calloutTriangle} />
                    </View>
                </Callout>
            </Marker>
            );
        })();
    }, []);

    const markers = delays.map((delay, index) => {
        const signature = delay.FromLocation[0].LocationName;
        return (<Marker
            key={index}
            coordinate={{ latitude: parseFloat(stationInfo[signature].coordinates.lat), longitude: parseFloat(stationInfo[signature].coordinates.lon) }}
            title={stationInfo[signature].name}
            image={delay.Canceled ? require('../../img/marker/marker-cancelled.png') : require('../../img/marker/marker.png')}

        >
            <Callout
                onPress={() => {
                    navigation.navigate('Försening', {
                        delay: delay,
                        name: `Tåg ${delay.AdvertisedTrainIdent}`
                    });
                }}
                tooltip={true}
            >
                <View style={Buttons.calloutContainer}>
                    <View style={Buttons.calloutView}>
                        <View style={delay.Canceled ? Buttons.calloutTimeCancelled : Buttons.calloutTimeView}>
                            <Text style={[Typography.label, Typography.calloutTimeOld]}>{delayModel.getTime(delay.AdvertisedTimeAtLocation)}</Text>
                            {delay.Canceled ?
                                <Text style={Typography.label}>Inställd</Text> :
                                <Text style={Typography.label}>{delayModel.getTime(delay.EstimatedTimeAtLocation)}</Text>
                            }
                        </View>
                        <Text style={[Typography.label, Typography.calloutStation]}>{stationInfo[signature].name}</Text>

                    </View>
                    <View style={Buttons.calloutTriangle} />
                </View>
            </Callout>

        </Marker >

        )
    });

    return (
        <View style={Base.container}>
            <MapView
                ref={mapRef}
                userInterfaceStyle={'dark'}
                style={styles.map}
                initialRegion={{
                    latitude: 62.271175625265386,
                    longitude: 15.190335916841416,
                    latitudeDelta: 15,
                    longitudeDelta: 15,
                }}
                onMarkerSelect={e => {
                    mapRef.current.animateToRegion({
                        latitude: e.nativeEvent.coordinate.latitude,
                        longitude: e.nativeEvent.coordinate.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }, 500)
                }}
            >
                {markers}
                {locationMarker}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },

});