import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useContext } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { Item } from '../../models/Item';
import { UserContext } from '../../services/context/UserContext';
import { ItemInfo } from './ItemInfo';

import { styles } from './styles'

interface Props {
  item: Item,
}

export const DonateCard: React.FC<Props> = ({ item }) => {
  let { user } = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.cardBody} onPress={() => navigation.navigate("donationPage", { item })}>
      <Image
        style={{ width: "100%", height: 230, borderRadius: 10 }}
        source={{ uri: item.imageUrl }}
      ></Image>
      <ItemInfo title={item.title} description={item.description} distance={item.calcDistance(user.longitude as number, user.latitude as number).toFixed(2)} tags={item.tags} />
    </TouchableOpacity>
  )
}
