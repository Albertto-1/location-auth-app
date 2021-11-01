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
  homeTitle: {
    fontSize: 20,
    textAlign: "center",
  },
  homeSpecialText: {
    fontWeight: "bold",
    color: "black",
  },
  smallMarginTop: {
    marginTop: 4,
  },
  mediumPaddingTop: {
    paddingTop: 12,
  },
  mediumMarginTop: {
    marginTop: 16,
  },
  smallMarginLeft: {
    marginLeft: 6,
  },
  mapLegend: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  mapLegendText: {
    marginLeft: 6,
    marginTop: 4,
    fontSize: 16,
  },
  card: {
    padding: 17,
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#52006A",
  },
  questionRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  question: {
    width: "66%",
    textAlign: "justify",
  },
  answer: {
    width: "30%",
    borderStyle: "solid",
    borderWidth: 1,
    // borderColor: "lightgray",
    borderColor: "#f0ad4e",
    borderRadius: 8,
    // flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 36,
    overflow: "hidden",
  },
  yes: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderRightWidth: 1,
    // borderRightColor: "lightgray",
    borderRightColor: "#f0ad4e",
  },
  no: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#f0ad4e",
  },
  activeText: {
    color: "white",
    fontWeight: "bold",
  },
  normalText: {
    color: "gray",
  },
  pinIcon: {
    marginLeft: 8,
    marginRight: 8,
  },
  formButton: {
    padding: 7,
    textAlign: "center",
    marginTop: 18,
    backgroundColor: "#f0ad4e",
    borderRadius: 8,
  },
  formButtonDisabled: {
    padding: 11,
    textAlign: "center",
    marginTop: 10,
    backgroundColor: "#dfdfdf",
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  important: {
    color: "#f0ad4e",
  },
  smallerText: {
    fontSize: 18,
  },
  instructions: {
    fontSize: 16,
    marginTop: 6,
  },
  clipboardCode: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#999999",
  },
  clipboard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#dddddd",
    backgroundColor: "#eeeeee",
    borderRadius: 8,
    marginTop: 14,
    marginBottom: 14,
    padding: 8,
  },
  reward: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: "lightgray",
    paddingLeft: 16,
    paddingTop: 6,
    paddingBottom: 6,
  },
  money: {
    fontWeight: "bold",
    color: "green",
  },
  timer: {
    fontWeight: "bold",
  },
  cardTitle: {
    fontSize: 16,
  },
  cardTitleContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});
