import React, { useState, useCallback, useContext } from "react";
import { StyleSheet, FlatList, RefreshControl, View } from "react-native";
import { firebase } from "../../firebase/config";
import { useFocusEffect } from "@react-navigation/native";
import Picker from "../components/AppPicker";

import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AddPostButton from "../components/AddPostButton";
import routes from "../navigation/routes";
import AuthContext from "../auth/context";

function PostsScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [ignoredEvents, setIgnoredEvents] = useState([]);
  const [group, setGroup] = useState("");
  const [groupList, setGroupList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(AuthContext);

  const eventsRef = firebase.firestore().collection("events");
  const groupsRef = firebase.firestore().collection("groups");
  const userRef = firebase.firestore().collection("users").doc(user.id);

  const refreshEvents = (groupName) => {
    setRefreshing(true);

    if (groupName !== "") {
      groupsRef
        .doc(groupName)
        .get()
        .then(async (groupDoc) => {
          const groupEvents = [];
          const data = groupDoc.data();
          const listOfEvents = await data.events;
          if (listOfEvents == []) return;
          const shownEvents = await tripleFilter(
            listOfEvents,
            selectedEvents,
            ignoredEvents
          );
          if (shownEvents == []) return;
          await Promise.all(
            shownEvents.map(async (eventId) => {
              await eventsRef
                .doc(eventId)
                .get()
                .then(async (doc) => {
                  const event = await doc.data();
                  groupEvents.push(event);
                });
            })
          );
          groupEvents.sort(compareEvents);
          setEvents(groupEvents);
        })
        .catch((error) => alert(error));
    }

    setRefreshing(false);
  };

  const fetchUserData = () => {
    userRef
      .get()
      .then(async (userDoc) => {
        const data = await userDoc.data();
        const newGroups = await data.groups;
        const newSelectedEvents = await data.selectedEvents;
        const newIgnoredEvents = await data.ignoredEvents;
        setGroupList(newGroups);
        setSelectedEvents(newSelectedEvents);
        setIgnoredEvents(newIgnoredEvents);
      })
      .catch((error) => alert(error));
  };

  const tripleFilter = (inArray, notInArray1, notInArray2) => {
    const condition = (item) => {
      return !notInArray1.includes(item) && !notInArray2.includes(item);
    };
    const result = inArray.filter(condition);
    return result;
  };
  const compareEvents = (a, b) => {
    return b.score - a.score;
  };

  const onPickerChange = (itemValue) => {
    setGroup(itemValue);
    refreshEvents(itemValue);
  };

  const onAddPost = () => {
    if (group === "") alert("Please select a group");
    else navigation.navigate(routes.ADD_POST, { group });
  };

  const onInvisible = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
      refreshEvents(group);
    }, [])
  );

  return (
    <Screen style={styles.container}>
      <View style={styles.headerBar}>
        <Picker
          value={group}
          onValueChange={onPickerChange}
          optionList={groupList}
          containerStyle={{ width: "83%" }}
          mode="dropdown"
        />
        <AddPostButton onPress={onAddPost} />
      </View>
      <FlatList
        data={events}
        keyExtractor={(event) => event.id.toString()}
        ItemSeparatorComponent={ListItemSeparator}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => refreshEvents(group)}
            colors={[colors.primary]}
          />
        }
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            dateTime={item.dateTime.toDate()}
            score={item.score}
            id={item.id}
            onInvisible={() => onInvisible(item.id)}
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
  headerBar: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default PostsScreen;
