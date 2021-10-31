import React from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import About from "../components/About";
import TOTPInstructions from "../components/TOTPInstructions";
import styles from "../styles";

export default InstructionsPage = ({ route }) => {
  const whichOne = route.params.whichOne;
  const code = route.params.code;

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.loginContainer}>
          {whichOne === "totp" ? (
            <TOTPInstructions totpSecret={code} />
          ) : (
            <About />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
