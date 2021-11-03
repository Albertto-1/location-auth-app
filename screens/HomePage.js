import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker } from "react-native-maps";
import * as Icons from "react-native-heroicons/solid";
import styles from "../styles";
import AfterLoginForm from "../components/AfterLoginForm";

export default HomePage = ({ navigation, route }) => {
  const [userInfo, setUserInfo] = useState({});
  const [payload, setPayload] = useState(false);
  const [location, setLocation] = useState({});

  useEffect(async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    fetch("https://location-auth-10.uw.r.appspot.com/user", {
      method: "GET",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      },
    })
      .then((response) => response.json())
      .then(async (json) => {
        if (json.id) {
          setUserInfo(json);
        } else {
          console.log(json);
          // showError(json.detail);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setPayload(route.params.payload);
    setLocation(route.params.location);
  }, []);

  const getGreetings = () => {
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

    let message;
    if (trustedLocation !== null && trustedLocation) {
      message = "Estás en una ubicación confiable.";
      // In this point there is no else (TOTP path)
    } else if (newLocation) {
      if (base32secret) {
        message =
          "Se guardó tu primera ubicación confiable con éxito. Podrás iniciar sesión rápidamente siempre que estés en este lugar (casa, oficina).";
      } else {
        message =
          "¡Listo! Ya no te volveremos a pedir código cuando estés en esta ubicación. Estás en un lugar nuevo (casa, oficina...)? o fue error del sistema?";
      }
    } else {
      message = "No logramos guardar tu ubicación. " + backError;
    }

    const goToTOTPInstructions = () => {
      navigation.navigate("Instructions", {
        whichOne: "totp",
        code: payload.hasOwnProperty("base32secret")
          ? payload.base32secret
          : userInfo.totp_secret,
      });
    };

    return (
      <>
        {base32secret && (
          <View style={styles.card}>
            <Text
              style={{
                ...styles.headerSpecialText,
                ...styles.homeTitle,
                ...styles.important,
              }}
            >
              Importante:
            </Text>
            <Text
              style={{
                ...styles.headerSpecialText,
                ...styles.homeTitle,
                ...styles.important,
                ...styles.smallerText,
              }}
            >
              Esta tarjeta no se volverá a mostrar.
            </Text>
            <Text style={{ ...styles.homeTitle, ...styles.smallerText }}>
              Sigue estas{" "}
              <Text
                style={{ ...styles.headerSpecialText }}
                onPress={goToTOTPInstructions}
              >
                instrucciones {"->"}
              </Text>{" "}
              para configurar Google Authenticator.
            </Text>
          </View>
        )}
        <View style={styles.card}>
          <Text
            style={{
              ...styles.headerSpecialText,
            }}
          >
            Login info:
          </Text>
          <Text style={{ color: "grey" }}>{message}</Text>
        </View>
      </>
    );
  };

  const logout = async () => {
    await AsyncStorage.removeItem("access_token", (err) => {
      console.log(err);
    });
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: "white" }}>
        {userInfo && userInfo.name && (
          <View
            style={{ ...styles.loginContainer, ...styles.mediumPaddingTop }}
          >
            <Text style={styles.homeTitle}>¡Hola {userInfo.name}!</Text>

            {getGreetings()}

            <AfterLoginForm
              navigation={navigation}
              route={route}
              logout={logout}
            />

            {location !== null && (
              <>
                {userInfo.trusted_locations && (
                  <View style={styles.mapLegend}>
                    <Icons.LocationMarkerIcon
                      style={{
                        ...styles.smallMarginTop,
                        ...styles.smallMarginLeft,
                      }}
                      fill="#ea4335"
                      size={24}
                    />
                    <Text style={styles.mapLegendText}>
                      Tus ubicaciones confiables:{" "}
                      {userInfo.trusted_locations.length}
                    </Text>
                  </View>
                )}
                <View style={{ ...styles.loginMap, ...styles.smallMarginTop }}>
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
                  >
                    {userInfo.trusted_locations &&
                      userInfo.trusted_locations.map((t_loc) => {
                        return (
                          <Marker
                            key={t_loc.id}
                            coordinate={{
                              latitude: t_loc.lat,
                              longitude: t_loc.lon,
                            }}
                          />
                        );
                      })}
                  </MapView>
                </View>
              </>
            )}
            <View style={{ ...styles.card }}>
              <Text>
                Revisa las{" "}
                <Text
                  style={styles.homeSpecialText}
                  onPress={() => {
                    navigation.navigate("Instructions");
                  }}
                >
                  instrucciones del concurso {" ->"}
                </Text>
              </Text>
              <Text style={styles.mediumMarginTop}>
                Revisa las{" "}
                <Text
                  style={styles.homeSpecialText}
                  onPress={() => {
                    navigation.navigate("Instructions", {
                      whichOne: "totp",
                      code: userInfo.totp_secret || "null",
                    });
                  }}
                >
                  instrucciones de TOTP {" ->"}
                </Text>
              </Text>
              <Text
                style={{
                  ...styles.mediumMarginTop,
                  ...styles.homeSpecialText,
                  textAlign: "center",
                }}
                onPress={logout}
              >
                Logout
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
