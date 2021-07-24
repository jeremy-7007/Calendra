import React from "react";
import { StyleSheet } from "react-native";

import BackButton from "../components/BackButton";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import Text from "../components/Text";
import Button from "../components/Button";

function GroupOptionsScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <BackButton onPress={() => navigation.navigate(routes.ACCOUNT)} />
      <Text style={styles.pageTitle}>Group Options</Text>
      <Button
        title="My Groups"
        onPress={() => navigation.navigate(routes.MYGROUPS)}
      />
      <Button
        title="New Group"
        onPress={() => navigation.navigate(routes.CREATEGROUP)}
      />
      <Button
        title="Search Groups"
        onPress={() => navigation.navigate(routes.SEARCHGROUPS)}
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

export default GroupOptionsScreen;
