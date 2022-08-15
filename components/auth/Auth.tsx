import { useState } from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Base } from "../../styles";
import AuthForm from "./AuthForm";
import Login from "./Login";
import Register from "./Register";

export default function Auth({ title, setIsLoggedIn, buttonStyle }) {
    return (
        <View style={Base.authContainer}>
            <Login setIsLoggedIn={setIsLoggedIn} buttonStyle={buttonStyle} />
            {title === "Min Sida" &&
                <Register />
            }
        </View>
    );
};


