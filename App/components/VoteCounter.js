import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { firebase } from "../../firebase/config";

import colors from "../config/colors";
import IconButton from "./IconButton";
import Text from "./Text";
import AuthContext from "../auth/context";

function VoteCounter({ originalScore, id, voteState = 0 }) {
  const [upvote, setUpvote] = useState(voteState >= 1 ? true : false);
  const [downvote, setDownvote] = useState(voteState <= -1 ? true : false);
  const [score, setScore] = useState(originalScore);
  const { user } = useContext(AuthContext);

  const docRef = firebase.firestore().collection("events").doc(id);
  const userRef = firebase.firestore().collection("users").doc(user.id);

  function updateScore(addScore) {
    docRef
      .update({ score: firebase.firestore.FieldValue.increment(addScore) })
      .catch((error) => alert(error));
  }

  function updateVote(vote) {
    if (vote >= 1) {
      userRef
        .update({
          upvotedEvents: firebase.firestore.FieldValue.arrayUnion(id),
          downvotedEvents: firebase.firestore.FieldValue.arrayRemove(id),
        })
        .catch((error) => alert(error));
    } else if (vote === 0) {
      userRef
        .update({
          upvotedEvents: firebase.firestore.FieldValue.arrayRemove(id),
          downvotedEvents: firebase.firestore.FieldValue.arrayRemove(id),
        })
        .catch((error) => alert(error));
    } else {
      userRef
        .update({
          upvotedEvents: firebase.firestore.FieldValue.arrayRemove(id),
          downvotedEvents: firebase.firestore.FieldValue.arrayUnion(id),
        })
        .catch((error) => alert(error));
    }
  }

  function onPressUp() {
    if (downvote) {
      setScore(score + 2);
      setDownvote(!downvote);
      updateScore(2);
      updateVote(1);
    } else {
      if (!upvote) {
        setScore(score + 1);
        updateScore(1);
        updateVote(1);
      } else {
        setScore(score - 1);
        updateScore(-1);
        updateVote(0);
      }
    }
    setUpvote(!upvote);
  }

  function onPressDown() {
    if (upvote) {
      setScore(score - 2);
      setUpvote(!upvote);
      updateScore(-2);
      updateVote(-1);
    } else {
      if (!downvote) {
        setScore(score - 1);
        updateScore(-1);
        updateVote(-1);
      } else {
        setScore(score + 1);
        updateScore(1);
        updateVote(0);
      }
    }
    setDownvote(!downvote);
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
