import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { firebase } from "../../firebase/config";

import AuthContext from "../auth/context";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import Button from "../components/Button";
import Picker from "../components/AppPicker";
import colors from "../config/colors";
import BackButton from "../components/BackButton";

function ModeratorScreen({ navigation, route }) {
  const { group, onPress } = route.params;
  const { user } = useContext(AuthContext);
  const [mode, setMode] = useState("");
  const [numOfMods, setNumOfMods] = useState(-1);

  const groupRef = firebase
    .firestore()
    .collection("groups")
    .doc(group.groupName);
  const userRef = firebase.firestore().collection("users").doc(user.id);

  function fetchMode() {
    groupRef
      .get()
      .then((groupDoc) => {
        const data = groupDoc.data();
        setMode(data.mode);
        setNumOfMods(data.moderator.length);
      })
      .catch((error) => alert(error));
  }

  function GroupSetting() {}

  function QuitModerating() {
    if (numOfMods == 1) {
      alert(
        "You cannot quit your moderator role since you are the last moderator of this group"
      );
    } else {
      groupRef
        .update({
          moderator: firebase.firestore.FieldValue.arrayRemove(user.id),
          members: firebase.firestore.FieldValue.arrayUnion(user.id),
        })
        .then(() => {
          //onPress();
          navigation.navigate(routes.GROUP, { group: group, mod: false });
        })
        .catch((error) => alert(error));
    }
  }

  const onPickerChange = (itemValue) => {
    setMode(itemValue);
    groupRef
      .update({
        mode: itemValue,
      })
      .catch((error) => alert(error));
  };

  const listOfModes = ["Public", "Private"];

  useEffect(fetchMode, []);

  return (
    <Screen style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <Text style={styles.pageTitle}>Moderator Options</Text>
      {mode !== "" && (
        <View style={styles.headerBar}>
          <Text style={styles.privacy}>{"Privacy Mode"}</Text>
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
        onPress={() => navigation.navigate(routes.REQUEST, { group })}
      />
      <Button
        title="Add Moderators"
        onPress={() => {
          navigation.navigate(routes.ADDMOD, { group });
        }}
      />
      <Button
        title="Members"
        onPress={() => {
          navigation.navigate(routes.MEMBER, { group });
        }}
      />
      <Button title="Quit Moderating" onPress={QuitModerating} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.light,
  },
  headerBar: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  privacy: {
    fontSize: 20,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    margin: 30,
  },
});

export default ModeratorScreen;
