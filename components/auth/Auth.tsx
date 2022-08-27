import { View } from "react-native";
import { Base } from "../../styles";
import Login from "./Login";
import Register from "./Register";

interface Props {
    title: string,
    setIsLoggedIn: Function,
    buttonStyle: {}
}

export default function Auth({ title, setIsLoggedIn, buttonStyle }: Props) {
    return (
        <View style={Base.authContainer}>
            <Login setIsLoggedIn={setIsLoggedIn} buttonStyle={buttonStyle} />
            {title === "Min Sida" &&
                <Register />
            }
        </View>
    );
};


