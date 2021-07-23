import React, { useState, useCallback, useContext } from "react";
import {
  StyleSheet,
  FlatList,
  RefreshControl,
  View,
  Text,
  Button,
} from "react-native";
import { firebase } from "../../firebase/config";
import { useFocusEffect } from "@react-navigation/native";

import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Screen from "../components/Screen";
import colors from "../config/colors";
import routes from "../navigation/routes";
import AuthContext from "../auth/context";
import ProfileImage from "../components/ProfileImage";

function GroupScreen({ navigation, route }) {
  const { group } = route.params;
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [ignoredEvents, setIgnoredEvents] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(AuthContext);

  const eventsRef = firebase.firestore().collection("events");
  const groupRef = firebase.firestore().collection("groups");
  const userRef = firebase.firestore().collection("users").doc(user.id);

  const fetchUserData = () => {
    userRef
      .get()
      .then(async (userDoc) => {
        const data = await userDoc.data();
        const newSelectedEvents = await data.selectedEvents;
        const newIgnoredEvents = await data.ignoredEvents;
        setSelectedEvents(newSelectedEvents);
        setIgnoredEvents(newIgnoredEvents);
      })
      .catch((error) => alert(error));
  };

  const refreshEvents = (groupName) => {
    setRefreshing(true);
    if (groupName != "") {
      groupRef
        .doc(groupName)
        .get()
        .then(async (groupDoc) => {
          const groupEvents = [];
          const data = groupDoc.data();
          // const newGroups = data.group;
          const listOfEvents = await data.events;
          if (listOfEvents == []) return;
          await Promise.all(
            listOfEvents.map(async (eventId) => {
              const loading = await eventsRef
                .doc(eventId)
                .get()
                .then(async (doc) => {
                  const event = await doc.data();
                  const loading2 = await groupEvents.push(event);
                  //console.log(event);
                });
            })
          );

          // data.events.forEach(async (eventName) => {
          //   //console.log(eventName);
          //   const event = await eventsRef.doc(eventName).get().then((event) => {
          //     const eachGroupEvent = event.data();
          //     //console.log(eachGroupEvent);
          //     groupEvents.push(eachGroupEvent);
          //   });
          //   // console.log(event);
          //   // groupEvents.push(event);
          // });
          //console.log(groupEvents);
          setEvents(groupEvents);
        })
        .catch((error) => alert(error));
    }

    // eventsRef
    //   .orderBy("score")
    //   .get()
    //   .then((snapshot) => {
    //     const newEvents = [];
    //     snapshot.docs.forEach((doc) => {
    //       const event = doc.data();
    //       newEvents.push(event);
    //     });
    //     setEvents(newEvents.reverse());
    //   })
    //   .catch((error) => alert(error));

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

  // const fetchGroupData = () => {
  //   groupRef
  //     .get()
  //     .then((groupDoc) => {
  //       const data = groupDoc.data();
  //       // const newGroups = data.group;
  //       const events = data.events;
  //       // setGroupList(newGroups);
  //       setSelectedEvents(events);
  //     })
  //     .catch((error) => alert(error));
  // };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
      refreshEvents(group);
    }, [])
  );

  const changeImage = (newImage) => {
    groupRef
      .doc(group)
      .update("profileImage", newImage)
      .catch((error) => alert(error));
    navigation.navigate(routes.GROUP);
  };

  // const onInvisible = (id) => (type) => {
  //   if (type == "ignore") {
  //     console.log("ignore:");
  //     setSelectedEvents(selectedEvents.filter((event) => event.id !== id));
  //     setIgnoredEvents(ignoredEvents.push(id));
  //     // setEvents(events.filter((event) => event.id !== id));
  //     // setEvents(events.push(id));
  //     // refreshEvents(group);
  //   } else if (type == "add") {
  //     console.log("add:");
  //     setIgnoredEvents(ignoredEvents.filter((event) => event.id !== id));
  //     setSelectedEvents(selectedEvents.push(id));
  //     // setEvents(events.filter((event) => event.id !== id));
  //     // setEvents(events.push(id));
  //     // refreshEvents(group);
  //   }
  // };

  const onAdd = async (id) => {
    await Promise.all(
      userRef
        .get()
        .then(async (userDoc) => {
          const data = await userDoc.data();
          const newSelectedEvents = await data.selectedEvents;
          const newIgnoredEvents = await data.ignoredEvents;
          setSelectedEvents(newSelectedEvents);
          setIgnoredEvents(newIgnoredEvents);
        })
        .catch((error) => alert(error))
    );
  };

  return (
    <Screen style={styles.container}>
      <View style={{ backgroundColor: "white" }}>
        <ProfileImage
          style={styles.profileImage}
          imageUri={groupRef.doc(group).get().groupImage}
          onChangeImage={changeImage}
          icon="account"
        />
      </View>

      <Text style={styles.displayName}>{group}</Text>

      <Button title={"Follow"} onPress={() => {}} />

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
            onInvisible={() => {}}
            onAdd={() => onAdd(item.id)}
            selected={selectedEvents.includes(item.id)}
            ignored={ignoredEvents.includes(item.id)}
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
  displayName: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },
  // profileImage: {
  //   resizeMode: "center"
  // }
});

export default GroupScreen;
