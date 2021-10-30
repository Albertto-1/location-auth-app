import React, { useEffect, useState } from "react";
import JWT from "expo-jwt";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import MapView from "react-native-maps";
import styles from "../styles";

// const SECRET_KEY = process.env.SECRET_KEY;
const SECRET_KEY =
  "0842160add0aa60aaa83f66bce0c9c35efd601522b16f35411965188749684b3";

export default LoginPage = ({ navigation, location }) => {
  const [email, setEmail] = useState("betuss@gmail.com");
  const [password, setPassword] = useState("password");
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location !== null) {
      if (locations.length >= 20) {
        const newLocations = locations.slice(locations.length - 9);
        newLocations.push(location);
        setLocations(newLocations);
      } else {
        setLocations([...locations, location]);
      }
    }
  }, [location]);

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
            };
          }),
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.access_token) {
            try {
              const payload = JWT.decode(json.access_token, SECRET_KEY);
              console.log(payload);
              if (payload.valid_location) {
                navigation.navigate("Home");
              } else {
                navigation.navigate("TOTP");
              }
            } catch (error) {
              console.log(error);
            }
          } else {
            console.log("NEL KRNAL");
            // Go to ERROR
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  };

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
            <TextInput
              onChangeText={(value) => {
                setEmail(value);
              }}
              value={email}
              style={styles.input}
            ></TextInput>
          </View>
          <View style={styles.formGroup}>
            <Text>Contraseña:</Text>
            <TextInput
              onChangeText={(value) => {
                setPassword(value);
              }}
              value={password}
              style={styles.input}
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
      {location !== null && (
        <View style={styles.loginMap}>
          <MapView
            style={styles.map}
            showsUserLocation={true}
            showsMyLocationButton={false}
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
          />
        </View>
      )}
    </View>
  );
};
