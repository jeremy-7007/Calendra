import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../../config/colors";
import Text from "../Text";
import VoteCounter from "../VoteCounter";

function ListItem({ title, date, score }) {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.title} numberOfLines={3}>
        {title}
      </Text>
      <VoteCounter originalScore={score} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: colors.silver,
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
  },
  date: {
    fontSize: 20,
    paddingBottom: 10,
  },
  voteContainer: {
    flexDirection: "row",
  },
});

export default ListItem;
