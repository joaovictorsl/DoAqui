import React, { ReactElement, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ExpoLocation from 'expo-location';
import { UserContext } from '../../services/context/UserContext';

interface Props {
  children: ReactElement,
}

export const SetUp: React.FC<Props> = ({ children }: Props) => {
  const { user, setUser, setLoaded } = useContext(UserContext);

  React.useEffect(() => {
    (async () => {
      let location;
      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        location = await ExpoLocation.getCurrentPositionAsync({});
        location = { latitude: location.coords.latitude, longitude: location.coords.longitude };
      }

      let storedUser = await AsyncStorage.getItem("@doaquiUser");
      if (storedUser != null) {
        storedUser = JSON.parse(storedUser);
      }
      setUser({ ...location, account: storedUser });
      setLoaded(true);
    })();
  }, []);

  return children;
}