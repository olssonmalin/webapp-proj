import { Text, View, ScrollView, StyleSheet } from "react-native";
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import DelayToggle from "./DelayToggle";
import delayModel from "../../models/delays";
import { useEffect, useState, useRef } from "react";
import { Base, Buttons, Typography } from "../../styles";

export default function DelayMapAll({ navigation, stationInfo, delays }) {

    const mapRef = useRef(null);

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
                        latitudeDelta: 5,
                        longitudeDelta: 5,
                    }, 500)
                }}
            >
                {markers}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },

});