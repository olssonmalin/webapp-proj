import { Text, View, ScrollView, StyleSheet } from "react-native";
import MapView, { Marker, Circle } from 'react-native-maps';
import delayModel from "../../models/delays";
import { Base, Typography } from "../../styles";

export default function DelayMap({ stationInfo, radiusMeter }) {


    return (
        <View style={Base.container}>
            <MapView
                userInterfaceStyle={'dark'}
                style={styles.map}
                initialRegion={{
                    latitude: parseFloat(stationInfo.coordinates.lat),
                    longitude: parseFloat(stationInfo.coordinates.lon),
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}
            >
                <Marker
                    coordinate={{ latitude: parseFloat(stationInfo.coordinates.lat), longitude: parseFloat(stationInfo.coordinates.lon) }}
                    title={stationInfo.name}
                    image={require('../../img/marker/marker.png')}
                />
                <Circle
                    center={{
                        latitude: parseFloat(stationInfo.coordinates.lat),
                        longitude: parseFloat(stationInfo.coordinates.lon)
                    }}
                    radius={radiusMeter}
                    fillColor="rgba(0,173,32,0.1)"
                    strokeColor="rgba(0,173,32,0.5)"
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },

});