import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { UserContext } from '../../services/context/UserContext';
import { Tag } from '../DonateCard/Tag';

import { styles } from './styles'

export const DonationInfo: React.FC = ({ item }) => {
  let { user } = useContext(UserContext);


  return (
    <View style={styles.row}>
      <View style={styles.textInfoView}>
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.text}>{item.description}</Text>
        <Text style={styles.text}>{item.calcDistance(user.longitude, user.latitude).toFixed(2)} km</Text>
      </View>
      <View style={styles.tagsView}>
        <Text style={{ ...styles.text, textAlign: 'center' }}>Tags</Text>
        <View style={{ width: "50%" }}>
          {item.tags.map((tag: string, idx: number) => <Tag value={tag} key={idx} />)}
        </View>
      </View>
    </View>
  )
}