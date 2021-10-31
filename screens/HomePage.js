import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker } from "react-native-maps";
import * as Icons from "react-native-heroicons/solid";
import styles from "../styles";
import AfterLoginForm from "../components/AfterLoginForm";

export default HomePage = ({ navigation, route, location }) => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(true);

  const [alreadySent, setAlreadySent] = useState(false);

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
          console.log(json);
          setUserInfo(json);
        } else {
          showError(json.detail);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    const payload = route.params.payload;
    if (!payload.hasOwnProperty("valid_location")) {
      setLocationSuccess(false);
    }
  }, []);

  const getGreetings = () => {
    return (
      <View style={styles.card}>
        <Text style={styles.homeTitle}>
          Tu inicio de sesión con ubicación{" "}
          <Text style={styles.homeSpecialText}>
            {locationSuccess ? "fue" : "NO fue"} exitoso
          </Text>
        </Text>
      </View>
    );
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
              alreadySent={alreadySent}
              setAlreadySent={setAlreadySent}
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
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
