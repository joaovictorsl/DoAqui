import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cardBody: {
    backgroundColor: "#202020",
    marginBottom: 40,
    padding: 10,
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 5,
  },
  itemInfo: {
    color: "#fff"
  },
  itemViewInfo: {
    alignItems: "flex-start",
    flex: 1,
    paddingVertical: 10
  },
  itemViewTags: {
    alignItems: "flex-end",
    flex: 1,
    paddingVertical: 10
  },
  itemTextView: {
    width: "100%",
    flexDirection: "row"
  },
  tag: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center"
  },
  tagView: {
    backgroundColor: "#F06907",
    borderRadius: 3,
    marginBottom: 5,
    marginRight: 5,
    padding: 2
  },
  row: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  }
});