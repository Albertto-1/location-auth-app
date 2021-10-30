import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{
            title: "Location Auth",
            ...headerExtraOptions,
          }}
        />
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
