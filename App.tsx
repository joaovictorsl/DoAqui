import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, Text, View, StatusBar } from 'react-native';
import { useFonts, RockSalt_400Regular } from '@expo-google-fonts/rock-salt';

import { NavigationContainer } from '@react-navigation/native';
import { BottomTabNavigator } from './src/routes/BottomTabNavigator';

import { UserProvider } from './src/services/context/UserContext';
import { FirebaseProvider } from './src/services/context/FirebaseContext';
import { SetUp } from './src/components/SetUp/SetUp';
import { createStackNavigator } from '@react-navigation/stack';
import { MyDonationsScreen } from './src/screens/MyDonations/MyDonations';
import { DonationPage } from './src/screens/DonationPage/DonationPage';

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({ RockSalt_400Regular });

  if (fontsLoaded) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <UserProvider>
            <FirebaseProvider>
              <SetUp>
                <Stack.Navigator initialRouteName='homeAndDonate' screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="myDonations" component={MyDonationsScreen} />
                  <Stack.Screen name="homeAndDonate" component={BottomTabNavigator} />
                  <Stack.Screen name="donationPage" component={DonationPage} />
                </Stack.Navigator>
              </SetUp>
            </FirebaseProvider>
          </UserProvider>
        </NavigationContainer >
      </SafeAreaView>
    );
  }

  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );


}
