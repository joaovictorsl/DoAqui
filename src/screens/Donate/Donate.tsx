import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { DonateForm } from '../../components/DonateForm/DonateForm';
import { Header } from '../../components/Header/Header';
import { UserContext } from '../../services/context/UserContext';
import { AuthScreen } from '../Auth/Auth';
import { LoadingScreen } from '../Loading/Loading';
import { NoLocationScreen } from '../NoLocation/NoLocation';
import { styles } from './styles';

export const DonateScreen: React.FC = ({ navigation }) => {
  let { user, loaded } = useContext(UserContext);

  if (!loaded) {
    return <LoadingScreen />;
  }
  else if (user.longitude == null || user.latitude == null) {
    return <NoLocationScreen />
  } else if (!user.account?.uid) {
    return <AuthScreen />;
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <DonateForm navigation={navigation} />
    </View>
  )
}
