import React, { useContext, useState } from "react";
import { StyleSheet, Button, Platform } from "react-native";
import * as Yup from "yup";
import { firebase } from "../../firebase/config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import AuthContext from "../auth/context";
import { Form, FormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import ProfileImageField from "../components/forms/ProfileImageField";
import BackButton from "../components/BackButton";
import routes from "../navigation/routes";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  displayName: Yup.string().required().label("Display name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

function RegisterScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const usersRef = firebase.firestore().collection("users");
  const profileStorageRef = firebase.storage().ref().child("images/profile");

  const onRegisterPress = async ({
    email,
    password,
    displayName,
    profileImage,
  }) => {
    setLoading(true);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (response) => {
        const uid = await response.user.uid;
        const imageRef = profileStorageRef.child(uid);
        // If an image is provided, jump through hoops to set
        // profileImage to a link to the storage
        if (profileImage) {
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
                  const data = {
                    id: uid,
                    email,
                    displayName,
                    profileImage: url,
                    groups: [],
                    selectedEvents: [],
                    ignoredEvents: [],
                    upvotedEvents: [],
                    downvotedEvents: [],
                    notificationIds: {},
                    memos: {},
                  };
                  usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => authContext.setUser(data))
                    .catch((error) => alert(error));
                })
                .catch((error) => alert(error));
            })
            .catch((error) => alert(error));
          // If an image is not provided, set profileImage as null
        } else {
          const data = {
            id: uid,
            email,
            displayName,
            profileImage: null,
            groups: [],
            selectedEvents: [],
            ignoredEvents: [],
            upvotedEvents: [],
            downvotedEvents: [],
            notificationIds: {},
            memos: {},
          };
          usersRef
            .doc(uid)
            .set(data)
            .then(() => authContext.setUser(data))
            .catch((error) => alert(error));
        }
      })
      .catch((error) => alert(error));

    setLoading(false);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        <KeyboardAwareScrollView>
          <BackButton onPress={() => navigation.navigate(routes.WELCOME)} />
          <Form
            initialValues={{
              displayName: "",
              email: "",
              password: "",
              passwordConfirmation: "",
            }}
            onSubmit={(values) => onRegisterPress(values)}
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
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="password"
              placeholder="Password"
              secureTextEntry
              textContentType="password"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock-outline"
              name="passwordConfirmation"
              placeholder="Repeat password"
              secureTextEntry
              textContentType="password"
            />
            <SubmitButton title="Register" color="secondary" />
          </Form>
        </KeyboardAwareScrollView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
