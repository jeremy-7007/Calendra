import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SettingScreen from "../screens/SettingScreen";
import SelectedScreen from "../screens/SelectedScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import IgnoredScreen from "../screens/IgnoredScreen";

const Stack = createStackNavigator();

const SettingsNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Settings Screen"
      component={SettingScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Selected"
      component={SelectedScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Ignored"
      component={IgnoredScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Edit Profile"
      component={EditProfileScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default SettingsNavigator;
