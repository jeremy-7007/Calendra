import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";

import Text from "../Text";

function ItemCard({ startTime, endTime, description, bookmarkColor }) {
  return (
    <View style={styles.container}>
      <View style={[styles.bookmark, { backgroundColor: bookmarkColor }]} />
      <View style={styles.textContainer}>
        {endTime && (
          <Text style={styles.timeText}>
            {startTime} - {endTime}
          </Text>
        )}
        {!endTime && <Text style={styles.timeText}>{startTime}</Text>}
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
  },
  bookmark: {
    width: 20,
    height: "100%",
  },
  textContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  timeText: {
    fontSize: 20,
  },
  description: {
    fontSize: 25,
    color: colors.medium,
  },
});

export default ItemCard;
