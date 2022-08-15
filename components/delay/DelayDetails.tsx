import { Text, View, ScrollView } from "react-native";
import delayModel from "../../models/delays";
import DelayMap from "./DelayMap";
import { Base, Typography } from "../../styles";

export default function DelayDetails({ route, navigation, stationInfo }) {

    const { delay } = route.params;

    function getTimeDiffMeters(plannedTime, newTime) {
        const plannedTimeObject = new Date(plannedTime);
        const newTimeObject = new Date(newTime);
        let diffMs = (newTimeObject.getTime() - plannedTimeObject.getTime());
        // ((seconds) minutes) - marginal
        const diffMinutes = ((diffMs / 1000) / 60) - 5;
        // 100m/min 
        const meters = (diffMinutes * 100) / 2
        return meters > 0 ? meters : 0;
    }

    const radiusMeter = getTimeDiffMeters(delay.AdvertisedTimeAtLocation, delay.EstimatedTimeAtLocation);

    return (
        <View style={Base.base}>
            <View>
                <Text style={Typography.normal}>Tåg: {delay.AdvertisedTrainIdent}</Text>
                <Text style={Typography.normal}>Från: {stationInfo[delay.FromLocation[0].LocationName].name} </Text>
                <Text style={Typography.normal}>Mot: {stationInfo[delay.ToLocation[0].LocationName].name} </Text>
                <Text style={Typography.normal}>Planerad avgångstid: {delayModel.getTime(delay.AdvertisedTimeAtLocation)}</Text>
            </View>
            {delay.Canceled ?
                <Text style={Typography.normal}>Inställd</Text>
                :
                <Text style={Typography.normal}>Ny Avgångstid: {delayModel.getTime(delay.EstimatedTimeAtLocation)}</Text>
            }

            {!delay.Canceled &&
                <View style={Base.base}>
                    {radiusMeter > 0 &&
                        <Text style={Typography.normal}>Du hinner gå till slutet av den gröna cirkeln och hinna tillbaka till tåget (5min marginal)</Text>
                    }
                    <DelayMap stationInfo={stationInfo[delay.FromLocation[0].LocationName]} radiusMeter={radiusMeter} />
                </View>
            }

        </View>
    )
}