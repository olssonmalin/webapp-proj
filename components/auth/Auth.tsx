import { View } from "react-native";
import { Base } from "../../styles";
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


