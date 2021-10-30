import React from "react";
import * as Icons from "react-native-heroicons/solid";
import { View, Text } from "react-native";

import styles from "../styles";

export default ApplicationHeader = (props) => {
  if (props.children === "Location Auth") {
    return (
      <View style={styles.header}>
        <Icons.LocationMarkerIcon
          style={styles.icon}
          fill="#2196f3"
          size={36}
        />
        <Text style={styles.title}>{props.children}</Text>
      </View>
    );
  }
  return (
    <View style={styles.leftHeader}>
      <Text style={styles.leftTitle}>{props.children}</Text>
    </View>
  );
};
