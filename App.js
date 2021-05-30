import React from "react";

import { StyleSheet } from "react-native";
import LoginScreen from "./App/screens/LoginScreen";
import PostsScreen from "./App/screens/PostsScreen";
import WelcomeScreen from "./App/screens/WelcomeScreen";

export default function App() {
  return <PostsScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
