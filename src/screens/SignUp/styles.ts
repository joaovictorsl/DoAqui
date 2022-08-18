import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151515",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  formBody: {
    backgroundColor: "#202020",
    flex: .9,
    width: "95%",
    borderRadius: 10,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  btn: {
    width: "50%",
    backgroundColor: "#F06907",
    flex: .3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  btnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF"
  },
  btnView: {
    flex: .4,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});