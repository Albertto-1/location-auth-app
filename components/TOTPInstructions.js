import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles";
import * as Icons from "react-native-heroicons/solid";
import * as Clipboard from "expo-clipboard";
import { showError } from "../utils/toast";

export default TOTPInstructions = ({ totpSecret }) => {
  return (
    <View>
      <Text style={{ ...styles.headerText, ...styles.instructions }}>
        TOTP es el método de respaldo por si no puedes iniciar sesión con tu
        ubicación. Es importante que configures tu TOTP para que no pierdas
        acceso a tu cuenta y con ello la posibilidad de seguir sumando logins
        para ganarte un premio.
      </Text>
      <Text style={styles.loginTitle}>
        Guarda tu TOTP en Google Authenticator:
      </Text>
      <Text style={{ ...styles.headerText, ...styles.instructions }}>
        <Text style={{ ...styles.headerSpecialText, ...styles.important }}>
          1.{" "}
        </Text>{" "}
        Si no tienes la app, descárgala.
      </Text>
      <Text style={{ ...styles.headerText, ...styles.instructions }}>
        <Text style={{ ...styles.headerSpecialText, ...styles.important }}>
          2.{" "}
        </Text>{" "}
        Entra a la app y da clic en los tres puntos de la esquina superior
        derecha.
      </Text>
      <Text style={{ ...styles.headerText, ...styles.instructions }}>
        <Text style={{ ...styles.headerSpecialText, ...styles.important }}>
          3.{" "}
        </Text>{" "}
        Da clic en "+ Agregar cuenta"
      </Text>
      <Text style={{ ...styles.headerText, ...styles.instructions }}>
        <Text style={{ ...styles.headerSpecialText, ...styles.important }}>
          4.{" "}
        </Text>{" "}
        Da clic en "Otra cuenta ..."
      </Text>
      <Text style={{ ...styles.headerText, ...styles.instructions }}>
        <Text style={{ ...styles.headerSpecialText, ...styles.important }}>
          5.{" "}
        </Text>{" "}
        En la parte de abajo de la pantalla da clic en "OR ENTER CODE MANUALLY"
      </Text>
      <Text style={{ ...styles.headerText, ...styles.instructions }}>
        <Text style={{ ...styles.headerSpecialText, ...styles.important }}>
          6.{" "}
        </Text>{" "}
        En "Nombre de la cuenta" pon lo que quieras. "Location Auth"
        recomendado.
      </Text>
      <Text style={{ ...styles.headerText, ...styles.instructions }}>
        <Text style={{ ...styles.headerSpecialText, ...styles.important }}>
          7.{" "}
        </Text>{" "}
        En "Clave secreta" copia y pega el código de abajo.
      </Text>
      <Text style={{ ...styles.headerText, ...styles.instructions }}>
        <Text style={{ ...styles.headerSpecialText, ...styles.important }}>
          8.{" "}
        </Text>{" "}
        Da clic en "FINALIZAR"
      </Text>

      <TouchableOpacity
        style={styles.clipboard}
        onPress={() => {
          Clipboard.setString(totpSecret.toString());
          showError("Código copiado");
        }}
      >
        <Text style={styles.clipboardCode}>{totpSecret}</Text>
        <Icons.ClipboardIcon fill="#bbbbbb" size={36} />
      </TouchableOpacity>
    </View>
  );
};
