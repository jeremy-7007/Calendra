import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, RefreshControl } from "react-native";
import { firebase } from "../../firebase/config";

import BackButton from "../components/BackButton";
import Text from "../components/Text";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import GroupListItem from "../components/lists/GroupListItem";
import AuthContext from "../auth/context";
import colors from "../config/colors";
import SearchListItem from "../components/lists/SearchListItem";

function MyGroupScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const userRef = firebase.firestore().collection("users").doc(user.id);
  const groupRef = firebase.firestore().collection("groups");

  function fetchGroups() {
    setRefreshing(true);

    userRef
      .get()
      .then(async (userDoc) => {
        const listOfGroups = await userDoc.data().groups;
        if (listOfGroups == null) return;
        const holder = [];
        await Promise.all(
          listOfGroups.map(async (groupId) => {
            await groupRef
              .doc(groupId)
              .get()
              .then(async (doc) => {
                const group = await doc.data();
                group.id = doc.id;
                holder.push(group);
              });
          })
        );
        setGroups(holder);
        setDisplayed(holder);
      })
      .catch((error) => alert(error));

    setRefreshing(false);
  }

  useEffect(fetchGroups, []);

  return (
    <Screen style={{ padding: 10, backgroundColor: colors.light }}>
      <BackButton onPress={() => navigation.navigate(routes.ACCOUNT)} />
      <Text style={styles.pageTitle}>My Groups</Text>
      <FlatList
        // style={styles.container}
        data={displayed}
        keyExtractor={(group) => group.id.toString()}
        // ItemSeparatorComponent={ListItemSeparator}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchGroups}
            colors={[colors.primary]}
          />
        }
        renderItem={({ item }) => (
          <SearchListItem
            imageUri={item.groupImage}
            name={item.groupName}
            onPress={() =>
              navigation.navigate(routes.GROUP, { group: item.groupName })
            }
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
  box: {
    color: "blue",
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    margin: 30,
  },
});

export default MyGroupScreen;
