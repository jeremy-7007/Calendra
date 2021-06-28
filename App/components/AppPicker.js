import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

function AppPicker({ value, onValueChange, optionList }) {
  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={value}
        onValueChange={onValueChange}
      >
        {optionList.map((name, index) => {
          return <Picker.Item label={name} value={name} key={index} />;
        })}
      </Picker>
      <MaterialCommunityIcons
        name="chevron-down"
        size={35}
        color={colors.medium}
        style={styles.pickerIcon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: "85%",
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    backgroundColor: colors.white,
    width: "100%",
  },
  pickerIcon: {
    position: "absolute",
    right: 15,
  },
});

export default AppPicker;
