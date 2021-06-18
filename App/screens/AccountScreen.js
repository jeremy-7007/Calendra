import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";

import AuthContext from "../auth/context";
import Button from "../components/Button";
import ProfileImage from "../components/ProfileImage";
import Screen from "../components/Screen";
import Text from "../components/Text";

function AccountScreen() {
  const [imageUri, setImageUri] = useState();
  const { user, setUser } = useContext(AuthContext);

  return (
    <Screen style={styles.container}>
      <ProfileImage
        imageUri={imageUri}
        onChangeImage={setImageUri}
        icon="account"
      />
      <Text style={styles.displayName}>{user.displayName}</Text>
      <Button title="Logout" onPress={() => setUser(null)} />
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
    marginBottom: 10,
  },
});

export default AccountScreen;
