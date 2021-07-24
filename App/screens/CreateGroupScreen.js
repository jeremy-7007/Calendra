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

  const onCreatePress = async ({ groupName, groupImage }) => {
    const groupRef = firebase.firestore().collection("groups").doc(groupName);
    const group = await groupRef.get();

    if (group.exists) {
        alert("Group already exists");
        return;
    }

    const data = {
        id: groupName,
        groupName,
        groupImage: groupImage ? groupImage : null,
        events: []
      };

    groupRef.set(data).then(() => authContext.setGroup(data)).catch((error) => alert(error));

    const id = authContext.user.id;
    const usersRef = firebase.firestore().collection("users").doc(id);
    const addGroup = await usersRef.update({
      group: firebase.firestore.FieldValue.arrayUnion(groupName)
    }).catch((error) => alert(error));

    // usersRef
    // .get()
    // .then((firestoreDocument) => {
    //   const user = firestoreDocument.data();
    //   authContext.setUser(user);
    // })
    



    navigation.navigate(routes.ACCOUNT);

  };

  return (
    <Screen style={styles.container}>
      <KeyboardAwareScrollView>
        <BackButton onPress={() => navigation.navigate(routes.ACCOUNT)} />
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
            icon="account"
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