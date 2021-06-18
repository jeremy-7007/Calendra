import React from "react";
import { View, StyleSheet } from "react-native";

import Text from "../Text";

function EmptyDay(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>No event on this day</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  message: {
    fontSize: 25,
  },
});

export default EmptyDay;
