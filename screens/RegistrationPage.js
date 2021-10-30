import React, { useRef, useState } from "react";
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
import Instructions from "../components/Instructions";
import styles from "../styles";
import { showError } from "../utils/toast";
import { SECRET_KEY } from "../utils/config";

const passwordInstructions =
  "La contraseña debe tener mínimo: una minúscula, una mayúscula, un número, un caracter expecial (?, *, @, #...) y 8 caracteres de longitud.";

export default RegistrationPage = ({ navigation, locations }) => {
  const [name, setName] = useState("Alberto");
  const [email, setEmail] = useState("alberto@gmail.com");
  const [password, setPassword] = useState("abc123A*");
  const [password2, setPassword2] = useState("abc123A*");
  const [referedBy, setReferedBy] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const password2InputRef = useRef(null);
  const referedByInputRef = useRef(null);

  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  const passwordIsValid = (pw) => {
    return strongRegex.test(pw);
  };

  const passwordsAreValid = () => {
    if (password !== password2) return false;
    if (!passwordIsValid(password)) return false;
    return true;
  };

  const isFormValid = () => {
    return locations.length >= 10 && name && email && passwordsAreValid();
  };

  const register = () => {
    if (loading) return;
    if (isFormValid()) {
      setLoading(true);
      const locationsCopy = [...locations];
      fetch("https://location-auth-10.uw.r.appspot.com/user", {
        method: "POST",
        mode: "no-cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          locations: locationsCopy.map((loc) => {
            return {
              lat: loc.coords.latitude,
              lon: loc.coords.longitude,
              acc: loc.coords.accuracy,
            };
          }),
          refered_by: referedBy,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.access_token) {
            try {
              const payload = JWT.decode(json.access_token, SECRET_KEY);
              navigation.pop();
              navigation.replace("Home", { payload: payload });
            } catch (error) {
              showError(error);
            }
          } else {
            showError(json.detail);
            setError(json.detail);
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
    <SafeAreaView>
      <ScrollView>
        <View style={styles.loginContainer}>
          <Instructions />
          <Text style={styles.loginTitle}>Regístrate para participar</Text>
          <View style={styles.formGroup}>
            <View style={styles.formGroup}>
              <Text>Nombre:</Text>
              <TextInput
                onChangeText={(value) => {
                  if (value !== "") {
                    setError("");
                  } else {
                    setError("Invalid password");
                  }
                  setName(value);
                }}
                value={name}
                style={error && name === "" ? styles.inputError : styles.input}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  emailInputRef.current.focus();
                }}
              ></TextInput>
            </View>
            <View style={styles.formGroup}>
              <Text>Email:</Text>
              <TextInput
                ref={emailInputRef}
                onChangeText={(value) => {
                  if (value !== "") {
                    setError("");
                  } else {
                    setError("Invalid password");
                  }
                  setEmail(value);
                }}
                value={email}
                style={error && email === "" ? styles.inputError : styles.input}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  passwordInputRef.current.focus();
                }}
              ></TextInput>
            </View>
            <View style={styles.formGroup}>
              <Text>Contraseña segura:</Text>
              {error && !passwordIsValid(password) ? (
                <Text style={styles.errorMessage}>{passwordInstructions}</Text>
              ) : null}
              <TextInput
                ref={passwordInputRef}
                onChangeText={(value) => {
                  if (passwordIsValid(value)) {
                    setError("");
                  } else {
                    setError("Invalid password");
                  }
                  setPassword(value);
                }}
                value={password}
                style={
                  error && !passwordIsValid(password)
                    ? styles.inputError
                    : styles.input
                }
                secureTextEntry={true}
                autoComplete="password"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  password2InputRef.current.focus();
                }}
              ></TextInput>
            </View>
            <View style={styles.formGroup}>
              <Text>Repite la contraseña:</Text>
              <TextInput
                ref={password2InputRef}
                onChangeText={(value) => {
                  if (passwordIsValid(value)) {
                    setError("");
                  } else {
                    setError("Invalid password");
                  }
                  setPassword2(value);
                }}
                value={password2}
                style={
                  error && !passwordsAreValid()
                    ? styles.inputError
                    : styles.input
                }
                secureTextEntry={true}
                autoComplete="password"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  referedByInputRef.current.focus();
                }}
              ></TextInput>
            </View>
            <View style={styles.formGroup}>
              <Text>(Opcional) Referido por:</Text>
              <TextInput
                ref={referedByInputRef}
                onChangeText={(value) => {
                  setReferedBy(value);
                }}
                value={referedBy}
                style={styles.input}
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
            ) : !isFormValid() ? (
              <TouchableOpacity
                style={styles.loginButtonDisabled}
                onPress={() => setError("Nmms bro")}
              >
                <Text style={styles.loginButtonText}>Registrarme</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.loginButton} onPress={register}>
                <Text style={styles.loginButtonText}>Registrarme</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
