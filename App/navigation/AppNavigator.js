import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CalendarScreen from "../screens/CalendarScreen";
import CalendarScreenButton from "./CalendarScreenButton";
import routes from "./routes";
import AccountNavigator from "./AccountNavigator";
import PostsNavigator from "./PostsNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Posts"
      component={PostsNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="menu" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Calendar"
      component={CalendarScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <CalendarScreenButton
            onPress={() => navigation.navigate(routes.CALENDAR)}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="calendar-month"
            color={color}
            size={size}
          />
        ),
      })}
    />
    <Tab.Screen
      name="Account"
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
