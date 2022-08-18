import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles'

interface Props {
  value: string,
}

export const Tag: React.FC<Props> = ({ value }) => {
  return (
    <View style={styles.tagView}>
      <Text style={styles.tag}>{value}</Text>
    </View>
  )
}