import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { DonateCardList } from '../../components/DonateCardList/DonateCardList';
import { GoBackHeader } from '../../components/GoBackHeader/GoBackHeader';
import { Item } from '../../models/Item';
import { FirebaseContext } from '../../services/context/FirebaseContext';
import { UserContext } from '../../services/context/UserContext';

import { styles } from './styles'

export const MyDonationsScreen: React.FC = ({ navigation }) => {
  let { user } = useContext(UserContext);
  let { doAquiFirebase } = useContext(FirebaseContext);
  let [items, setItems] = useState<Item[]>([]);

  const fetchUserDonations = async () => {
    let items = await doAquiFirebase.getItemsWhere("userEmail", "==", user.account.email);
    setItems(items);
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchUserDonations();
    }, []));

  return (
    <View style={styles.container}>
      <GoBackHeader navigation={navigation} />
      <DonateCardList itemData={items} fetchItems={fetchUserDonations} />
    </View>
  )
}