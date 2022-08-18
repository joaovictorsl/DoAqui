import React, { useContext, useState } from 'react';
import { Image, View, Text, TouchableOpacity, Alert } from 'react-native';
import { CommentSection } from '../../components/CommentSection/CommentSection';
import { DonationInfo } from '../../components/DonationInfo/DonationInfo';
import { GoBackHeader } from '../../components/GoBackHeader/GoBackHeader';
import { Item } from '../../models/Item';
import { FirebaseContext } from '../../services/context/FirebaseContext';
import { UserContext } from '../../services/context/UserContext';

import { styles } from './styles'

export const DonationPage: React.FC = ({ route, navigation }) => {
  const item: Item = route.params['item'];
  let { user } = useContext(UserContext);
  let { doAquiFirebase } = useContext(FirebaseContext);

  const handleConcludeDonation = async () => {
    Alert.alert(
      "Concluir doação",
      "Ao concluir a doação o item doado será excluido junto com seus comentários. Continuar?",
      [{
        text: "OK", style: "default", onPress: async () => {
          await doAquiFirebase.endDonation(item.id);
          navigation.goBack();
        }
      }, { text: "Cancelar", style: "default" }]
    );
  }



  return (
    <View style={styles.container}>
      <GoBackHeader navigation={navigation} />
      {
        user.account?.email == item.userEmail
          ?
          <TouchableOpacity style={{ ...styles.btn }} onPress={() => handleConcludeDonation()}>
            <Text style={styles.btnText}>Doado</Text>
          </TouchableOpacity>
          :
          null
      }
      <View style={{ flex: 1, width: "100%" }}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <DonationInfo item={item} />
        <CommentSection id={item.id} ownerEmail={item.userEmail} />
      </View>
    </View>
  )
}