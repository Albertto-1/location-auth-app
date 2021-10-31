import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles";

export default YesNoInput = ({ yesNoValue, updateValue }) => {
  return (
    <View style={styles.answer}>
      <TouchableOpacity
        style={{ ...styles.yes, ...(yesNoValue ? styles.active : null) }}
        onPress={() => {
          updateValue(true);
        }}
      >
        <Text style={yesNoValue ? styles.activeText : styles.normalText}>
          SI
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...styles.no,
          ...(yesNoValue === false ? styles.active : null),
        }}
        onPress={() => {
          updateValue(false);
        }}
      >
        <Text
          style={yesNoValue === false ? styles.activeText : styles.normalText}
        >
          NO
        </Text>
      </TouchableOpacity>
    </View>
  );
};
