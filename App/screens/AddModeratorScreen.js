import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";

import BackButton from "../components/BackButton";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import { firebase } from "../../firebase/config";
import colors from "../config/colors";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import MemberListItem from "../components/lists/MemberListItem";

function SeparatorWhite() {
  return <ListItemSeparator color={colors.white} />;
}

function AddModeratorScreen({ navigation, route }) {
  const { group } = route.params;
  const [members, setMembers] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const groupsRef = firebase
    .firestore()
    .collection("groups")
    .doc(group.groupName);
  const userRef = firebase.firestore().collection("users");

  function fetchMembers() {
    setRefreshing(true);

    groupsRef
      .get()
      .then(async (groupDoc) => {
        const groupData = await groupDoc.data();
        const listOfMembers = await groupData.members;
        const listOfModerators = await groupData.moderator;
        //console.log(listOfMembers);
        const holder = [];
        if (listOfModerators !== []) {
          await Promise.all(
            listOfModerators.map(async (userId) => {
              //console.log(userId);
              await userRef
                .doc(userId)
                .get()
                .then(async (doc) => {
                  const user = await doc.data();
                  holder.push(user);
                });
            })
          );
        }
        if (listOfMembers !== []) {
          await Promise.all(
            listOfMembers.map(async (userId) => {
              //console.log(userId);
              await userRef
                .doc(userId)
                .get()
                .then(async (doc) => {
                  const user = await doc.data();
                  //console.log("member pushed");
                  holder.push(user);
                });
            })
          );
        }
        //Promise.all([promise1, promise2]).then(console.log(holder));
        setMembers(holder);
        setDisplayed(holder);
        //console.log(members);
      })
      .catch((error) => alert(error));

    setRefreshing(false);
  }

  function filterMember(input, user) {
    const search = input.toLowerCase().replace(/ /g, "_");
    return user.displayName.toLowerCase().replace(/ /g, "_").startsWith(search);
  }

  function updateQuery(input) {
    setDisplayed(members.filter((user) => filterMember(input, user)));
  }

  useEffect(fetchMembers, []);

  return (
    <Screen style={styles.container}>
      <BackButton onPress={() => navigation.navigate(routes.MOD, { group })} />
      <Text style={styles.pageTitle}>Add Moderators</Text>
      <TextInput
        icon="magnify"
        placeholder="Enter member name"
        onChangeText={updateQuery}
      />
      <FlatList
        style={styles.list}
        data={displayed}
        keyExtractor={(i) => i.id.toString()}
        ItemSeparatorComponent={SeparatorWhite}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchMembers}
            colors={[colors.primary]}
          />
        }
        renderItem={({ item }) => (
          <MemberListItem
            imageUri={item.profileImage}
            title={item.displayName}
            userId={item.id}
            groupId={group.groupName}
            mod={true}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    margin: 30,
  },
  list: {
    marginTop: 20,
  },
});

export default AddModeratorScreen;
