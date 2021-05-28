import React from "react";
import { StyleSheet } from "react-native";

import Screen from "../components/Screen";
import TextInput from "../components/TextInput";

function LoginScreen(props) {
  return (
    <Screen style={styles.constainer}>
      <TextInput icon="email" placeholder="Email address" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  constainer: {
    justifyContent: "center",
  },
  textInput: {},
});

export default LoginScreen;
