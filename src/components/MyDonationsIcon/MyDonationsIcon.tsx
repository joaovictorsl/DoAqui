import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export const MyDonationsIcon: React.FC = () => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity style={{ position: 'absolute', alignSelf: 'flex-start', width: '10%', height: "100%", alignItems: "center", justifyContent: "center" }}
      onPress={() => navigation.navigate("myDonations")}
    >
      <FontAwesomeIcon icon={faBars} color="#F06907" size={30} />
    </TouchableOpacity>
  )
}