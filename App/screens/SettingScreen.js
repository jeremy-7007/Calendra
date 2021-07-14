import React from "react";
import { StyleSheet } from "react-native";

import BackButton from "../components/BackButton";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import Text from "../components/Text";
import Button from "../components/Button";

function SettingScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <BackButton onPress={() => navigation.navigate(routes.ACCOUNT)} />
      <Text style={styles.pageTitle}>Settings</Text>
      <Button
        title="See selected events"
        onPress={() => navigation.navigate(routes.SELECTED)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 10,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    margin: 30,
  },
});

export default SettingScreen;
