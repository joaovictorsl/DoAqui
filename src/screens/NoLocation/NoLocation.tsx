import React, { useContext, useEffect, useRef, useState } from 'react';
import { Linking, Text, TouchableOpacity, View, AppState } from 'react-native';
import { UserContext } from '../../services/context/UserContext';
import { styles } from './styles';

import * as ExpoLocation from 'expo-location';

export const NoLocationScreen: React.FC = () => {
  const appState = useRef(AppState.currentState);
  let { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", async (nextAppState) => {
      let backToForeground = appState.current.match(/inactive|background/) &&
        nextAppState === "active";

      if (backToForeground) {
        let request = await ExpoLocation.getForegroundPermissionsAsync();
        if (request.granted) {
          let location = await ExpoLocation.getCurrentPositionAsync({});
          setUser({ ...user, latitude: location.coords.latitude, longitude: location.coords.longitude });
        };
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.noLocationMsg}>Eu não consigo acessar sua localização :(</Text>
      <TouchableOpacity style={styles.btn} onPress={Linking.openSettings}>
        <Text style={styles.btnText}>Tente novamente.</Text>
      </TouchableOpacity>
    </View>
  )
}
