import React, { useState, useCallback, useContext } from "react";
import { StyleSheet, FlatList, RefreshControl, View, Text } from "react-native";
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
import ProfileImage from "../components/ProfileImage";

function GroupScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  // const [group, setGroup] = useState("");
  const [groupList, setGroupList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { group } = useContext(AuthContext);

  const eventsRef = firebase.firestore().collection("events");
  const groupRef = firebase.firestore().collection("groups").doc(group);
  // const userRef = firebase.firestore().collection("users").doc(user.id);

  const refreshEvents = () => {
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
  const fetchGroupData = () => {
    groupRef
      .get()
      .then((groupDoc) => {
        const data = groupDoc.data();
        // const newGroups = data.group;
        const events = data.events;
        // setGroupList(newGroups);
        setSelectedEvents(events);
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
    refreshEvents();
  };

  useFocusEffect(
    useCallback(() => {
      fetchGroupData();
      refreshEvents();
    }, [])
  );

  const changeImage = (newImage) => {
    groupRef
      .update("profileImage", newImage)
      .catch((error) => alert(error));
    navigation.navigate(routes.GROUP);
  };

  return (
    <Screen style={styles.container}>
    <View style={{backgroundColor: "white"}}>
      <ProfileImage
        style={styles.profileImage}
        imageUri={groupRef.get().groupImage}
        onChangeImage={changeImage}
        icon="account"
      />
    </View>
      <Text style={styles.displayName}>{group}</Text>
    <View>
      <FlatList
        data={events}
        keyExtractor={(event) => event.id.toString()}
        ItemSeparatorComponent={ListItemSeparator}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => refreshEvents()}
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
    </View>
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