import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import colors from "../config/colors";
import IconButton from "./IconButton";
import Text from "./Text";

function VoteCounter({ originalScore }) {
  const [vote, setVote] = useState(0);
  const [upvoteColor, setUpvoteColor] = useState(colors.medium);
  const [downvoteColor, setDownvoteColor] = useState(colors.medium);
  const [score, setScore] = useState(originalScore);

  function onPressUp() {
    if (vote === 1) {
      setVote(0);
      console.log(vote);
    } else {
      setVote(1);
      console.log(vote);
    }
    console.log(vote);
    checkState();
    console.log(vote);
  }
  function onPressDown() {
    if (vote === -1) {
      setVote(0);
      console.log(vote);
    } else {
      setVote(-1);
      console.log(vote);
    }
    console.log(vote);
    checkState();
    console.log(vote);
  }
  function checkState() {
    if (vote === 1) {
      setUpvoteColor("lightgreen");
      setDownvoteColor(colors.medium);
      setScore(originalScore + 1);
    } else if (vote === 0) {
      setUpvoteColor(colors.medium);
      setDownvoteColor(colors.medium);
      setScore(originalScore);
    } else if (vote === -1) {
      setUpvoteColor(colors.medium);
      setDownvoteColor("tomato");
      setScore(originalScore - 1);
    }
  }

  return (
    <View style={styles.container}>
      <IconButton
        icon="arrow-bold-up"
        size={35}
        color={upvoteColor}
        onPress={onPressUp}
      />
      <Text style={styles.score}>{score.toString()}</Text>
      <IconButton
        icon="arrow-bold-down"
        size={35}
        color={downvoteColor}
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
