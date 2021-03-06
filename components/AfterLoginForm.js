import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "../styles";
import YesNoInput from "./YesNo";
import * as Icons from "react-native-heroicons/solid";
import * as Network from "expo-network";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default AfterLoginForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState("--");
  const [alreadySent, setAlreadySent] = useState(false);
  const [success, setSuccess] = useState(false);

  const device = Device.brand + ", " + Device.modelName + ", " + Device.osName;
  const payload = props.route.params.payload;
  const trustedLocation = payload.hasOwnProperty("trusted_location")
    ? payload.trusted_location
    : null;
  const newLocation = payload.hasOwnProperty("new_location")
    ? payload.new_location
    : null;
  const backError = payload.hasOwnProperty("error") ? payload.error : "";
  const base32secret = payload.hasOwnProperty("base32secret")
    ? payload.base32secret
    : null;

  let result;
  if (trustedLocation !== null && trustedLocation) {
    result = "TRUSTED_LOCATION";
  } else if (newLocation) {
    if (base32secret) {
      result = "SUCCESS_REGISTRATION";
    } else {
      result = "NEW_LOCATION";
    }
  } else {
    if (base32secret) {
      result = "SUCCESS_REGISTRATION";
    } else {
      result = "NO_TRUST_LOC " + backError;
    }
  }

  const [q1, setQ1] = useState(result === "SUCCESS_REGISTRATION" ? true : null);
  const [q2, setQ2] = useState(null);
  const [q3, setQ3] = useState(null);

  useEffect(() => {
    let timer = 61;
    const interval = setInterval(() => {
      timer = timer - 1;
      setSeconds(timer);
      if (timer === 0 || alreadySent) {
        clearInterval(interval);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const isFormValid = () => {
    return q1 !== null && q2 !== null && q3 !== null;
  };

  const sendFeedback = async () => {
    setLoading(true);
    const netType = (await Network.getNetworkStateAsync()).type;

    const body = {
      network_type: netType,
      device: device,
      result: result,
      expected_trusted_location: q1,
      with_interference: q2,
      moving: q3,
      locations: props.route.params.locations.map((loc) => {
        return {
          lat: loc.coords.latitude,
          lon: loc.coords.longitude,
          acc: loc.coords.accuracy,
          speed: loc.coords.speed,
          is_mocked: loc.mocked,
        };
      }),
    };

    const access_token = await AsyncStorage.getItem("access_token");
    fetch("https://location-auth-10.uw.r.appspot.com/user/feedback", {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then(async (json) => {
        console.log(json);
        if (json.success) {
          setSuccess(true);
        } else {
          setSuccess(false);
          // showError(json.detail);
        }
        setLoading(false);
        setAlreadySent(true);
      })
      .catch((err) => {
        setLoading(false);
        setAlreadySent(true);
        console.log(err);
      });
  };

  if (alreadySent) {
    return (
      <View style={styles.card}>
        <Text>
          Gracias por tu apoyo. Haz logout y login de nuevo para poder contestar
          m??s veces.
        </Text>
        <TouchableOpacity style={styles.formButton} onPress={props.logout}>
          <Text style={styles.loginButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (seconds === 0) {
    return (
      <View style={styles.card}>
        <Text>
          Recuerda contestar el formulario justo despu??s de iniciar sesi??n. Si
          no contestas el formulario tus logins no valen. Haz logout y login de
          nuevo para poder contestar m??s veces.
        </Text>
        <TouchableOpacity style={styles.formButton} onPress={props.logout}>
          <Text style={styles.loginButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.cardTitleContainer}>
        <Text style={{ ...styles.cardTitle, ...styles.normalText }}>
          Formulario de login:
        </Text>
        <Text style={styles.timer}>{seconds} s</Text>
      </View>
      <Text>
        Contesta este formulario para tener{" "}
        <Text style={{ ...styles.headerSpecialText, ...styles.important }}>
          m??s oportunidades de ganar
        </Text>
        .
      </Text>
      <Text style={styles.smallMarginTop}>
        Ap??yate del mapa de tus
        <Icons.LocationMarkerIcon
          style={styles.pinIcon}
          fill="#ea4335"
          size={18}
        />
        confiables.
      </Text>
      <View style={styles.smallMarginTop}>
        {result !== "SUCCESS_REGISTRATION" && (
          <View
            style={{
              ...styles.questionRow,
              ...styles.mediumPaddingTop,
              ...styles.reward,
            }}
          >
            <Text style={styles.question}>
              {result === "TRUSTED_LOCATION"
                ? "El sistema detect?? que est??s en una ubicaci??n confiable (casa, trabajo), ??Es correcto?"
                : result === "NEW_LOCATION"
                ? "El sistema detect?? y guard?? esta como una ubicaci??n nueva, ??Si estas en una ubicaci??n nueva?"
                : "El sistema no pudo iniciar sesi??n usando tu ubicaci??n, ??Est??s en una ubicaci??n confiable?"}
            </Text>
            <YesNoInput yesNoValue={q1} updateValue={setQ1}></YesNoInput>
          </View>
        )}
        <View
          style={{
            ...styles.questionRow,
            ...styles.mediumPaddingTop,
            ...styles.reward,
          }}
        >
          <Text style={styles.question}>
            ??Est??s en un edificio, entre edificios o en un s??tano?
          </Text>
          <YesNoInput yesNoValue={q2} updateValue={setQ2}></YesNoInput>
        </View>
        <View
          style={{
            ...styles.questionRow,
            ...styles.mediumPaddingTop,
            ...styles.reward,
          }}
        >
          <Text style={styles.question}>
            ??Est??s en un veh??culo o transporte en movimiento?
          </Text>
          <YesNoInput yesNoValue={q3} updateValue={setQ3}></YesNoInput>
        </View>
      </View>

      {loading ? (
        <TouchableOpacity style={styles.formButtonDisabled}>
          <Text style={styles.loginButtonText}>Cargando...</Text>
          <ActivityIndicator color="#2196f3" />
        </TouchableOpacity>
      ) : !isFormValid() ? (
        <TouchableOpacity style={styles.formButtonDisabled}>
          <Text style={styles.loginButtonText}>Enviar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.formButton} onPress={sendFeedback}>
          <Text style={styles.loginButtonText}>Enviar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
