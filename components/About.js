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
        Es un prototipo de un sistema de autenticación multifactor que utiliza
        credenciales (email y contraseña) como primer factor, la ubicación del
        usuario como segundo factor y TOTP como factor de respaldo.
      </Text>
      <Text style={{ ...styles.headerText, ...styles.mediumPaddingTop }}>
        En cada inicio de sesión, además de validar tu email y contraseña, se
        comparará tu ubicación contra un grupo de ubicaciones en las que
        confías. Si estás en una ubicación confiable, podrás iniciar sesión
        utilizando tu ubicación, si no, tendrás que usar una TOTP. Al iniciar
        sesión con este segundo método, tu ubicación se guardará como confiable
        y podrás iniciar sesión de forma más rápida la siguiente vez que entres
        a la plataforma en esa ubicación.
      </Text>
      <Text style={{ ...styles.loginTitle, ...styles.important }}>Premios</Text>
      <Text style={{ ...styles.headerText, ...styles.mediumPaddingTop }}>
        Se darán tres premios con valor equivalente de{" "}
        <Text style={styles.money}>$1,000</Text> (mil pesos) por premio. Los
        premios se le darán a los usuarios que cumplan con lo siguiente:
      </Text>
      <Text style={{ ...styles.reward, ...styles.smallMarginTop }}>
        <Text style={styles.homeSpecialText}>
          Usuario con mayor número de ubicaciones confiables.{" "}
        </Text>
        Se logra iniciando sesión en distintos lugares (casa, oficina).
      </Text>
      <Text style={styles.reward}>
        <Text style={styles.homeSpecialText}>
          Usuario con mayor número de logins.{" "}
        </Text>
        Se logra iniciando sesión y contestando el formulario que aparece (si no
        se contesta el formulario el login no cuenta).
      </Text>
      <Text style={styles.reward}>
        <Text style={styles.homeSpecialText}>
          Usuario con mayor número de referidos.{" "}
        </Text>
        Se logra haciendo que tus amigos con Android se registren poniendo tu
        email en el campo de "Referido por" y tengan mínimo 5 inicios de sesión
        con formulario registrado. Si tienes iOS puedes participar refiriendo.
      </Text>
      <Text style={{ ...styles.headerText, ...styles.mediumMarginTop }}>
        El concurso comienza el día miércoles 3 de noviembre y termina el día
        miércoles 24 de noviembre. Los resultados se darán a conocer el día
        sábado 4 de diciembre del 2021. Cualquier premio puede cancelarse si tu
        dispositivo tiene location mock activado.
      </Text>
      <Text style={{ ...styles.headerText, ...styles.mediumMarginTop }}>
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
          style={{ ...styles.loginButton, ...styles.mediumMarginTop }}
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
