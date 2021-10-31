import React, { useState } from "react";
import JWT from "expo-jwt";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from "react-native";
import MapView from "react-native-maps";
import styles from "../styles";
import { showError } from "../utils/toast";
import { SECRET_KEY } from "../utils/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default LoginPage = ({ navigation, location, locations }) => {
  const [email, setEmail] = useState("alberto@gmail.com");
  const [password, setPassword] = useState("abc123A*");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = () => {
    if (loading) return;
    if (locations.length >= 10 && email && password) {
      setLoading(true);
      const locationsCopy = [...locations];
      fetch("https://location-auth-10.uw.r.appspot.com/auth/location", {
        method: "POST",
        mode: "no-cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          locations: locationsCopy.map((loc) => {
            return {
              lat: loc.coords.latitude,
              lon: loc.coords.longitude,
              acc: loc.coords.accuracy,
              speed: loc.coords.speed,
              is_mocked: loc.mocked,
            };
          }),
        }),
      })
        .then((response) => response.json())
        .then(async (json) => {
          if (json.access_token) {
            try {
              AsyncStorage.setItem("access_token", json.access_token);
              const payload = JWT.decode(json.access_token, SECRET_KEY);
              if (payload.trusted_location) {
                navigation.replace("Home", {
                  payload: payload,
                  location: { ...location },
                });
              } else {
                navigation.navigate("TOTP", { payload: payload });
              }
            } catch (err) {
              console.log(err);
              showError(err);
            }
          } else {
            showError(json.detail);
            setError(json.detail);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={styles.loginContainer}>
          <Text style={styles.headerText}>
            Bienvenido a{" "}
            <Text style={styles.headerSpecialText}>Location Auth</Text>, un
            sistema de autenticación multifactor que usa tu ubicación como uno
            de los factores para una autenticación más segura y sin tantos
            pasos.
          </Text>
          <Text style={styles.loginTitle}>Inicia sesión</Text>
          <View style={styles.formGroup}>
            <View style={styles.formGroup}>
              <Text>Email:</Text>
              <TextInput
                onChangeText={(value) => {
                  setError("");
                  setEmail(value.toLowerCase());
                }}
                value={email}
                style={!error ? styles.input : styles.inputError}
                autoComplete="email"
                keyboardType="email-address"
              ></TextInput>
            </View>
            <View style={styles.formGroup}>
              <Text>Contraseña:</Text>
              <TextInput
                onChangeText={(value) => {
                  setError("");
                  setPassword(value);
                }}
                value={password}
                style={!error ? styles.input : styles.inputError}
                secureTextEntry={true}
                autoComplete="password"
              ></TextInput>
            </View>

            {loading ? (
              <TouchableOpacity style={styles.loginButtonDisabled}>
                <Text style={styles.loginButtonText}>Cargando...</Text>
                <ActivityIndicator color="#2196f3" />
              </TouchableOpacity>
            ) : locations.length < 10 ? (
              <TouchableOpacity style={styles.loginButtonDisabled}>
                <Text style={styles.loginButtonText}>
                  Obteniendo ubicación óptima
                </Text>
                <ActivityIndicator color="#2196f3" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.loginButton} onPress={login}>
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
              </TouchableOpacity>
            )}
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
          {location !== null && (
            <View style={styles.loginMap}>
              <MapView
                style={styles.map}
                showsUserLocation={true}
                showsMyLocationButton={true}
                rotateEnabled={false}
                pitchEnabled={false}
                showsScale={true}
                minZoomLevel={4}
                maxZoomLevel={20}
                initialCamera={{
                  center: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  },
                  pitch: 0,
                  zoom: 16,
                  heading: 0,
                  altitude: 0,
                }}
                mapType="standard"
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
