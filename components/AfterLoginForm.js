import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "../styles";
import YesNoInput from "./YesNo";
import * as Icons from "react-native-heroicons/solid";

export default AfterLoginForm = ({ alreadySent, setAlreadySent }) => {
  const [loading, setLoading] = useState(false);
  const [q1, setQ1] = useState(null);
  const [q2, setQ2] = useState(null);

  const isFormValid = () => {
    return q1 !== null && q2 !== null;
  };

  const sendFeedback = () => {
    setLoading(true);
    console.log("FEEDBACK");
    setLoading(false);
    setAlreadySent(true);
  };

  if (alreadySent) {
    return (
      <View style={styles.card}>
        <Text>
          Gracias por tu apoyo. Haz logout y login de nuevo para poder contestar
          más veces.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text>
        Contesta este formulario para tener más logins registrados y{" "}
        <Text style={styles.headerSpecialText}>+ oportunidad de ganar</Text>.
        Apóyate del mapa de tus
        <Icons.LocationMarkerIcon
          style={styles.pinIcon}
          fill="#ea4335"
          size={18}
        />
        confiables.
      </Text>
      <View style={{ ...styles.questionRow, ...styles.mediumPaddingTop }}>
        <Text style={styles.question}>
          1. ¿Estás en un lugar previamente registrado? (casa, trabajo)
        </Text>
        <YesNoInput yesNoValue={q1} updateValue={setQ1}></YesNoInput>
      </View>
      <View style={{ ...styles.questionRow, ...styles.mediumPaddingTop }}>
        <Text style={styles.question}>
          2. ¿Estás en un edificio, entre edificios o en un sótano?
        </Text>
        <YesNoInput yesNoValue={q2} updateValue={setQ2}></YesNoInput>
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
