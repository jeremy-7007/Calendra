import React, { useState, useCallback, useContext } from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";
import { firebase } from "../../firebase/config";
import { useFocusEffect } from "@react-navigation/native";

import AuthContext from "../auth/context";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AddPostButton from "../components/AddPostButton";
import routes from "../navigation/routes";

function PostsScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(AuthContext);
  const [newItems, setNewItems] = useState({});

  const userRef = firebase.firestore().collection("users").doc(user.id);
  const eventsRef = firebase.firestore().collection("events");
  const groupRef = firebase.firestore().collection("groups");
  
  const refresh = () => {
    setRefreshing(true);
    // userRef
    // .get()
    // .then(
    //   (userDoc) => {
    //     const currentEvents = userDoc.data().selectedEvents;
    //     // const currentEvents = [];
    //     // selectedEvents.forEach((key) => currentEvents.push(key));
    //     const currentGroups = userDoc.data().group;
    //     const newEvents = [];
    //     currentGroups.forEach(
    //       (groupId) => {
    //         groupRef
    //         .doc(groupId)
    //         .get()
    //         .then(
    //           (doc) => {
    //             const listOfEvents = doc.data().events;
    //             listOfEvents.forEach(
    //               (eventId) => {
    //                 if (!currentEvents.includes(eventId)) {
    //                   console.log(eventId);
    //                   eventsRef.doc(eventId).get().then((data) => newEvents.push(data)).catch((error) => alert(error));
    //                 }
    //               }
    //             )
    //           }

    //         ).catch((error) => alert(error))

    //       }
    //     )
    //     console.log(newEvents);
    //     setNewItems(newEvents);
    //   }
    // )
    // .catch((error) => alert(error));

    eventsRef
      .orderBy("dateTime")
      .get()
      .then((snapshot) => {
        const newEvents = [];
        snapshot.docs.forEach((doc) => {
          const event = doc.data();
          event.id = doc.id;
          newEvents.push(event);
        });
        // console.log(newEvents);
        setEvents(newEvents.reverse());
      })
      .catch((error) => alert(error));

    setRefreshing(false);
  };

  useFocusEffect(useCallback(refresh, []));

  return (
    <Screen style={styles.container}>
      <AddPostButton onPress={() => navigation.navigate(routes.ADD_POST)} />
      <FlatList
        data={events}
        keyExtractor={(event) => event.id.toString()}
        ItemSeparatorComponent={ListItemSeparator}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            colors={[colors.primary]}
          />
        }
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            dateTime={item.dateTime.toDate()}
            score={item.score}
            id={item.id}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.light,
  },
});

export default PostsScreen;
