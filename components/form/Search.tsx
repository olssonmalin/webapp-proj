import { useState } from "react";
import { View, TextInput } from "react-native";
import searchModel from "../../models/search";
import { Base, Typography } from "../../styles";
import { EvilIcons } from '@expo/vector-icons';

export default function Search({ title, setResult, placeholder }) {
    const [text, onChangeText] = useState("");


    return (
        <View style={Base.searchBar}>
            <EvilIcons name="search" size={24} color="#8b8b8f" />
            <TextInput
                onChangeText={async (text) => {
                    onChangeText(text);
                    if (title === "Stationer") {
                        setResult(await searchModel.getSearchResultStation(text));
                    } else if (title === "Förseningar") {
                        setResult(await searchModel.getSearchResult(text));
                    }
                }}
                value={text}
                placeholder={placeholder}
                placeholderTextColor='#8b8b8f'
                style={Typography.search}
            />
        </View>
    );
};

