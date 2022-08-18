import React from 'react';
import { useContext } from 'react';
import { View, Text } from 'react-native';
import { UserContext } from '../../services/context/UserContext';
import { LogOutIcon } from '../LogOut/LogOut';
import { MyDonationsIcon } from '../MyDonationsIcon/MyDonationsIcon';

import { styles } from './styles'

export const Header: React.FC = () => {

  let { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
      {user.account?.uid ? <MyDonationsIcon /> : null}
      <Text
        style={styles.title}
      >DoAqui</Text>
      {user.account?.uid ? <LogOutIcon /> : null}
    </View>
  )
}