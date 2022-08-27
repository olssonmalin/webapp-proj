import { useState } from "react";
import { Modal, Text, Pressable, View, Alert } from "react-native";
import AuthForm from "./AuthForm";
import Auth from "../../interfaces/auth";
import AuthModel from "../../models/auth";

import { Base, Typography, Buttons } from "../../styles";

interface Props {
    setIsLoggedIn: Function,
    buttonStyle: {}
}

export default function Login({ setIsLoggedIn, buttonStyle }: Props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [auth, setAuth] = useState<Partial<Auth>>({});

    const createTwoButtonAlert = () =>
        Alert.alert(
            "Misslyckades",
            "Inloggningen misslyckades",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );

    async function doLogin() {
        if (auth.email && auth.password) {
            const result = await AuthModel.login(auth.email, auth.password);
            if (result === "success") {
                setIsLoggedIn(true);
            } else {
                createTwoButtonAlert();
            }
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
                        <AuthForm
                            title="Logga in"
                            auth={auth}
                            setAuth={setAuth}
                            submit={doLogin}
                        />
                    </View>
                </View>
            </Modal>
            <Pressable
                style={buttonStyle}
                onPress={() => setModalVisible(true)}
            >
                <Text style={Typography.button}>Logga in</Text>
            </Pressable>
        </View>
    );
};
