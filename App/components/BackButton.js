import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "./Text";

function BackButton({ onPress, cancel = false }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {!cancel && (
        <MaterialIcons name="arrow-back-ios" size={24} color={colors.medium} />
      )}
      {cancel && <Text style={styles.cancel}>Cancel</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 999,
  },
  cancel: {
    color: colors.medium,
    zIndex: 999,
  },
});

export default BackButton;
