import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../config/colors";

function ConfigButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Ionicons name="settings-outline" size={30} color={colors.medium} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 999,
  },
});

export default ConfigButton;
