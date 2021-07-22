import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import MyGroupScreen from "../screens/MyGroupScreen";
import SettingScreen from "../screens/SettingScreen";
import SearchScreen from "../screens/SearchScreen";
import CreateGroupScreen from "../screens/CreateGroupScreen";
import SelectedScreen from "../screens/SelectedScreen";
import GroupScreen from "../screens/GroupScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Account Screen"
      component={AccountScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="My Groups"
      component={MyGroupScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="New Group"
      component={CreateGroupScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Search"
      component={SearchScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Setting"
      component={SettingScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Group Screen"
      component={GroupScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Selected"
      component={SelectedScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Edit Profile"
      component={EditProfileScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
