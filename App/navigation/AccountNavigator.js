import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import ModeratorScreen from "../screens/ModeratorScreen";
import RequestScreen from "../screens/RequestScreen";
import SettingsNavigator from "./SettingsNavigator";
import GroupsNavigator from "./GroupsNavigator";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Account Screen"
      component={AccountScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Groups Navigator"
      component={GroupsNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Settings Navigator"
      component={SettingsNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Moderator"
      component={ModeratorScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Request"
      component={RequestScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
