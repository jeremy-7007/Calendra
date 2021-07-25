import React, { useContext } from "react";
import { StyleSheet, Button } from "react-native";
import * as Yup from "yup";
import { firebase } from "../../firebase/config";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import AuthContext from "../auth/context";
import { Form, FormField } from "../components/forms";
import Screen from "../components/Screen";
import ProfileImageField from "../components/forms/ProfileImageField";
import BackButton from "../components/BackButton";
import routes from "../navigation/routes";
import { SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  groupName: Yup.string().required().label("Group name"),
});

function CreateGroupScreen({ navigation }) {
  const authContext = useContext(AuthContext);

  const groupStorageRef = firebase.storage().ref().child("images/group");

  const onCreatePress = async ({ groupName, groupImage }) => {
    const groupRef = firebase.firestore().collection("groups").doc(groupName);
    const group = await groupRef.get();

    if (group.exists) {
      alert("Group already exists");
      return;
    }

    const id = authContext.user.id;

    const imageRef = groupStorageRef.child(groupName);
    // If an image is provided, jump through hoops to set
    // groupImage to a link to the storage
    if (groupImage) {
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
              const data = {
                id: groupName,
                groupName,
                groupImage: url,
                events: [],
                mode: "Public",
                moderator: [id],
                requests: [],
              };
              groupRef
                .set(data)
                .then(() => authContext.setGroup(data))
                .catch((error) => alert(error));
            })
            .catch((error) => alert(error));
        })
        .catch((error) => alert(error));
      // If an image is not provided, set groupImage as null
    } else {
      const data = {
        id: groupName,
        groupName,
        groupImage: null,
        events: [],
        mode: "Public",
        moderator: [id],
        requests: [],
      };
      groupRef
        .set(data)
        .then(() => authContext.setGroup(data))
        .catch((error) => alert(error));
    }

    const userRef = firebase.firestore().collection("users").doc(id);
    const addGroup = await userRef
      .update({
        groups: firebase.firestore.FieldValue.arrayUnion(groupName),
      })
      .catch((error) => alert(error));

    navigation.navigate(routes.ACCOUNT);
  };

  return (
    <Screen style={styles.container}>
      <BackButton onPress={() => navigation.navigate(routes.GROUPOPTIONS)} />
      <KeyboardAwareScrollView>
        <Form
          initialValues={{
            groupName: "",
          }}
          onSubmit={(values) => onCreatePress(values)}
          validationSchema={validationSchema}
        >
          <ProfileImageField name="groupImage" />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="account-group"
            name="groupName"
            placeholder="Group name"
          />
          <SubmitButton title="Create Group" color="secondary" />
        </Form>
      </KeyboardAwareScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default CreateGroupScreen;
