import React, { useContext, useState } from "react";
import { StyleSheet, Platform } from "react-native";
import * as Yup from "yup";
import { firebase } from "../../firebase/config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import BackButton from "../components/BackButton";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import Text from "../components/Text";
import { Form, FormField, SubmitButton } from "../components/forms";
import ProfileImageField from "../components/forms/ProfileImageField";
import ActivityIndicator from "../components/ActivityIndicator";
import AuthContext from "../auth/context";

const validationSchema = Yup.object().shape({
  displayName: Yup.string().label("Display name"),
});

function EditProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(AuthContext);

  const usersRef = firebase.firestore().collection("users");
  const profileStorageRef = firebase.storage().ref().child("images/profile");

  async function onSubmit({ displayName, profileImage }) {
    setLoading(true);

    const uid = user.id;

    if (displayName) {
      usersRef
        .doc(uid)
        .update("displayName", displayName)
        .catch((error) => alert(error));
    }

    if (profileImage) {
      const imageRef = profileStorageRef.child(uid);
      const uploadUri =
        Platform.OS === "ios"
          ? profileImage.replace("file://", "")
          : profileImage;
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uploadUri, true);
        xhr.send(null);
      });
      await imageRef
        .put(blob, { contentType: "image/jpeg" })
        .then((snapshot) => {
          console.log("Uploaded image!");
          blob.close();
        })
        .then(() => {
          imageRef
            .getDownloadURL()
            .then((url) => {
              usersRef
                .doc(uid)
                .update("profileImage", url)
                .catch((error) => alert(error));
            })
            .catch((error) => alert(error));
        })
        .catch((error) => alert(error));
    }

    usersRef
      .doc(uid)
      .get()
      .then((firestoreDocument) => {
        const user = firestoreDocument.data();
        setUser(user);
      })
      .catch((error) => alert(error));

    setLoading(false);

    navigation.navigate(routes.SETTING);
  }

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        <KeyboardAwareScrollView>
          <BackButton onPress={() => navigation.navigate(routes.SETTING)} />
          <Text style={styles.pageTitle}>Edit Profile</Text>
          <Form
            initialValues={{
              displayName: "",
            }}
            onSubmit={(values) => onSubmit(values)}
            validationSchema={validationSchema}
          >
            <ProfileImageField name="profileImage" />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="account"
              name="displayName"
              placeholder="Display name"
            />
            <SubmitButton title="Edit" color="primary" />
          </Form>
        </KeyboardAwareScrollView>
      </Screen>
    </>
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

export default EditProfileScreen;
