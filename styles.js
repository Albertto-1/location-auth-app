import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  leftHeader: {
    width: "100%",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginRight: 30,
  },
  leftTitle: {
    fontSize: 28,
    textAlign: "left",
  },
  icon: {
    position: "absolute",
    left: 0,
  },
  loginContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  loginForm: {
    flex: 3,
  },
  loginMap: {
    flex: 2,
    backgroundColor: "#2196f3",
    borderRadius: 20,
    overflow: "hidden",
  },
  headerSpecialText: {
    color: "#2196f3",
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 14,
    textAlign: "justify",
  },
  loginTitle: {
    fontWeight: "bold",
    marginTop: 16,
    fontSize: 20,
  },
  input: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 8,
    fontSize: 16,
    padding: 8,
    paddingTop: 6,
    paddingBottom: 6,
  },
  formGroup: {
    marginTop: 6,
  },
  loginButton: {
    marginTop: 14,
    borderRadius: 8,
    overflow: "hidden",
    fontWeight: "bold",
  },
  noAccount: {
    textAlign: "center", // <-- the magic
    marginTop: 3,
  },
  registerSpan: {
    fontWeight: "bold",
    color: "#2196f3",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
