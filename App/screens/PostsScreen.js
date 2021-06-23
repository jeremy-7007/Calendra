import React, { useState, useCallback } from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";
import { firebase } from "../../firebase/config";
import { useFocusEffect } from "@react-navigation/native";

import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AddPostButton from "../components/AddPostButton";
import routes from "../navigation/routes";

function PostsScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const eventsRef = firebase.firestore().collection("events");
  const refresh = () => {
    setRefreshing(true);
    eventsRef
      .orderBy("score")
      .get()
      .then((snapshot) => {
        const newEvents = [];
        snapshot.docs.forEach((doc) => {
          const event = doc.data();
          event.id = doc.id;
          newEvents.push(event);
        });
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
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            date={item.date.toDate()}
            time={item.time.toDate()}
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
