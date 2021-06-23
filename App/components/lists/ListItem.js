import React from "react";
import { View, StyleSheet } from "react-native";
import moment from "moment";

import colors from "../../config/colors";
import Text from "../Text";
import VoteCounter from "../VoteCounter";

function ListItem({ title, date, time, score, id }) {
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{moment(date).format("DD MMMM YYYY")}</Text>
      <Text style={styles.time}>{moment(time).format("hh : mm")}</Text>
      <Text style={styles.title} numberOfLines={3}>
        {title}
      </Text>
      <VoteCounter originalScore={score} id={id} />
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
    fontWeight: "bold",
  },
  date: {
    fontSize: 20,
  },
  time: {
    fontSize: 20,
    paddingBottom: 10,
  },
});

export default ListItem;
