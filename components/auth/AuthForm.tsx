import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { Buttons, Typography, Base } from "../../styles";
import Auth from "../../interfaces/auth";

interface Props {
    title: string,
    auth: Partial<Auth>,
    setAuth: Function,
    submit: Function
}

export default function AuthForm({ title, auth, setAuth, submit }: Props) {

    const createTwoButtonAlert = (message: string, description: string) =>
        Alert.alert(
            message,
            description,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );

    function validatePassword(text: string) {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!\.-]).{4,}$/;

        if (!text.match(pattern)) {
            const message = "Icke giltigt lösenord";
            const description = "Lösenordet behöver innehålla: 4 tecken, stora och små bokstäver, minst en siffra och minst ett specialtecken (!.-)";
            createTwoButtonAlert(message, description);
        };

        return text.match(pattern);
    };

    function validateEmail(text: string) {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!text.match(pattern)) {

            const message = "Icke giltig Email-adress";
            const description = "Skriv in en giltig email";
            createTwoButtonAlert(message, description);
        }

        return text.match(pattern);
    }

    return (
        <View style={Base.logInForm}>
            <View>
                <Text style={Typography.headerForm}>{title}</Text>
                <View style={Base.inputContainer}><Text style={Typography.label}>Användarnamn</Text>
                    <TextInput
                        onChangeText={(text: string) => {
                            setAuth({ ...auth, email: text });
                        }}
                        value={auth?.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholder="Användarnamn"
                        placeholderTextColor='#8b8b8f'
                        style={Typography.input}
                    /></View>
                <View style={Base.inputContainer}>
                    <Text style={Typography.label}>Lösenord</Text>
                    <TextInput
                        onChangeText={(text: string) => {
                            setAuth({ ...auth, password: text })
                        }}
                        value={auth?.password}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        placeholder="Lösenord"
                        placeholderTextColor='#8b8b8f'
                        style={Typography.input}
                    />
                </View>
            </View>
            <Pressable
                style={Buttons.logIn}
                onPress={() => {
                    if (title === "Registrera") {
                        if (auth.password && auth.email) {
                            const passwordValid = validatePassword(auth.password);
                            const emailValid = validateEmail(auth.email);

                            if (passwordValid && emailValid) {
                                submit();
                            }
                        } else {
                            const message = "Icke ifyllt";
                            const description = "Skriv in både email och lösenord";
                            createTwoButtonAlert(message, description);
                        }
                    } else {
                        submit();
                    }
                }}
            >
                <Text style={Typography.button}>{title}</Text>
            </Pressable>
        </View>
    )
};