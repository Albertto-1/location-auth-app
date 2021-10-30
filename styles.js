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
    padding: 20,
    backgroundColor: "white",
  },
  loginMap: {
    marginTop: 24,
    backgroundColor: "#2196f3",
    height: 270,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#52006A",
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
  inputError: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "red",
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
    padding: 11,
    textAlign: "center",
    marginTop: 10,
    backgroundColor: "#2196f3",
    borderRadius: 8,
  },
  loginButtonDisabled: {
    padding: 11,
    textAlign: "center",
    marginTop: 10,
    backgroundColor: "#dfdfdf",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  loginButtonText: {
    textAlign: "center",
    textTransform: "uppercase",
    color: "white",
    fontWeight: "bold",
  },
  noAccount: {
    textAlign: "center",
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
  errorMessage: {
    color: "red",
  },
});
