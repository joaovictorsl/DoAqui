import { useContext, useState } from 'react';
import { Image, TextInput, TouchableOpacity, View, Text, Alert } from 'react-native';

import { styles } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { CameraComponent } from '../Camera/Camera';
import { FirebaseContext } from '../../services/context/FirebaseContext';
import { UserContext } from '../../services/context/UserContext';
import { globalStyle } from '../../globalStyle';
import { Camera } from 'expo-camera';

export const DonateForm: React.FC = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [takenImageUri, setTakenImageUri] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [permission, requestPermission] = Camera.useCameraPermissions();

  let { doAquiFirebase } = useContext(FirebaseContext);
  let { user, setLoaded } = useContext(UserContext);

  const handleDonate = async () => {
    let cleanTags = tags.replace(/\s+/g, ' ').trim().split(" ");
    let alertTitle, alertDescription;

    if (cleanTags.length > 5) {
      alertTitle = "Excesso de tags";
      alertDescription = "Você só pode cadastrar 5 tags.";
    }
    else if (title.length < 3) {
      alertTitle = "Título muito curto";
      alertDescription = "O título deve ter no mínimo 3 caracteres.";
    }
    else if (description.length < 8) {
      alertTitle = "Descrição muito curta";
      alertDescription = "A descrição deve ter no mínimo 8 caracteres.";
    }
    else if (!takenImageUri) {
      alertTitle = "Tire uma foto do item";
      alertDescription = "É necessário uma foto para cadastrar o item a ser doado.";
    }

    if (alertTitle) {
      Alert.alert(
        alertTitle,
        alertDescription,
        [{ text: "OK", style: "default" }],
        { cancelable: true }
      );
      return;
    }
    setLoaded(false);
    let success = await doAquiFirebase.createItem(title, description, takenImageUri, cleanTags, user.account.email, user.longitude, user.latitude);

    if (success) {
      setTitle("");
      setDescription("");
      setTags("");
      setTakenImageUri("");
      navigation.navigate("home");
    } else {
      Alert.alert(
        "Erro ao criar item",
        "Tente novamente mais tarde.",
        [{ text: "OK", style: "default" }],
        { cancelable: true }
      );
    }
    setLoaded(true);
  }

  const handleCamera = async () => {
    if (!permission?.granted) {
      let response = await requestPermission();
      if (!response.granted) {
        return;
      }
    }
    setShow(true);
  }

  return (
    <>
      <View style={styles.formBody}>
        <TouchableOpacity onPress={() => handleCamera()} style={{ width: "100%", height: "50%", alignItems: "center", justifyContent: "center" }}>
          {takenImageUri ?
            <Image style={{ width: "90%", height: "100%", borderRadius: 5 }} source={{ uri: takenImageUri }} />
            :
            <FontAwesomeIcon icon={faCamera} color="#F06907" size={60} />
          }
        </TouchableOpacity>
        <TextInput
          placeholder='Título'
          placeholderTextColor="white"
          style={globalStyle.textInput}
          selectTextOnFocus={true}
          value={title}
          onChangeText={(e) => {
            if (title.length < 40) {
              setTitle(e)
            }
          }}
        />
        <TextInput
          placeholder='Descrição'
          placeholderTextColor="white"
          style={globalStyle.textInput}
          value={description}
          selectTextOnFocus={true}
          onChangeText={(e) => {
            if (description.length < 100) {
              setDescription(e);
            }
          }}
        />
        <TextInput
          placeholder='Tags'
          placeholderTextColor="white"
          style={globalStyle.textInput}
          value={tags}
          selectTextOnFocus={true}
          onChangeText={(e) => {
            setTags(e)
          }}
        />
        <Text style={{ color: "gray" }}>Digite as tags separadas por espaço. </Text>
        <Text style={{ color: "gray" }}>Máximo de 5 tags.</Text>
        <TouchableOpacity style={styles.btn} onPress={() => handleDonate()}>
          <Text style={styles.btnText}>Doar</Text>
        </TouchableOpacity>
      </View>
      <CameraComponent setTakenImageUri={setTakenImageUri} show={show} setShow={setShow} />
    </>
  )
}