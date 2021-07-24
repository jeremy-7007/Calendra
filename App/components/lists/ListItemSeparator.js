import React from "react";
import { StyleSheet, View } from "react-native";

import colors from "../../config/colors";

function ListItemSeparator({ color = colors.light }) {
  return <View style={[styles.separator, { backgroundColor: color }]} />;
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 1,
    marginVertical: 10,
  },
});

export default ListItemSeparator;
