import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from '../screens/AccountScreen';
import MyGroupScreen from '../screens/MyGroupScreen';
import SettingScreen from '../screens/SettingScreen';

const Stack = createStackNavigator();

const AccountNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="My Groups"
        component={MyGroupScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ headerShown: false }}
        />
  </Stack.Navigator>
)

export default AccountNavigator;