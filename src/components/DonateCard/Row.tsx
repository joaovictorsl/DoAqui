import React, { ReactElement } from 'react';
import { View } from 'react-native';

import { styles } from './styles'

interface Props {
  children: ReactElement[]
}

export const Row: React.FC<Props> = ({ children }) => {
  return (
    <View style={styles.row}>
      {children}
    </View>
  )
}