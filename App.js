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
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          timeInterval: 500,
          distanceInterval: 0,
        },
        (location) => {
          setLocation(location);
        }
      );
      // authServer
      //   .get("user", {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json",
      //       Authorization:
      //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZXR1c3NAZ21haWwuY29tIiwidmFsaWRfbG9jYXRpb24iOnRydWUsImJhc2UzMnNlY3JldCI6Ik9CUVhHNDNYTjVaR0k9PT0iLCJleHAiOjE2MzU1ODE4OTF9.zNn_wBMr-wmoFiVXw27aGWmBRvonpXmb8_GVahRvOmE",
      //     },
      //   })
      //   .then((response) => {
      //     console.log(response.data);
      //   })
      //   .catch((error) => {
      //     console.log("ERROR PRRO");
      //     console.log(error);
      //   });
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{
            title: "Location Auth",
            ...headerExtraOptions,
          }}
        >
          {(props) => <LoginPage {...props} location={location} />}
        </Stack.Screen>
        <Stack.Screen
          name="Registration"
          component={RegistrationPage}
          options={{
            title: "Crea tu cuenta",
            ...headerExtraOptions,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            title: "Location Auth",
            ...headerExtraOptions,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
