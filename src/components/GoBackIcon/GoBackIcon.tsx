import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export const GoBackIcon: React.FC = ({ navigation }) => {

  return (
    <TouchableOpacity style={{ position: 'absolute', alignSelf: 'flex-start', width: '10%', height: "100%", alignItems: "center", justifyContent: "center" }}
      onPress={() => navigation.goBack()}
    >
      <FontAwesomeIcon icon={faArrowLeft} color="#F06907" size={30} />
    </TouchableOpacity>
  )
}