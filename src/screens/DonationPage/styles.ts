import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  image: { width: '100%', height: "45%", resizeMode: 'cover' },
  btn: {
    width: "20%",
    backgroundColor: "#F06907",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    position: "absolute",
    right: "1%",
    top: ".5%",
    padding: 10
  },
  btnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF"
  },
});