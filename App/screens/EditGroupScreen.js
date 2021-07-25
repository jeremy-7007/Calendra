import React, { useState } from "react";
import { StyleSheet, Platform } from "react-native";
import { firebase } from "../../firebase/config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import BackButton from "../components/BackButton";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import Text from "../components/Text";
import { Form, SubmitButton } from "../components/forms";
import ProfileImageField from "../components/forms/ProfileImageField";
import ActivityIndicator from "../components/ActivityIndicator";

function EditGroupScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const { group } = route.params;

  const groupRef = firebase
    .firestore()
    .collection("groups")
    .doc(group.groupName);
  const groupStorageRef = firebase.storage().ref().child("images/group");

  async function onSubmit({ groupImage }) {
    setLoading(true);

    if (groupImage) {
      const imageRef = groupStorageRef.child(group.groupName);
      const uploadUri =
        Platform.OS === "ios" ? groupImage.replace("file://", "") : groupImage;
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
              groupRef.update("groupImage", url).catch((error) => alert(error));
            })
            .catch((error) => alert(error));
        })
        .catch((error) => alert(error));
    }

    setLoading(false);
    navigation.navigate(routes.GROUP, { group });
  }

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.screen}>
        <BackButton onPress={() => navigation.goBack()} />
        <KeyboardAwareScrollView>
          <Text style={styles.pageTitle}>Edit Group Image</Text>
          <Form onSubmit={(values) => onSubmit(values)} initialValues={{}}>
            <ProfileImageField name="groupImage" />
            <SubmitButton title="Edit" color="secondary" />
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

export default EditGroupScreen;
