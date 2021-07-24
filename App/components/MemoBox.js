import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";

import Text from "./Text";
import colors from "../config/colors";

function MemoBox({ onSave, importedMemo }) {
  const [memo, setMemo] = useState(importedMemo);
  const [textChanged, setTextChanged] = useState(false);

  function handleTextChange(input) {
    setMemo(input);
    setTextChanged(true);
  }

  function handleSave() {
    setTextChanged(false);
    onSave(memo);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.memo}
        placeholder="Enter personal memo"
        defaultValue={importedMemo}
        textAlignVertical={"top"}
        multiline={true}
        onChangeText={handleTextChange}
      />
      {textChanged && (
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.save}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
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

export default MemoBox;
