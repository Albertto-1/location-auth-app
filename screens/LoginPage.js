import React, { useEffect, useState } from "react";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(async () => {
    const storedEmail = await AsyncStorage.getItem("email_address");
    if (storedEmail && storedEmail !== "") {
      setEmail(storedEmail);
    }
  }, []);

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
              setLoading(false);
              await AsyncStorage.setItem("email_address", email);
              await AsyncStorage.setItem("access_token", json.access_token);
              const payload = JWT.decode(json.access_token, SECRET_KEY);
              if (payload.trusted_location) {
                navigation.replace("Home", {
                  payload: payload,
                  location: { ...location },
                  locations: [...locations],
                });
              } else {
                navigation.navigate("TOTP", { payload: payload });
              }
            } catch (err) {
              console.log(err);
              showError(err);
              setLoading(false);
            }
          } else {
            showError(json.detail);
            setError(json.detail);
            setLoading(false);
          }
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
