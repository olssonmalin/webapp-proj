import { Text, View, Modal, Pressable } from "react-native";
import { useState } from "react";

import { Base, Typography, Buttons } from "../../styles";
import MessageInterface from "../../interfaces/message";

export default function MessageModal({ message }: { message: MessageInterface }) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View
            style={Base.centeredView}
        >
            <Pressable
                style={Buttons.modalOpenDark}
                onPress={() => setModalVisible(true)}
            >
                <Text style={Typography.label}>{message.Header}</Text>
            </Pressable>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
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
        </View>
    )
}