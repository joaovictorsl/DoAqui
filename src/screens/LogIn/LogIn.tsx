import { FirebaseError } from 'firebase/app';
import React, { useContext, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Header } from '../../components/Header/Header';
import { globalStyle } from '../../globalStyle';
import { FirebaseContext } from '../../services/context/FirebaseContext';
import { UserContext } from '../../services/context/UserContext';
import { LoadingScreen } from '../Loading/Loading';

import { styles } from './styles'

export const LogInScreen: React.FC = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let { user, setUser } = useContext(UserContext);
  let { doAquiFirebase } = useContext(FirebaseContext);

  const handleLogIn = async () => {
    if (password.length < 6) {
      Alert.alert(
        "Senha pequena",
        "A sua senha deve ter no mínimo 6 caracteres.",
        [{ text: "OK", style: "default" }],
        { cancelable: true }
      );
      return;
    }
    setLoading(true);
    try {
      let returnedUser = await doAquiFirebase.logIn(email, password);
      if (returnedUser != null) {
        setUser({ ...user, account: returnedUser });
      }
    } catch (error) {
      let msg = (error as FirebaseError).message;
      Alert.alert(
        "Erro",
        msg,
        [{ text: "OK", style: "default" }],
        { cancelable: true }
      );
      console.log(error)
    }
    setLoading(false);
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.formBody}>
        <TextInput
          onChangeText={(e) => setEmail(e.trim())}
          value={email}
          autoComplete="email"
          style={globalStyle.textInput}
          placeholderTextColor="white"
          placeholder='Email'
          selectTextOnFocus={true}
        />
        <TextInput
          onChangeText={(e) => setPassword(e)}
          value={password}
          secureTextEntry={true}
          style={globalStyle.textInput}
          placeholderTextColor="white"
          placeholder='Senha'
          selectTextOnFocus={true}
        />
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.btn} onPress={() => handleLogIn()}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
          <Text style={{ ...styles.btnText, flex: .3, textAlignVertical: "center" }}>OU</Text>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("signUp")}>
            <Text style={styles.btnText}>Fazer cadastro</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}