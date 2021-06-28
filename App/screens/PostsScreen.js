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
  const [group, setGroup] = useState("");
  const [groupList, setGroupList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(AuthContext);

  const eventsRef = firebase.firestore().collection("events");
  const groupsRef = firebase.firestore().collection("groups");
  const userRef = firebase.firestore().collection("users").doc(user.id);

  const refreshEvents = (groupName) => {
    setRefreshing(true);
    eventsRef
      .orderBy("score")
      .get()
      .then((snapshot) => {
        const newEvents = [];
        snapshot.docs.forEach((doc) => {
          const event = doc.data();
          newEvents.push(event);
        });
        setEvents(newEvents.reverse());
      })
      .catch((error) => alert(error));

    // groupsRef
    //   .doc(groupName)
    //   .get()
    //   .then((groupDoc) => {
    //     const groupEventIds = groupDoc.data().events;
    //     const displayEventIds = filterArray(groupEventIds, selectedEvents);
    //     const newEvents = [];
    //     displayEventIds.forEach((eventId) => {
    //       eventsRef
    //         .doc(eventId)
    //         .get()
    //         .then((doc) => {
    //           const event = doc.data();
    //           newEvents.push(event);
    //         })
    //         .catch((error) => alert(error));
    //     });
    //     newEvents.sort(compareEvents);
    //     console.log(newEvents);
    //     setEvents(newEvents);
    //   })
    //   .catch((error) => alert(error));
    setRefreshing(false);
  };
  const fetchUserData = () => {
    userRef
      .get()
      .then((userDoc) => {
        const data = userDoc.data();
        const newGroups = data.group;
        const newSelectedEvents = data.selectedEvents;
        setGroupList(newGroups);
        setSelectedEvents(newSelectedEvents);
      })
      .catch((error) => alert(error));
  };

  const filterArray = (inArray, notInArray) => {
    const condition = (item) => {
      return !notInArray.includes(item);
    };
    const result = inArray.filter(condition);
    return result;
  };
  const compareEvents = (a, b) => {
    if (a.score > b.score) {
      return -1;
    } else if (a.score < b.score) {
      return 1;
    } else {
      return 0;
    }
  };

  const onPickerChange = (itemValue) => {
    setGroup(itemValue);
    refreshEvents(itemValue);
  };

  useFocusEffect(useCallback(fetchUserData, []));

  return (
    <Screen style={styles.container}>
      <View style={styles.headerBar}>
        <Picker
          value={group}
          onValueChange={onPickerChange}
          optionList={groupList}
        />
        <AddPostButton
          onPress={() => navigation.navigate(routes.ADD_POST, { group })}
        />
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
  },
});

export default PostsScreen;
