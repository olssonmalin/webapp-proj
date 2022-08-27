import { ScrollView } from "react-native";
import MessageModal from "./MessageModal";

import { Base } from "../../styles";
import MessageInterface from "../../interfaces/message";

export default function MessageList({ messages }: { messages: MessageInterface[] }) {

    const listOfMessages = messages.map((message, index) => {

        return (
            <MessageModal key={index} message={message} />
        )
    })

    return (
        <ScrollView style={Base.base}>
            {listOfMessages}
        </ScrollView>
    )
}