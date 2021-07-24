import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import GroupOptionsScreen from "../screens/GroupOptionsScreen";
import MyGroupScreen from "../screens/MyGroupScreen";
import CreateGroupScreen from "../screens/CreateGroupScreen";
import SearchGroupsScreen from "../screens/SearchGroupsScreen";
import GroupScreen from "../screens/GroupScreen";

const Stack = createStackNavigator();

const GroupsNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Group Options"
      component={GroupOptionsScreen}
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
      name="Search Groups"
      component={SearchGroupsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Group Screen"
      component={GroupScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default GroupsNavigator;
