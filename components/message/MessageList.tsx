import messageModel from "../../models/messages";
import { Text, View, Modal, Pressable, Alert, StyleSheet, ScrollView } from "react-native";
import { DataTable } from 'react-native-paper';
import { useState } from "react";

import { Base, Typography, Buttons } from "../../styles";

export default function MessageList({ messages, navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false);

    const listOfMessages = messages.map((message, index) => {

        return (
            <View
                key={index}
                style={Base.centeredView}
            >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={Base.centeredView}>
                        <View style={Base.messageModal}>
                            <Text style={Typography.normal}>{message.ExternalDescription}</Text>
                            <Pressable
                                style={Buttons.modalOpenGreen}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={Typography.button}>Dölj meddelande</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Pressable
                    style={Buttons.modalOpenDark}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={Typography.label}>{message.Header}</Text>
                </Pressable>
            </View>
        )
    })

    return (
        <ScrollView style={Base.base}>
            {listOfMessages}
        </ScrollView>
    )
}