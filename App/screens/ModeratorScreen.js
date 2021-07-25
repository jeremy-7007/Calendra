import React, { useContext, useState } from "react";
import { StyleSheet, Platform, View, Text } from "react-native";
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
import Button from "../components/Button";
import Picker from "../components/AppPicker";
import colors from "../config/colors";

function ModeratorScreen({ navigation, route }) {
  const { group } = route.params;
  const { user } = useContext(AuthContext);
  const [mode, setMode] = useState("");
  // const [status, setStatus] = useState(false);

  const groupRef = firebase.firestore().collection("groups").doc(group);
  const userRef = firebase.firestore().collection("users").doc(user.id);

  Promise.all(
    groupRef.get().then((groupDoc) => {
      const data = groupDoc.data();
      setMode(data.mode);
    })
  );

  function GroupSetting() {}

  function QuitModerating() {
    groupRef
      .update({
        moderator: firebase.firestore.FieldValue.arrayRemove(user.id),
      })
      .then(() => navigation.navigate(routes.GROUP, { group: group }))
      .catch((error) => alert(error));
  }

  const onPickerChange = (itemValue) => {
    setMode(itemValue);
    groupRef.update({
      mode: itemValue,
    });
  };

  const listOfModes = ["Public", "Private"];

  return (
    <Screen style={styles.container}>
      {mode != "" && (
        <View style={styles.headerBar}>
          <Text style={colors.medium}>{"Privacy Mode"}</Text>
          <Picker
            value={mode}
            onValueChange={onPickerChange}
            optionList={listOfModes}
            containerStyle={{ width: "50%" }}
            mode="dropdown"
          />
        </View>
      )}
      <Button
        title="Requests"
        onPress={() => navigation.navigate(routes.REQUEST, { group: group })}
      />
      <Button
        title="Add Moderators"
        onPress={() => {
          navigation.navigate(routes.ADDMOD, { group: group });
        }}
      />
      <Button title="Quit Moderating" onPress={QuitModerating} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "flex-end",
    backgroundColor: colors.light,
  },
  headerBar: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ModeratorScreen;
