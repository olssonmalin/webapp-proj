import { Pressable, Text, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import delayModel from "../../models/delays";
import messageModel from "../../models/messages";
import DelayList from "../delay/DelayList";
import { Base, Buttons, Typography } from "../../styles";
import { Feather } from '@expo/vector-icons';
import StationInterface from "../../interfaces/station";
import MessageInterface from "../../interfaces/message";
import StationInfo from "../../interfaces/stationInfo";
import DelayInterface from "../../interfaces/delay";

interface Props {
    route: any,
    navigation: any,
    messages: MessageInterface[],
    setMessages: Function,
    stationInfo: {
        [key: string]: StationInfo
    },
    setStationInfo: Function
}

export default function StationDetails({ route, navigation, messages, setMessages, stationInfo, setStationInfo }: Props) {

    const { station }: { station: StationInterface } = route.params;
    const [delaysStation, setDelaysStation] = useState<DelayInterface[]>([]);
    const [IsLoading, setIsLoading] = useState<Boolean>(true);


    async function fetchData() {
        const inforesponse = await delayModel.createStationInfoObject();
        setStationInfo(inforesponse);
        const response = await messageModel.findMessagesStation(station.LocationSignature);
        setMessages(response);
        const responseDelays = await delayModel.getDelaysStation(station.LocationSignature);
        setDelaysStation(responseDelays);
        setIsLoading(false);
    }


    useEffect(() => {
        fetchData();
    }, [])

    if (IsLoading) {
        return (
            <View style={Base.baseCenter}>
                <ActivityIndicator size="large" color="rgb(0,173,32)" />
            </View>
        )
    }

    return (
        <View style={Base.base}>
            <View style={Base.base}>
                {delaysStation.length > 0 ?
                    <DelayList stationInfo={stationInfo} setStationInfo={setStationInfo} delays={delaysStation} setDelays={setDelaysStation} navigation={navigation} station={station.LocationSignature} />
                    :
                    <View style={Base.baseCenter}>
                        <Text style={Typography.normal}>Inga förseningar</Text>
                    </View>
                }
                {messages.length > 0 &&
                    <Pressable style={Buttons.messages} onPress={() => { navigation.navigate("Meddelande") }}>
                        <View style={Buttons.messagesTextContainer}>
                            <Text style={Typography.message}>Meddelanden</Text>
                            <View style={Typography.messageNumberView}>
                                <Text style={Typography.messageNumber}>{messages.length}</Text>
                            </View>
                        </View>
                        <Feather style={Typography.messageIcon} name="chevron-right" size={20} color="black" />
                    </Pressable>
                }
            </View>
        </View>
    )
}