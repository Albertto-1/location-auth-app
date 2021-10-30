import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  PermissionsAndroid,
} from "react-native";
import MapView from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import styles from "../styles";

export default LoginPage = ({ navigation }) => {
  useEffect(async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Auth Geolocation Permission",
        message:
          "Location Auth necesita permiso para acceder a tu " +
          "ubicación para que puedas usar la app.",
        buttonNegative: "No gracias",
        buttonPositive: "Está bien",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("SI");
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
        },
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      console.log("NO");
    }
  }, []);
  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginForm}>
        <Text style={styles.headerText}>
          Bienvenido a{" "}
          <Text style={styles.headerSpecialText}>Location Auth</Text>, un
          sistema de autenticación multifactor que usa tu ubicación como uno de
          los factores para una autenticación más segura y sin tantos pasos.
        </Text>
        <Text style={styles.loginTitle}>Inicia sesión</Text>
        <View style={styles.formGroup}>
          <View style={styles.formGroup}>
            <Text>Email:</Text>
            <TextInput style={styles.input}></TextInput>
          </View>
          <View style={styles.formGroup}>
            <Text>Contraseña:</Text>
            <TextInput style={styles.input}></TextInput>
          </View>
          <View style={styles.loginButton}>
            <Button
              title="Iniciar Sesión"
              onPress={() => {
                console.log("safasd");
              }}
            />
          </View>
          <View style={styles.noAccount}>
            <Text style={styles.noAccount}>
              ¿Aún no tienes cuenta?,{" "}
              <Text
                style={styles.registerSpan}
                onPress={() => {
                  navigation.navigate("Registration");
                }}
              >
                Regístrate
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.loginMap}>
        <MapView style={styles.map} />
      </View>
    </View>
  );
};
