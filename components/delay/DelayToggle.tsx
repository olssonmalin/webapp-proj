import { View, Text } from "react-native";
import { Base, Typography } from "../../styles";
import Toggle from "react-native-toggle-element";

interface Props {
    showMap: boolean,
    setShowMap: Function
}

export default function DelayToggle({ showMap, setShowMap }: Props) {

    return (
        <View style={Base.toggleView}>
            <Toggle
                value={showMap}
                onPress={(newState) => setShowMap(newState)}
                leftComponent={
                    <Text style={Typography.toggle}>Lista</Text>}
                rightComponent={
                    <Text style={Typography.toggle}>Karta</Text>
                }
                trackBar={{
                    width: 200,
                    height: 30,
                    radius: 7,
                    activeBackgroundColor: "#1C1C1F",
                    inActiveBackgroundColor: "#1C1C1F",
                }}
                thumbButton={{
                    width: 100,
                    height: 30,
                    radius: 7,
                    activeBackgroundColor: "#5A5A5F",
                    inActiveBackgroundColor: "#5A5A5F",
                    activeColor: '#fff',
                    inActiveColor: '#fff',
                }}
            />
        </View>
    )
}