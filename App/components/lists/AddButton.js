import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";

function AddButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <MaterialCommunityIcons
        name="plus-circle"
        color={colors.secondary}
        size={45}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AddButton;
