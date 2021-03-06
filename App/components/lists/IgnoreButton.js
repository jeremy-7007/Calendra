import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";

function IgnoreButton({ onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <MaterialCommunityIcons name="eye-off" color={colors.primary} size={45} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default IgnoreButton;
