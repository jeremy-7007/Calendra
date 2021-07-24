import React, { useState, useContext } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { firebase } from "../../../firebase/config";

import colors from "../../config/colors";
import Text from "../Text";
import AuthContext from "../../auth/context";

function ItemCard({
  startTime,
  endTime,
  description,
  bookmarkColor,
  id,
  importedMemo,
}) {
  const [memo, setMemo] = useState(importedMemo);
  const [textChanged, setTextchanged] = useState(false);
  const { user } = useContext(AuthContext);

  const userRef = firebase.firestore().collection("users").doc(user.id);

  function handleTextChange(input) {
    setMemo(input);
    setTextchanged(true);
  }

  function onSaveMemo() {
    var userUpdate = {};
    userUpdate[`memos.${id}`] = memo;
    userRef.update(userUpdate).catch((error) => alert(error));
    setTextchanged(false);
  }

  console.log(importedMemo);

  return (
    <View style={styles.container}>
      <View style={[styles.bookmark, { backgroundColor: bookmarkColor }]} />
      <View style={styles.textContainer}>
        {endTime && (
          <Text style={styles.timeText}>
            {startTime} - {endTime}
          </Text>
        )}
        {!endTime && <Text style={styles.timeText}>{startTime}</Text>}
        <Text style={styles.description}>{description}</Text>
        <View style={styles.memoContainer}>
          <TextInput
            style={styles.memo}
            placeholder="Enter personal memo"
            defaultValue={importedMemo}
            textAlignVertical={"top"}
            multiline={true}
            onChangeText={handleTextChange}
          />
          {textChanged && (
            <TouchableOpacity onPress={onSaveMemo}>
              <Text style={styles.save}>Save</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
  },
  bookmark: {
    width: 20,
    height: "100%",
  },
  textContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  timeText: {
    fontSize: 20,
  },
  description: {
    fontSize: 25,
    color: colors.medium,
    marginBottom: 5,
  },
  memoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  memo: {
    fontSize: 20,
    width: "80%",
  },
  save: {
    fontSize: 20,
    color: colors.primary,
  },
});

export default ItemCard;
