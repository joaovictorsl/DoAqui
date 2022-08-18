import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { Item } from '../../models/Item';
import { LoadingScreen } from '../../screens/Loading/Loading';
import { DonateCard } from '../DonateCard/DonateCard';

import { styles } from './styles'

interface Props {
  fetchItems: () => Promise<void>;
  itemData: Item[];
}

export const DonateCardList: React.FC<Props> = ({ fetchItems, itemData }) => {

  let [loadingItems, setLoadingItems] = React.useState<boolean>(false);

  const loadItems = async () => {
    setLoadingItems(true);
    await fetchItems();
    setLoadingItems(false);
  }

  useFocusEffect(
    React.useCallback(() => {
      loadItems();
    }, [])
  );

  if (loadingItems) {
    return <LoadingScreen />
  }

  if (itemData.length == 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 24, color: '#F06907' }}>Nenhuma doação por enquanto :(</Text>
      </View>
    )
  }

  return (
    <FlatList style={styles.container}
      data={itemData}
      renderItem={({ item }) => <DonateCard item={item} />}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ width: "100%" }}
    />
  )
}