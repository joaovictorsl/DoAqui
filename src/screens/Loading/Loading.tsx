import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { styles } from './styles'

export const LoadingScreen: React.FC = ({ bgColor }) => {
  return (
    <View style={{ ...styles.container, backgroundColor: bgColor ? bgColor : "#151515" }}>
      <ActivityIndicator size={100} color="#F06907" />
    </View>
  )
}