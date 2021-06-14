import React from "react";
import { StyleSheet } from "react-native";
import Button from "../components/Button";
import ProfileImageField from "../components/forms/ProfileImageField";
import Screen from "../components/Screen";
import Text from "../components/Text";

function AccountScreen({ imageUri, displayName }) {
  return (
    <Screen style={styles.container}>
      <ProfileImageField imageUri={imageUri} icon="account" />
      <Text>{displayName}</Text>
      <Button title="Logout" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default AccountScreen;
