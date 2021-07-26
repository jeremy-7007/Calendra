import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import GroupOptionsScreen from "../screens/GroupOptionsScreen";
import MyGroupScreen from "../screens/MyGroupScreen";
import CreateGroupScreen from "../screens/CreateGroupScreen";
import SearchGroupsScreen from "../screens/SearchGroupsScreen";
import GroupScreen from "../screens/GroupScreen";
import AddModeratorScreen from "../screens/AddModeratorScreen";
import MemberScreen from "../screens/MemberScreen";
import ModeratorScreen from "../screens/ModeratorScreen";
import RequestScreen from "../screens/RequestScreen";
import EditGroupScreen from "../screens/EditGroupScreen";

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
    <Stack.Screen
      name="Add Moderator"
      component={AddModeratorScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Member"
      component={MemberScreen}
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
    <Stack.Screen
      name="Edit Group"
      component={EditGroupScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default GroupsNavigator;
