import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  camera: {
    flex: 1,
    position: 'absolute',
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  btnSection: {
    width: "100%",
    position: "absolute",
    height: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraRotate: {
    position: "absolute",
    right: "10%",
    padding: 10
  },
  cameraPic: {
    borderColor: "#F06907",
    position: "absolute",
  }
});