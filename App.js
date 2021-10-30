import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Location from "expo-location";

import LoginPage from "./screens/LoginPage";
import RegistrationPage from "./screens/RegistrationPage";
import HomePage from "./screens/HomePage";
import ApplicationHeader from "./components/ApplicationHeader";

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

  useEffect(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let locs = [];

    const locationWatcher = Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 500,
        distanceInterval: 0,
      },
      (newLoc) => {
        if (newLoc !== null) {
          locs.push(newLoc);
          if (locs.length > 20) {
            locs = locs.slice(locs.length - 10);
          }
          setLocation(newLoc);
          setLocations(locs);
        }
      }
    );
    return () => {
      locationWatcher.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
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
          component={HomePage}
          options={{
            title: "Location Auth",
            ...headerExtraOptions,
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
