import React, { useState, useContext, useCallback } from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";
import { firebase } from "../../firebase/config";
import { useFocusEffect } from "@react-navigation/native";

import Screen from "../components/Screen";
import BackButton from "../components/BackButton";
import routes from "../navigation/routes";
import SelectedItem from "../components/lists/SelectedItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Text from "../components/Text";
import colors from "../config/colors";
import AuthContext from "../auth/context";

function SelectedScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(AuthContext);

  const userRef = firebase.firestore().collection("users").doc(user.id);
  const eventsRef = firebase.firestore().collection("events");

  function onRefresh() {
    setRefreshing(true);

    const newSelected = [];
    userRef
      .get()
      .then(async (userDoc) => {
        const data = await userDoc.data();
        const selectedIds = await data.selectedEvents;
        const notif = await data.notificationIds;
        const memos = await data.memos;
        if (selectedIds !== []) {
          await Promise.all(
            selectedIds.map(async (eventId) => {
              await eventsRef
                .doc(eventId)
                .get()
                .then(async (eventDoc) => {
                  if (!eventDoc.exists) {
                    userRef
                      .update({
                        selectedEvents:
                          firebase.firestore.FieldValue.arrayRemove(eventId),
                        upvotedEvents:
                          firebase.firestore.FieldValue.arrayRemove(eventId),
                        downvotedEvents:
                          firebase.firestore.FieldValue.arrayRemove(eventId),
                      })
                      .catch((error) => alert(error));
                    return;
                  }
                  const event = await eventDoc.data();
                  event.notif = await notif[eventId][1];
                  event.memo = await memos[eventId];
                  newSelected.push(event);
                })
                .catch((error) => alert(error));
            })
          );
          setEvents(newSelected);
        }
      })
      .catch((error) => alert(error));

    setRefreshing(false);
  }

  const onInvisible = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [])
  );

  return (
    <Screen style={styles.container}>
      <BackButton onPress={() => navigation.navigate(routes.SETTING)} />
      <Text style={styles.pageTitle}>Selected Events</Text>
      <FlatList
        data={events}
        keyExtractor={(event) => event.id.toString()}
        ItemSeparatorComponent={ListItemSeparator}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
        renderItem={({ item }) => (
          <SelectedItem
            title={item.title}
            dateTime={item.dateTime.toDate()}
            id={item.id}
            deleteCall={() => onInvisible(item.id)}
            importedMemo={item.memo}
            importedNotif={item.notif}
            groupName={item.group}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: colors.light },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    margin: 30,
  },
});

export default SelectedScreen;
