import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { firebase } from "../../firebase/config";

import AuthContext from "../auth/context";
import Button from "../components/Button";
import ProfileImage from "../components/ProfileImage";
import Screen from "../components/Screen";
import Text from "../components/Text";

function AccountScreen() {
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
