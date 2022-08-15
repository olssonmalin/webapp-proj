// import { useEffect, useState } from "react";
// import { View, Text } from "react-native";
// import MessageList from "./MessageList";
// import MessageBar from "./MessageBar";


// import { createNativeStackNavigator } from '@react-navigation/native-stack';


// const Stack = createNativeStackNavigator();


// export default function Message(props) {

//     return (
//         <Stack.Navigator initialRouteName="MessageBar" >
//             <Stack.Screen name="MessageBar" >
//                 {(screenProps) => <MessageBar {...screenProps} messages={props.messages} />}
//             </Stack.Screen>
//             <Stack.Screen name="Messages">
//                 {(screenProps) => <MessageList {...screenProps} messages={props.messages} />}
//             </Stack.Screen>
//         </Stack.Navigator>
//     )
// }