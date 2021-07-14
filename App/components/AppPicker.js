import React from "react";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "./Text";

function AppPicker({
  value,
  onValueChange,
  optionList,
  pickerStyle,
  containerStyle,
  mode,
  title,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={[styles.pickerContainer, pickerStyle]}>
        <Picker
          style={styles.picker}
          mode={mode}
          dropdownIconColor="#00000000"
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
  title: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
  pickerContainer: {
    backgroundColor: colors.white,
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    width: "100%",
  },
  pickerIcon: {
    position: "absolute",
    right: 15,
  },
});

export default AppPicker;
