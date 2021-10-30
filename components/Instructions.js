import React from "react";
import { View, Text } from "react-native";
import styles from "../styles";

const rewards = [
  {
    id: "places",
    title: "Usuario con mayor número de ubicaciones confiables.",
  },
  {
    id: "logins",
    title: "Usuario con mayor número de logins.",
  },
  {
    id: "referrals",
    title: "Usuario con mayor número de referidos.",
  },
];

export default Instructions = () => {
  return (
    <View>
      <Text style={styles.headerText}>
        En cada inicio de sesión{" "}
        <Text style={styles.headerSpecialText}>Location Auth</Text> comparará tu
        ubicación contra un grupo de ubicaciones en las que confias. Si estás en
        una ubicación confiable, podrás iniciar sesión utilizando tu ubicación,
        si no, tendrás que usar una TOTP. Al iniciar sesión con este segundo
        método, tu ubicación se guardará como confiable y podrás iniciar sesión
        de forma más rápida la siguiente vez que inicies sesión en esa
        ubicación.
      </Text>
      <Text style={styles.headerText}>
        Los usuarios que cumplan las siguientes características ganarán un
        premio de $$$$.
      </Text>
      {rewards.map((reward) => {
        return <Text key={reward.id}> * {reward.title}</Text>;
      })}
      <Text style={styles.headerText}>
        Para referir a alguien compártele el archivo .apk y dile que ingrese el
        email con el que te registraste en el campo de "Referido por".
      </Text>
      <Text style={styles.headerText}>
        Los premios se pagarán el último día de noviembre 2021. Cualquier premio
        puede cancelarse si tu dispositivo tiene location mock activado.
      </Text>
    </View>
  );
};
