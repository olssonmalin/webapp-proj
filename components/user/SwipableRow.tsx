import { View, Text, Pressable, Button, Animated } from "react-native";
import { Typography, Base } from "../../styles";
import userModel from "../../models/user";
import stationModel from "../../models/stations";
import { DataTable } from 'react-native-paper';
import { useEffect, useRef } from "react";
import { Ionicons } from '@expo/vector-icons';

import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import StationInterface from "../../interfaces/station";

interface Props {
    action: Function,
    id: number | StationInterface,
    styling: {},
    text: string,
    children: any,
}

export default function SwipeableRow({ action, id, styling, text, children }: Props) {

    const swipeableRef = useRef(null);

    const renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            // inputRange: [0, 50, 100, 101],
            // outputRange: [-5, 0, 0, 1],
            inputRange: [-100, 0],
            outputRange: [0.7, 0]
        });
        return (
            <Animated.View style={[styling,
                {
                    transform: [{ translateX: trans }],
                },
            ]}>
                <RectButton onPress={() => { action(id); swipeableRef.current.close(); }} >
                    <Animated.Text
                        style={[
                            Typography.swipeRemove,
                            {
                                transform: [{ translateX: trans }],
                            },
                        ]}>
                        {text}
                    </Animated.Text>
                </RectButton>
            </Animated.View>
        );
    };

    return (
        <View style={Base.base}>
            <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
                {children}
            </Swipeable>
        </View>
    )
};