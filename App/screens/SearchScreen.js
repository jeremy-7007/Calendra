import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import { Form, FormField } from "../components/forms";
import BackButton from "../components/BackButton";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import AuthContext from "../auth/context";
import { firebase } from "../../firebase/config";
import { SubmitButton } from "../components/forms";

function SearchScreen({ navigation }) {
  const authContext = useContext(AuthContext);

  const onSearchPress = async ({ groupName }) => {
    const groupRef = firebase.firestore().collection("groups").doc(groupName);
    const group = await groupRef.get();

    if (!group.exists) {
      alert("Group does not exist!");
      return;
    }

    let data = {};

    await Promise.all(
      groupRef
        .get()
        .then(async (doc) => {
          const info = await doc.data();
          // data.id = await info.id;
          // data.groupName = await info.groupName;
          // data.groupImage = await info.groupImage;
          // //console.log(info.groupImage);
          // data.events = await info.events;
          // //console.log(info.events);
          data = info;
          authContext.setGroup(info.id);
          console.log(info.id);
          navigation.navigate(routes.GROUP);
        })
        .catch((error) => alert(error))
    );
    //console.log(data);

    //navigation.navigate(routes.ACCOUNT);
  };

  return (
    <Screen style={styles.container}>
      <KeyboardAwareScrollView>
        <BackButton onPress={() => navigation.navigate(routes.ACCOUNT)} />
        <View style={{ paddingTop: 100 }}>
          <Form
            initialValues={{
              groupName: "",
            }}
            onSubmit={(values) => onSearchPress(values)}
            //validationSchema={validationSchema}
          >
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="account"
              name="groupName"
              placeholder="Group name"
            />
            <View style={{ height: 50 }} />
            <SubmitButton title="Search Group" color="secondary" />
          </Form>
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default SearchScreen;
