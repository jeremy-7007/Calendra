import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../config/colors";

function BackButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <MaterialIcons name="arrow-back-ios" size={24} color={colors.medium} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 15,
    left: 15,
  },
});

export default BackButton;
