import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { firebase } from "../../firebase/config";

import AuthContext from "../auth/context";
import Button from "../components/Button";
import ProfileImage from "../components/ProfileImage";
import Screen from "../components/Screen";
import Text from "../components/Text";
import routes from "../navigation/routes";

function AccountScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext);

  return (
    <Screen style={styles.container}>
      <ProfileImage
        imageUri={user.profileImage}
        onPress={() => {}}
        icon="account"
      />
      <Text style={styles.displayName}>{user.displayName}</Text>
      <Button
        title="Group Options"
        onPress={() => navigation.navigate(routes.GROUPSNAV)}
      />
      <Button
        title="Settings"
        onPress={() => navigation.navigate(routes.SETTINGNAV)}
      />
      <Button
        title="Logout"
        onPress={() => {
          setUser(null);
          firebase.auth().signOut();
        }}
      />
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
