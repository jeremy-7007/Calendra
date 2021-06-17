import React, { useState } from "react";
import { StyleSheet } from "react-native";

import Button from "../components/Button";
import ProfileImage from "../components/ProfileImage";
import Screen from "../components/Screen";
import Text from "../components/Text";

function AccountScreen() {
  const [imageUri, setImageUri] = useState();
  const [displayName, setDisplayName] = useState("John Doe");

  return (
    <Screen style={styles.container}>
      <ProfileImage
        imageUri={imageUri}
        onChangeImage={setImageUri}
        icon="account"
      />
      <Text style={styles.displayName}>{displayName}</Text>
      <Button title="Logout" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  displayName: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default AccountScreen;
