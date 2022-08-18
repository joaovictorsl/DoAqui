import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHandHoldingHeart, faHouse } from '@fortawesome/free-solid-svg-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/Home/Home';
import { DonateScreen } from '../screens/Donate/Donate';
import { RouteProp, ParamListBase } from '@react-navigation/native';

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigator: React.FC = () => {

  const options = (focused: boolean, color: string, size: number, route: RouteProp<ParamListBase, string>): JSX.Element => {
    let icon = faHouse;

    if (route.name == "home") {
      icon = faHouse;
      color = focused ? "#F06907" : "#fff";
    } else if (route.name == "donate") {
      icon = faHandHoldingHeart;
      color = focused ? "#F06907" : "#fff";
    }

    return <FontAwesomeIcon icon={icon} color={color} size={25}></FontAwesomeIcon>
  };

  return (
    <BottomTab.Navigator
      initialRouteName='home'
      screenOptions={
        ({ route }) => (
          {
            tabBarStyle: { backgroundColor: "#151515", height: "7%" },
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused, color, size }) => options(focused, color, size, route),
          })
      }>
      <BottomTab.Screen name='home' component={HomeScreen} />
      <BottomTab.Screen name='donate' component={DonateScreen} />
    </BottomTab.Navigator >
  )
}