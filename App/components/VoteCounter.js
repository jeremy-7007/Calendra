import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import colors from "../config/colors";
import IconButton from "./IconButton";
import Text from "./Text";

function VoteCounter({ originalScore }) {
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [score, setScore] = useState(originalScore);

  function onPressUp() {
    if (!upvote) setScore(score + 1);
    else setScore(score - 1);
    setUpvote(!upvote);
    if (downvote) {
      setScore(score + 2);
      setDownvote(!downvote);
    }
  }

  function onPressDown() {
    if (!downvote) setScore(score - 1);
    else setScore(score + 1);
    setDownvote(!downvote);
    if (upvote) {
      setScore(score - 2);
      setUpvote(!upvote);
    }
  }

  return (
    <View style={styles.container}>
      <IconButton
        icon="arrow-bold-up"
        size={35}
        color={upvote ? colors.upvote : colors.medium}
        onPress={onPressUp}
      />
      <Text style={styles.score}>{score.toString()}</Text>
      <IconButton
        icon="arrow-bold-down"
        size={35}
        color={downvote ? colors.downvote : colors.medium}
        onPress={onPressDown}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flexDirection: "row",
  },
  score: {
    fontSize: 25,
    paddingHorizontal: 10,
  },
});

export default VoteCounter;
