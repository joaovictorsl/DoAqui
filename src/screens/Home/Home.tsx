import React from 'react';
import { useContext } from 'react';
import { View } from 'react-native';
import { DonateCardList } from '../../components/DonateCardList/DonateCardList';
import { Header } from '../../components/Header/Header';
import { Search } from '../../components/Search/Input';
import { Item } from '../../models/Item';
import { FirebaseContext } from '../../services/context/FirebaseContext';
import { UserContext } from '../../services/context/UserContext';
import { LoadingScreen } from '../Loading/Loading';
import { NoLocationScreen } from '../NoLocation/NoLocation';
import { styles } from './styles';

export const HomeScreen: React.FC = ({ navigation }) => {
  let { user, loaded } = useContext(UserContext);
  let { doAquiFirebase } = useContext(FirebaseContext);
  let [itemData, setItemData] = React.useState<Item[]>([]);

  if (!loaded) {
    return <LoadingScreen />;
  }
  else if (user.longitude == null || user.latitude == null) {
    return <NoLocationScreen />
  }

  const handleSubmit = async (search: string) => {
    try {
      let titleSearch = await doAquiFirebase.getItemsWhere("title", "==", search);
      let descriptionSearch = await doAquiFirebase.getItemsWhere("description", "==", search);
      let tagsSearch = await doAquiFirebase.getItemsWhere("tags", "==", search);
      let newItemData = [...titleSearch, ...descriptionSearch, ...tagsSearch];
      newItemData.sort((a, b) => a.calcDistance(user.longitude, user.latitude) - b.calcDistance(user.longitude, user.latitude));
      setItemData(newItemData);
    } catch (error) {
      console.log(error);
      console.log("Problema ao requesitar dados dos itens.");
    }
  }

  const fetchItems = async () => {
    try {
      let newItemData = await doAquiFirebase.getItems();
      newItemData.sort((a, b) => a.calcDistance(user.longitude, user.latitude) - b.calcDistance(user.longitude, user.latitude));
      setItemData(newItemData);
    } catch (error) {
      console.log(error);
      console.log("Problema ao requesitar dados dos itens.");
    }
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Search handleSubmit={handleSubmit} />
      <DonateCardList fetchItems={fetchItems} itemData={itemData} />
    </View>
  )
}
