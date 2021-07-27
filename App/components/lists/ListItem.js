import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import moment from "moment";
import { firebase } from "../../../firebase/config";
import * as Notifications from "expo-notifications";
import { Swipeable } from "react-native-gesture-handler";

import colors from "../../config/colors";
import Text from "../Text";
import VoteCounter from "../VoteCounter";
import AddButton from "./AddButton";
import IgnoreButton from "./IgnoreButton";
import AuthContext from "../../auth/context";
import ListItemDeleteAction from "./ListItemDeleteAction";

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
  moderator = false,
  groupName,
  inGroupScreen = false,
}) {
  const { user } = useContext(AuthContext);
  const [selectedState, setSelectedState] = useState(selected);
  const [ignoredState, setIgnoredState] = useState(ignored);

  const userRef = firebase.firestore().collection("users").doc(user.id);
  const groupRef = firebase.firestore().collection("groups").doc(groupName);
  const eventRef = firebase.firestore().collection("events").doc(id);

  const notificationContent = { title: "Event reminder", body: title };

  async function handleAdd() {
    const identifier = await Notifications.scheduleNotificationAsync({
      content: notificationContent,
      trigger: dateTime,
    });
    var userUpdate = {
      selectedEvents: firebase.firestore.FieldValue.arrayUnion(id),
      ignoredEvents: firebase.firestore.FieldValue.arrayRemove(id),
    };
    userUpdate[`notificationIds.${id}`] = [identifier, "At event time"];
    userRef.update(userUpdate).catch((error) => alert(error));
    if (!inGroupScreen) onInvisible();
    onAdd();
    setSelectedState(true);
    setIgnoredState(false);
  }

  async function handleIgnore() {
    userRef
      .get()
      .then(async (doc) => {
        const notif = await doc.data().notificationIds;
        const eventNotif = await notif[id];
        const identifier = (await eventNotif) ? eventNotif[0] : null;
        if (identifier) {
          await Notifications.cancelScheduledNotificationAsync(identifier);
        }
      })
      .then(() => {
        var userUpdate = {
          selectedEvents: firebase.firestore.FieldValue.arrayRemove(id),
          ignoredEvents: firebase.firestore.FieldValue.arrayUnion(id),
        };
        userUpdate[`notificationIds.${id}`] =
          firebase.firestore.FieldValue.delete();
        userUpdate[`memos.${id}`] = firebase.firestore.FieldValue.delete();
        userRef.update(userUpdate).catch((error) => alert(error));
        if (!inGroupScreen) onInvisible();
        onAdd();
        setIgnoredState(true);
        setSelectedState(false);
      })
      .catch((error) => alert(error));
  }

  async function handleDelete() {
    userRef
      .get()
      .then(async (doc) => {
        const notif = await doc.data().notificationIds;
        const eventNotif = await notif[id];
        const identifier = (await eventNotif) ? eventNotif[0] : null;
        if (identifier) {
          await Notifications.cancelScheduledNotificationAsync(identifier);
        }
      })
      .then(() => {
        var userUpdate = {
          selectedEvents: firebase.firestore.FieldValue.arrayRemove(id),
          ignoredEvents: firebase.firestore.FieldValue.arrayRemove(id),
          upvotedEvents: firebase.firestore.FieldValue.arrayRemove(id),
          downvotedEvents: firebase.firestore.FieldValue.arrayRemove(id),
        };
        userUpdate[`notificationIds.${id}`] =
          firebase.firestore.FieldValue.delete();
        userUpdate[`memos.${id}`] = firebase.firestore.FieldValue.delete();
        userRef.update(userUpdate).catch((error) => alert(error));
      })
      .then(() => {
        groupRef
          .update({
            events: firebase.firestore.FieldValue.arrayRemove(id),
          })
          .catch((error) => alert(error));
      })
      .then(() => {
        eventRef.delete().catch((error) => alert(error));
        onInvisible();
        onAdd();
      })
      .catch((error) => alert(error));
  }

  function checkColor() {
    if (selectedState) return colors.grey;
    else if (ignoredState) return colors.faint;
    else return colors.silver;
  }

  return (
    <Swipeable
      renderRightActions={
        moderator ? () => <ListItemDeleteAction onPress={handleDelete} /> : null
      }
      overshootRight={false}
    >
      <View style={[styles.container, { backgroundColor: checkColor() }]}>
        <View style={styles.infoContainer}>
          <Text style={styles.date}>
            {moment(dateTime).format("DD MMMM YYYY")}
          </Text>
          <Text style={styles.time}>{moment(dateTime).format("HH : mm")}</Text>
          <Text style={styles.title} numberOfLines={3}>
            {title}
          </Text>
          <VoteCounter originalScore={score} id={id} voteState={voteState} />
        </View>
        <View style={styles.buttonContainer}>
          {!selectedState ? (
            <AddButton onPress={handleAdd} />
          ) : (
            <Text style={styles.selected}>Selected</Text>
          )}
          {!ignoredState ? (
            <IgnoreButton onPress={handleIgnore} />
          ) : (
            <Text style={styles.ignored}>Ignored</Text>
          )}
        </View>
      </View>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoContainer: {},
  buttonContainer: {
    justifyContent: "space-between",
    alignItems: "flex-end",
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
  selected: {
    color: colors.secondary,
    fontSize: 22,
  },
  ignored: {
    color: colors.primary,
    fontSize: 22,
  },
});

export default ListItem;
