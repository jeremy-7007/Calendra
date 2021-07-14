import React, { useState, useContext, useCallback, useEffect } from "react";
import { StyleSheet, FlatList, RefreshControl, Button } from "react-native";
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
      .then((userDoc) => {
        return userDoc.data().selectedEvents;
        // selectedIds.forEach((eventId) => {
        //   eventsRef
        //     .doc(eventId)
        //     .get()
        //     .then((eventDoc) => {
        //       const event = eventDoc.data();
        //       newSelected.push(event);
        //     })
        //     .catch((error) => alert(error));
        // });
      })
      .then((selectedIds) => {
        eventsRef
          .get()
          .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
              if (selectedIds.includes(doc.id)) {
                const event = doc.data();
                newSelected.push(event);
              }
            });
          })
          .catch((error) => alert(error));
      })
      .then(() => setEvents(newSelected))
      .catch((error) => alert(error));

    setRefreshing(false);
  }

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [])
  );

  const test = [
    {
      dateTime: new Date(),
      title: "Test 1",
      id: 1,
    },
    {
      dateTime: new Date(),
      title: "Test 2",
      id: 2,
    },
  ];

  return (
    <Screen style={styles.container}>
      <BackButton onPress={() => navigation.navigate(routes.SETTING)} />
      <Text style={styles.pageTitle}>Selected events</Text>
      <Button title="test" onPress={() => console.log(events)} />
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
            dateTime={item.dateTime}
            id={item.id}
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
