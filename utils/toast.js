import { ToastAndroid } from "react-native";

export const showError = (message) => {
  ToastAndroid.show(message, ToastAndroid.LONG);
};
