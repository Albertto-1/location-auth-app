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
import styles from "../styles";
import { showError } from "../utils/toast";
import { SECRET_KEY } from "../utils/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default TOTPPage = ({ navigation, route, locations }) => {
  const [totp, setTOTP] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const payload = route.params.payload;

  const login = async () => {
    if (loading) return;
    if (totp) {
      setLoading(true);
      const locationsCopy = [...locations];
      const access_token = await AsyncStorage.getItem("access_token");
      fetch("https://location-auth-10.uw.r.appspot.com/auth/totp", {
        method: "POST",
        mode: "no-cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
        body: JSON.stringify({
          totp: totp,
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
              await AsyncStorage.setItem("access_token", json.access_token);
              const newPayload = JWT.decode(json.access_token, SECRET_KEY);
              navigation.replace("Home", {
                payload: newPayload,
                location: { ...locations.pop() },
                locations: [...locations],
              });
            } catch (err) {
              setError(err);
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
          <Text style={styles.homeTitle}>
            Ingresa la <Text style={styles.headerSpecialText}>TOTP</Text> para
            la cuenta <Text style={styles.homeSpecialText}>{payload.sub}</Text>
          </Text>

          <Text style={{ ...styles.headerText, ...styles.mediumMarginTop }}>
            Al parecer: {payload.error}
          </Text>
          <Text style={{ ...styles.headerText, ...styles.smallMarginTop }}>
            Por esto no podemos contemplarla para el inicio de sesión.
          </Text>

          <Text style={styles.loginTitle}>TOTP:</Text>
          <View style={styles.formGroup}>
            <View style={styles.formGroup}>
              <TextInput
                onChangeText={(value) => {
                  setError("");
                  setTOTP(value.toLowerCase());
                }}
                value={totp}
                style={!error ? styles.input : styles.inputError}
                keyboardType="numeric"
                maxLength={6}
              ></TextInput>
            </View>

            {loading ? (
              <TouchableOpacity style={styles.loginButtonDisabled}>
                <Text style={styles.loginButtonText}>Cargando...</Text>
                <ActivityIndicator color="#2196f3" />
              </TouchableOpacity>
            ) : totp.length < 6 ? (
              <TouchableOpacity style={styles.loginButtonDisabled}>
                <Text style={styles.loginButtonText}>Enviar</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.loginButton} onPress={login}>
                <Text style={styles.loginButtonText}>Enviar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
