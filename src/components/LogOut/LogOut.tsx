import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { FirebaseContext } from '../../services/context/FirebaseContext';
import { UserContext } from '../../services/context/UserContext';

export const LogOutIcon: React.FC = () => {
  let { user, setUser, setLoaded } = useContext(UserContext);
  let { doAquiFirebase } = useContext(FirebaseContext);

  const handleLogOut = async () => {
    setLoaded(false);
    let result = await doAquiFirebase.signOut();
    setUser({ ...user, account: null });
    setLoaded(true);
  }

  return (
    <TouchableOpacity style={{ position: 'absolute', alignSelf: 'flex-end', width: '10%', height: "100%", alignItems: "center", justifyContent: "center" }}
      onPress={() => handleLogOut()}
    >
      <FontAwesomeIcon icon={faDoorOpen} color="#F06907" size={30} />
    </TouchableOpacity>
  )
}