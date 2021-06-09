import React from "react";

import { StyleSheet } from "react-native";
import ProfileImageField from "./App/components/forms/ProfileImageField";
import RegisterScreen from "./App/screens/RegisterScreen";

export default function App() {
  return <RegisterScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
