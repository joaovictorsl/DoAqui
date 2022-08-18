import React from 'react';
import { useContext } from 'react';
import { View, Text } from 'react-native';
import { UserContext } from '../../services/context/UserContext';
import { GoBackIcon } from '../GoBackIcon/GoBackIcon';

import { styles } from './styles'

export const GoBackHeader: React.FC = ({ navigation }) => {

  let { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
      {user.account?.uid ? <GoBackIcon navigation={navigation} /> : null}
      <Text
        style={styles.title}
      >DoAqui</Text>
    </View>
  )
}