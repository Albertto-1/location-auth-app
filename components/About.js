import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import styles from "../styles";

export default About = ({ navigation, route, doShowRegistration }) => {
  return (
    <View>
      <Text style={{ ...styles.loginTitle, ...styles.headerSpecialText }}>
        Location Auth
      </Text>
      <Text style={{ ...styles.headerText, ...styles.mediumPaddingTop }}>
        Location-Auth es un prototipo de un sistema de autenticación multifactor
        que usa tu ubicación para validar y agilizar tu inicio de sesión.
      </Text>
      <Text style={{ ...styles.reward, ...styles.smallMarginTop }}>
        <Text style={styles.homeSpecialText}>1. </Text>
        Regístrate
      </Text>
      <Text style={{ ...styles.reward }}>
        <Text style={styles.homeSpecialText}>2. </Text>
        Contesta el formulario que aparece
      </Text>
      <Text style={{ ...styles.reward }}>
        <Text style={styles.homeSpecialText}>3. </Text>
        Cierra sesión
      </Text>
      <Text style={{ ...styles.reward }}>
        <Text style={styles.homeSpecialText}>4. </Text>
        Muévete a otra habitación de tu casa o del lugar en el que estés
      </Text>
      <Text style={{ ...styles.reward }}>
        <Text style={styles.homeSpecialText}>5. </Text>
        Iniciar sesión y vuelve a contestar el formulario
      </Text>
      <Text style={{ ...styles.reward }}>
        <Text style={styles.homeSpecialText}>5. </Text>
        Repite los pasos 4 y 5 la mayor cantidad de veces que puedas y en
        diferentes ubicaciones (casa, trabajo)
      </Text>

      <Text
        style={{
          ...styles.loginTitle,
          ...styles.important,
          marginTop: 36,
        }}
      >
        Concurso
      </Text>
      <Text style={{ ...styles.headerText, ...styles.mediumPaddingTop }}>
        Para hacer esto más divertido y emocionante, habrá un concurso en el que
        daré{" "}
        <Text style={{ ...styles.homeSpecialText, ...styles.money }}>
          3 premios.
        </Text>
        {"\n"}
        Para ganarte uno o varios de esos premios tienes que ser el usuario
        con...
      </Text>

      <Text style={{ ...styles.reward, ...styles.smallMarginTop }}>
        <Text style={styles.homeSpecialText}>
          ...más ubicaciones confiables. (1){"\n"}
        </Text>
        Inicia sesión en distintos lugares (casa, oficina).
      </Text>
      <Text style={styles.reward}>
        <Text style={styles.homeSpecialText}>...más referidos. (2){"\n"}</Text>
        Haz que tus amigos con Android se registren poniendo tu email en el
        campo de "Referido por (email)" y contesten mínimo 10 veces el
        formulario. Si tienes iOS puedes participar refiriendo.
      </Text>
      <Text style={styles.reward}>
        <Text style={styles.homeSpecialText}>...más logins. (3){"\n"}</Text>
        Contesta el formulario que aparece después de cada inicio de sesión.
      </Text>

      <Text style={{ marginTop: 22, padding: 0 }}>
        El premio (1) y (2) es un{" "}
        <Text
          style={{
            ...styles.homeSpecialText,
            ...styles.important,
          }}
        >
          Amazon Echo Dot (4ta Gen)
        </Text>{" "}
        o una tarjeta de regalo de Amazon con{" "}
        <Text style={{ ...styles.homeSpecialText, ...styles.money }}>
          $1,000 MXN.
        </Text>
      </Text>
      <Text style={{ marginTop: 8 }}>
        El premio (3) es una tarjeta de regalo de Amazon con{" "}
        <Text style={{ ...styles.homeSpecialText, ...styles.money }}>
          $600 MXN.
        </Text>
      </Text>
      <Text style={{ marginTop: 8 }}>
        Se cancelará tu premio(s) si tu dispositivo tiene hackeada la ubicación.
      </Text>

      <Text style={{ marginTop: 20, padding: 0, height: 24 }}>
        <Text style={styles.homeSpecialText}>Inicio:{"              "}</Text>
        03 de noviembre
      </Text>
      <Text style={{ marginTop: 4, padding: 0, height: 24 }}>
        <Text style={styles.homeSpecialText}>Fin:{"                  "}</Text>
        24 de noviembre
      </Text>
      <Text style={{ marginTop: 4, padding: 0, height: 24 }}>
        <Text style={styles.homeSpecialText}>Resultados:{"   "}</Text>
        27 de noviembre
      </Text>
      <Text
        style={{
          ...styles.headerText,
          ...styles.mediumMarginTop,
        }}
      >
        Email de contacto:{" "}
        <Text
          style={styles.homeSpecialText}
          onPress={() => {
            Linking.openURL("mailto:albertomartinvelez@gmail.com");
          }}
        >
          albertomartinvelez@gmail.com
        </Text>
      </Text>
      {((route.params && route.params.doShowRegistration) ||
        doShowRegistration) && (
        <TouchableOpacity
          style={{
            ...styles.loginButton,
            marginTop: 30,
            marginBottom: 10,
          }}
          onPress={() => {
            navigation.navigate("Registration");
          }}
        >
          <Text style={styles.loginButtonText}>Registrarme</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
