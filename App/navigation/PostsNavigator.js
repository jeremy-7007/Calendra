import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PostsScreen from "../screens/PostsScreen";
import AddPostScreen from "../screens/AddPostScreen";

const Stack = createStackNavigator();

const PostsNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Posts"
      component={PostsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="AddPost"
      component={AddPostScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default PostsNavigator;
