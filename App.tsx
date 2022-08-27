import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import FlashMessage from "react-native-flash-message";

import { Base } from './styles';

import Station from './components/station/Station';
import Delay from './components/delay/Delay';
import User from './components/user/User';

import authModel from './models/auth';

import DelayInterface from './interfaces/delay';
import StationInfo from './interfaces/stationInfo';
import StationInterface from './interfaces/station';
import MessageInterface from './interfaces/message';
import FavoriteInterface from './interfaces/favorite';


const Tab = createBottomTabNavigator();
const routeIcons = {
  "Förseningar": "alert-triangle",
  "Stationer": "home",
  "Min Sida": "user",
};

export default function App() {
  const [stations, setStations] = useState<Partial<StationInterface>[]>([]);
  const [delays, setDelays] = useState<Partial<DelayInterface>[]>([]);
  const [messages, setMessages] = useState<Partial<MessageInterface>[]>([]);
  const [stationInfo, setStationInfo] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [favorites, setFavorites] = useState<FavoriteInterface[]>([]);
  const [appIsReady, setAppIsReady] = useState<Boolean>(false);


  useEffect(() => {
    async function loggedIn() {
      setIsLoggedIn(await authModel.loggedIn());
      setAppIsReady(true);
    }

    loggedIn();
  }, []);

  if (!appIsReady) {
    return (
      <SafeAreaView style={Base.body}>

        <View style={Base.baseCenter}>
          <ActivityIndicator size="large" color="rgb(0,173,32)" />
        </View>
        <StatusBar style='light' />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={Base.body}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = routeIcons[route.name] || "alert-triangle";

            return <Feather name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#8c8c8c',
          headerShown: false,
          tabBarStyle: Base.tabBar,
        })}
        >
          <Tab.Screen name='Stationer'>
            {() =>
              <Station stations={stations}
                setStations={setStations}
                messages={messages}
                setMessages={setMessages}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                favorites={favorites}
                setFavorites={setFavorites}
                stationInfo={stationInfo}
                setStationInfo={setStationInfo}
              />
            }
          </Tab.Screen>
          <Tab.Screen name='Förseningar'>
            {() =>
              <Delay
                delays={delays}
                setDelays={setDelays}
                stationInfo={stationInfo}
                setStationInfo={setStationInfo}
              />
            }
          </Tab.Screen>
          <Tab.Screen name='Min Sida'>
            {(screenProps) =>
              <User
                {...screenProps}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                favorites={favorites}
                setFavorites={setFavorites}
                stations={stations}
                setStations={setStations}
                messages={messages}
                setMessages={setMessages}
                stationInfo={stationInfo}
                setStationInfo={setStationInfo}
              />
            }
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style='light' />
      <FlashMessage position="top" />
    </SafeAreaView>
  );
}
