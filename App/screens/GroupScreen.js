import React, { useState, useCallback, useContext, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  RefreshControl,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { firebase } from "../../firebase/config";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Screen from "../components/Screen";
import colors from "../config/colors";
import routes from "../navigation/routes";
import AuthContext from "../auth/context";
import FollowButton from "../components/lists/FollowButton";
import BackButton from "../components/BackButton";
import ConfigButton from "../components/ConfigButton";

function GroupScreen({ navigation, route }) {
  const { group, mod = true } = route.params;
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [ignoredEvents, setIgnoredEvents] = useState([]);
  const [upvotedEvents, setUpvotedEvents] = useState([]);
  const [downvotedEvents, setDownvotedEvents] = useState([]);
  const [moderator, setModerator] = useState(false);
  const [numOfMod, setNumOfMod] = useState(-1);
  const [status, setStatus] = useState("");
  const [statusAvailable, setStatusAvailable] = useState(false);
  const [statusAvailable2, setStatusAvailable2] = useState(false);
  const [follow, setFollow] = useState(false);
  const [privacy, setPrivacy] = useState(true);
  const [groupList, setGroupList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(AuthContext);

  const eventsRef = firebase.firestore().collection("events");
  const groupsRef = firebase.firestore().collection("groups");
  const userRef = firebase.firestore().collection("users").doc(user.id);

  const fetchUserData = () => {
    userRef
      .get()
      .then(async (userDoc) => {
        const data = await userDoc.data();
        const newSelectedEvents = await data.selectedEvents;
        const newIgnoredEvents = await data.ignoredEvents;
        const newUpvotedEvents = await data.upvotedEvents;
        const newDownvotedEvents = await data.downvotedEvents;
        const listOfGroups = await data.groups;
        const isFollowing = listOfGroups.includes(group.groupName);
        groupsRef
          .doc(group.groupName)
          .get()
          .then(async (groupDoc) => {
            const data = await groupDoc.data();
            if (data.requests.includes(user.id)) {
              setStatus("Requesting");
            } else if (isFollowing) {
              setStatus("Following");
            } else {
              setStatus("Follow");
            }
            if (data.mode == "Public") setPrivacy(false);
          })
          .catch((error) => alert(error));
        setFollow(isFollowing);
        setSelectedEvents(newSelectedEvents);
        setIgnoredEvents(newIgnoredEvents);
        setUpvotedEvents(newUpvotedEvents);
        setDownvotedEvents(newDownvotedEvents);
        setStatusAvailable(true);
      })
      .catch((error) => alert(error));
  };

  const refreshEvents = (groupName) => {
    setRefreshing(true);

    fetchUserData();

    if (groupName != "") {
      groupsRef
        .doc(groupName)
        .get()
        .then(async (groupDoc) => {
          const groupEvents = [];
          const data = groupDoc.data();
          const listOfEvents = await data.events;
          const listOfModerators = await data.moderator;
          setNumOfMod(listOfModerators.length);
          console.log(numOfMod);
          if (listOfModerators.includes(user.id)) {
            setModerator(true);
          }
          if (listOfEvents == []) return;
          await Promise.all(
            listOfEvents.map(async (eventId) => {
              const loading = await eventsRef
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
          setStatusAvailable2(true);
        })
        .catch((error) => alert(error));
    }

    setRefreshing(false);
  };

  function compareEvents(a, b) {
    return b.score - a.score;
  }

  function onQuitMod(bool) {
    setModerator(bool);
  }

  function checkVote(id) {
    if (upvotedEvents.includes(id)) {
      return 1;
    } else if (downvotedEvents.includes(id)) {
      return -1;
    } else {
      return 0;
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
      refreshEvents(group.groupName);
    }, [])
  );

  const onInvisible = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const onUnfollow = () => {
    setModerator(false);
  };

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
      <BackButton onPress={() => navigation.goBack()} />
      <ConfigButton
        onPress={() => navigation.navigate(routes.EDITGROUP, { group })}
      />
      <View style={styles.headerBar}>
        <View style={styles.imageContainer}>
          {!group.groupImage && (
            <MaterialCommunityIcons
              name={"account-group"}
              size={30}
              color={colors.medium}
              style={styles.icon}
            />
          )}
          {group.groupImage && (
            <Image source={{ uri: group.groupImage }} style={styles.image} />
          )}
        </View>
        <Text style={styles.displayName} numberOfLines={1}>
          {group.groupName}
        </Text>
      </View>
      <View style={styles.buttonBar}>
        {statusAvailable && statusAvailable2 && status != "" && (
          <FollowButton
            title={group.groupName}
            status={status}
            lastMod={moderator && numOfMod == 1}
            onPress={onUnfollow}
          />
        )}
        {moderator &&
          mod &&
          statusAvailable &&
          statusAvailable2 &&
          status != "" && (
            <TouchableOpacity
              style={styles.modButton}
              onPress={() =>
                navigation.navigate(routes.MOD, {
                  group: group,
                  //onPress: fetchUserData,
                })
              }
            >
              <Text style={styles.moderate}>{"Moderate"}</Text>
            </TouchableOpacity>
          )}
      </View>
      {(!privacy || follow) && statusAvailable && statusAvailable2 && (
        <FlatList
          data={events}
          keyExtractor={(event) => event.id.toString()}
          ItemSeparatorComponent={ListItemSeparator}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => refreshEvents(group.groupName)}
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
              onAdd={() => onAdd(item.id)}
              voteState={checkVote(item.id)}
              selected={selectedEvents.includes(item.id)}
              ignored={ignoredEvents.includes(item.id)}
              moderator={moderator}
              groupName={item.group}
              inGroupScreen={true}
            />
          )}
        />
      )}

      {privacy && !follow && statusAvailable && statusAvailable2 && (
        <Text
          style={{
            fontSize: 25,
            color: colors.medium,
            alignSelf: "center",
          }}
        >
          This group is private
        </Text>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.light,
  },
  buttonBar: {
    flexDirection: "row",
    marginBottom: 25,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  moderate: {
    color: colors.light,
    fontSize: 18,
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 25,
  },
  displayName: {
    fontSize: 25,
    fontWeight: "bold",
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginHorizontal: 25,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  modButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 100,
    borderRadius: 20,
    backgroundColor: colors.secondary,
  },
});

export default GroupScreen;
