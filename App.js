import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Location from "expo-location";

import LoginPage from "./screens/LoginPage";
import RegistrationPage from "./screens/RegistrationPage";
import HomePage from "./screens/HomePage";
import TOTPPage from "./screens/TOTPPage";
import ApplicationHeader from "./components/ApplicationHeader";
import InstructionsPage from "./screens/InstructionsPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

const headerExtraOptions = {
  headerTitle: (props) => <ApplicationHeader {...props} />,
  headerStyle: {
    backgroundColor: "#eeeeee",
  },
  headerTitleStyle: {
    fontWeight: "bold",
  },
};

export default function App() {
  const [location, setLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Instructions");

  useEffect(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let locs = [];

    const positionWatcher = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 500,
        distanceInterval: 0,
      },
      (newLoc) => {
        if (newLoc !== null && newLoc.coords.accuracy < 50) {
          locs.push(newLoc);
          if (locs.length > 10) {
            locs = locs.slice(locs.length - 10);
          }
          setLocation({ ...newLoc });
          setLocations([...locs]);
        }
      }
    );

    // await AsyncStorage.setItem("email_address", "alberttomarvel@gmail.com");
    await AsyncStorage.removeItem("email_address");
    if ((await AsyncStorage.getItem("email_address")) !== null) {
      setInitialRoute("Login");
    }
    setLoading(false);

    return () => {
      positionWatcher.remove();
    };
  }, []);

  if (loading) return <Text>Cargando...</Text>;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Login"
          options={{
            title: "Location Auth",
            ...headerExtraOptions,
          }}
        >
          {(props) => (
            <LoginPage {...props} location={location} locations={locations} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Registration"
          options={{
            title: "Crea tu cuenta",
            ...headerExtraOptions,
            animation: "slide_from_right",
          }}
        >
          {(props) => <RegistrationPage {...props} locations={locations} />}
        </Stack.Screen>
        <Stack.Screen
          name="Home"
          options={{
            title: "Location Auth",
            ...headerExtraOptions,
            headerBackVisible: false,
          }}
        >
          {(props) => (
            <HomePage {...props} location={location} locations={locations} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="TOTP"
          options={{
            title: "Login con TOTP",
            ...headerExtraOptions,
            animation: "slide_from_right",
          }}
        >
          {(props) => <TOTPPage {...props} locations={locations} />}
        </Stack.Screen>
        <Stack.Screen
          name="Instructions"
          options={{
            title: "Instrucciones",
            ...headerExtraOptions,
            animation: "slide_from_right",
          }}
        >
          {(props) => <InstructionsPage {...props} doShowRegistration />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
