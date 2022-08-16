import { useState } from "react";
import { Modal, Text, Pressable, View } from "react-native";
import AuthForm from "./AuthForm";
import { Base, Buttons, Typography } from "../../styles";
import authModel from "../../models/auth";
import { showMessage } from "react-native-flash-message";
import Auth from "../../interfaces/auth";

export default function Register() {
    const [modalVisible, setModalVisible] = useState(false);
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doRegister() {
        if (auth.email && auth.password) {
            const result = await authModel.register(auth.email, auth.password);
            if (result.data.message === "User successfully registered.") {
                showMessage({
                    message: "Registrering lyckades!",
                    description: "Du kan nu logga in.",
                    type: "success"
                });
            }
            setModalVisible(!modalVisible);
        }
    }

    return (
        <View style={Base.centeredViewContainer}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={Base.centeredView}>
                    <View style={Base.authModal}>
                        <Pressable
                            style={Buttons.modalClose}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={Typography.normal}>Avbryt</Text>
                        </Pressable>
                        <AuthForm title="Registrera" auth={auth} setAuth={setAuth} submit={doRegister} />
                    </View>
                </View>
            </Modal>
            <Pressable
                style={Buttons.modalOpenDark}
                onPress={() => setModalVisible(true)}
            >
                <Text style={Typography.button}>Registrera</Text>
            </Pressable>
        </View>
    );
};
