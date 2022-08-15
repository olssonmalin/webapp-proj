import delayModel from "../../models/delays";
import { View, FlatList, TouchableOpacity } from "react-native";
import { DataTable } from 'react-native-paper';
import { useEffect, useState } from "react";
import Search from "../form/Search";
import DelayToggle from "./DelayToggle";
import { Base, Typography } from "../../styles";
import DelayMapAll from "./DelayMapAll";
import StationInfo from "../../interfaces/stationInfo";


export default function DelayList({ navigation, delays, stationInfo, setStationInfo, setDelays, station = "" }) {

    const [showMap, setShowMap] = useState(false);

    async function fetchDataAll() {
        const inforesponse = await delayModel.createStationInfoObject();
        let response = await delayModel.getDelays();
        setStationInfo(inforesponse);
        setDelays(response);
    }

    async function fetchDataStation() {
        const inforesponse = await delayModel.createStationInfoObject();
        const response = await delayModel.getDelaysStation(station);
        setStationInfo(inforesponse);
        setDelays(response);
    }

    useEffect(() => {
        if (station === "") {
            fetchDataAll();
        } else {
            fetchDataStation();
        }
    }, []);

    // const [refreshing, setRefreshing] = useState(false);

    // async function onRefresh() {
    //     setRefreshing(true);
    //     if (station === "") {
    //         await fetchDataAll();
    //     } else {
    //         await fetchDataStation();
    //     }
    //     setRefreshing(false);
    // }

    const header = () => {
        return (
            <DataTable.Header style={Base.headerDelays}>
                <DataTable.Title textStyle={Typography.delayHeader}>Tid</DataTable.Title>
                <DataTable.Title style={Base.cellTrain} textStyle={Typography.delayHeader}>Till</DataTable.Title>
                <DataTable.Title textStyle={Typography.delayHeader}>Tåg</DataTable.Title>
            </DataTable.Header>
        )
    }

    const Item = ({ delay }) => {
        const key = delays.indexOf(delay);
        const signature = delay.ToLocation[0].LocationName;
        return <TouchableOpacity
            onPress={() => {
                navigation.navigate('Försening', {
                    delay: delay,
                    name: `Tåg ${delay.AdvertisedTrainIdent}`,
                });
            }}
            key={key}
            style={Base.pressableRowDelay}

        >
            <DataTable.Row
            >

                <DataTable.Cell style={Base.cell} textStyle={Typography.delay}>{delayModel.getTime(delay.AdvertisedTimeAtLocation)}</DataTable.Cell>
                <DataTable.Cell style={[Base.cellBorder, Base.cellTrain]} textStyle={Typography.delay}>{stationInfo[signature].name}</DataTable.Cell>
                <DataTable.Cell style={Base.cellBorder} textStyle={Typography.delay}>{delay.AdvertisedTrainIdent}</DataTable.Cell>
            </DataTable.Row>
        </TouchableOpacity>
    }

    const renderItem = ({ item }) => (
        <Item delay={item} />
    );

    return (
        <View style={Base.base}>

            {station === "" ?
                <View style={Base.base}>
                    <DelayToggle showMap={showMap} setShowMap={setShowMap} />
                    {showMap ?
                        <DelayMapAll navigation={navigation} stationInfo={stationInfo} delays={delays} />
                        :
                        <View>
                            <Search title="Förseningar" setResult={setDelays} placeholder="Sök station eller tågnummer" />

                            <FlatList
                                data={delays}
                                renderItem={renderItem}
                                ListHeaderComponent={header}
                                stickyHeaderIndices={[0]}
                            />
                        </View>
                    }
                </View>
                :
                <FlatList
                    data={delays}
                    renderItem={renderItem}
                    ListHeaderComponent={header}
                    stickyHeaderIndices={[0]}
                    ListHeaderComponentStyle={Base.base}
                />
            }

        </View>
    )
}