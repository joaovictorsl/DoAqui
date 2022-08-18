import React, { useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';


import { styles } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCameraRotate, faCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface Props {
  setTakenImageUri: React.Dispatch<React.SetStateAction<string>>,
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>,

}

export const CameraComponent: React.FC<Props> = ({ setTakenImageUri, show, setShow }) => {
  const [type, setType] = useState(CameraType.back);
  let camera = useRef();

  const handlePicture = async () => {
    try {
      let picture = await camera.current.takePictureAsync();
      setTakenImageUri(picture.uri);
      setShow(false);
    } catch (error) {
      console.log(error)
    }
  }

  if (!show) {
    return null;
  }

  return (
    <Camera style={styles.camera} type={type} ref={camera}>
      <TouchableOpacity onPress={() => setShow(false)} style={{ position: "absolute", top: "1%", left: "3%" }}>
        <FontAwesomeIcon icon={faArrowLeft} color="white" size={35} />
      </TouchableOpacity>
      <View style={styles.btnSection}>
        <View style={styles.cameraRotate}>
          <FontAwesomeIcon icon={faCameraRotate} size={35} color="#F06907" />
        </View>
        <TouchableOpacity style={styles.cameraRotate} onPress={() => setType((prevState) => prevState == CameraType.back ? CameraType.front : CameraType.back)}>
          <FontAwesomeIcon icon={faCameraRotate} size={35} color="white" />
        </TouchableOpacity>
        <FontAwesomeIcon icon={faCircle} size={63} color="#F06907" style={styles.cameraPic} />
        <TouchableOpacity onPress={() => handlePicture()}>
          <FontAwesomeIcon icon={faCircle} size={55} color="white" />
        </TouchableOpacity>
      </View>
    </Camera>
  )
}