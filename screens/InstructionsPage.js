import React from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import About from "../components/About";
import TOTPInstructions from "../components/TOTPInstructions";
import styles from "../styles";

export default InstructionsPage = (props) => {
  let whichOne = "";
  if (props.route && props.route.params) {
    whichOne = props.route.params.whichOne;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.loginContainer}>
          {whichOne === "totp" ? (
            <TOTPInstructions {...props} totpSecret={props.route.params.code} />
          ) : (
            <About {...props} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
