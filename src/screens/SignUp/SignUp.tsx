import { FirebaseError } from 'firebase/app';
import React, { useContext, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Header } from '../../components/Header/Header';
import { FirebaseContext } from '../../services/context/FirebaseContext';
import { UserContext } from '../../services/context/UserContext';
import { LoadingScreen } from '../Loading/Loading';

import { styles } from './styles'
import { globalStyle } from '../../globalStyle'

export const SignUpScreen: React.FC = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  let { user, setUser } = useContext(UserContext);
  let { doAquiFirebase } = useContext(FirebaseContext);

  const handleCreateAccount = async () => {
    if (password.length < 6) {
      Alert.alert(
        "Senha pequena",
        "A sua senha deve ter no mínimo 6 caracteres.",
        [{ text: "OK", style: "default" }],
        { cancelable: true }
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(
        "Senhas diferentes",
        "A sua senha e a confirmação dela não são iguais.",
        [{ text: "OK", style: "default", }],
        { cancelable: true }
      );
      return;
    }
    setLoading(true);
    try {
      let returnedUser = await doAquiFirebase.registerUser(email, password);
      if (returnedUser) {
        setUser({ ...user, account: returnedUser });
      }
    } catch (error) {
      let msg = (error as FirebaseError).message;
      if (msg == "Firebase: Error (auth/email-already-in-use).") {
        Alert.alert(
          "Email inválido",
          "Email já está em uso.",
          [{ text: "OK", style: "default" }],
          { cancelable: true }
        );
      }
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
        <TextInput
          onChangeText={(e) => setConfirmPassword(e)}
          value={confirmPassword}
          secureTextEntry={true}
          style={globalStyle.textInput}
          placeholderTextColor="white"
          placeholder='Confirmar senhas'
          selectTextOnFocus={true}
        />
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.btn} onPress={() => handleCreateAccount()}>
            <Text style={styles.btnText}>Cadastrar</Text>
          </TouchableOpacity>
          <Text style={{ ...styles.btnText, flex: .3, textAlignVertical: "center" }}>OU</Text>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText} onPress={() => navigation.navigate("logIn")}>Fazer login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}