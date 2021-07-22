import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import moment from "moment";
import { firebase } from "../../../firebase/config";
import * as Notifications from "expo-notifications";

import colors from "../../config/colors";
import Text from "../Text";
import VoteCounter from "../VoteCounter";
import AddButton from "./AddButton";
import IgnoreButton from "./IgnoreButton";
import AuthContext from "../../auth/context";

function ListItem({
  title,
  dateTime,
  score,
  id,
  onInvisible,
  voteState,
  onAdd,
  selected = false,
  ignored = false,
}) {
  const { user } = useContext(AuthContext);

  const userRef = firebase.firestore().collection("users").doc(user.id);

  const notificationContent = { title: "Event reminder", body: title };

  // async function checkAdd() {
  //   var result = false;
  //   await Promise.all(
  //     userRef.get().then(async (userDoc) => {
  //       const data = await userDoc.data();
  //       const listSelectedEvents = await data.selectedEvents;
  //       if (listSelectedEvents == null) return;
  //       await listSelectedEvents.map((event) => {
  //         console.log(event);
  //         if (event == id) result = true;
  //       });
  //     })
  //   );
  //   console.log(result);
  //   return result;
  // }

  function handleAdd() {
    userRef
      .update({
        selectedEvents: firebase.firestore.FieldValue.arrayUnion(id),
        ignoredEvents: firebase.firestore.FieldValue.arrayRemove(id),
      })
      .catch((error) => alert(error));
    Notifications.scheduleNotificationAsync({
      content: notificationContent,
      trigger: dateTime,
    });
    onInvisible();
    onAdd();
    // setVisible(false);
  }

  function handleIgnore() {
    userRef
      .update({
        selectedEvents: firebase.firestore.FieldValue.arrayRemove(id),
        ignoredEvents: firebase.firestore.FieldValue.arrayUnion(id),
      })
      .catch((error) => alert(error));
    onInvisible();
    onAdd();
  }

  if (true) {
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.date}>
            {moment(dateTime).format("DD MMMM YYYY")}
          </Text>
          <Text style={styles.time}>{moment(dateTime).format("hh : mm")}</Text>
          <Text style={styles.title} numberOfLines={3}>
            {title}
          </Text>
          <VoteCounter originalScore={score} id={id} voteState={voteState} />
        </View>
        <View style={styles.buttonContainer}>
          {!selected && <AddButton onPress={handleAdd} />}
          {!ignored && <IgnoreButton onPress={handleIgnore} />}
        </View>
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: colors.silver,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoContainer: {},
  buttonContainer: {
    justifyContent: "space-between",
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
