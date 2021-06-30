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

  const changeImage = (newImage) => {
    const uid = user.id;
    const usersRef = firebase.firestore().collection("users");
    usersRef
      .doc(uid)
      .update("profileImage", newImage)
      .catch((error) => alert(error));
    usersRef
      .doc(uid)
      .get()
      .then((firestoreDocument) => {
        const user = firestoreDocument.data();
        setUser(user);
      })
      .catch((error) => alert(error));
  };

  return (
    <Screen style={styles.container}>
      <ProfileImage
        imageUri={user.profileImage}
        onChangeImage={changeImage}
        icon="account"
      />
      <Text style={styles.displayName}>{user.displayName}</Text>
      <Button
        title="My Groups"
        onPress={() => navigation.navigate(routes.MYGROUPS)}
      />
      <Button
        title="New Group"
        onPress={() => navigation.navigate(routes.SEARCH)}
      />
      <Button title="Search Groups" />
      <Button
        title="Settings"
        onPress={() => navigation.navigate(routes.SETTING)}
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
