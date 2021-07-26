import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { firebase } from "../../firebase/config";

import BackButton from "../components/BackButton";
import Text from "../components/Text";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import GroupListItem from "../components/lists/GroupListItem";
import UserListItem from "../components/lists/UserListItem";
import AuthContext from "../auth/context";
import colors from "../config/colors";

function RequestScreen({ navigation, route }) {
  const { group } = route.params;

  const [userList, setUserList] = useState([]);
  const [empty, setEmpty] = useState(false);

  const userRef = firebase.firestore().collection("users");
  const groupRef = firebase
    .firestore()
    .collection("groups")
    .doc(group.groupName);

  useEffect(() => {
    let isMounted = 2;

    groupRef
      .get()
      .then(async (groupDoc) => {
        const listOfRequests = await groupDoc.data().requests;
        if (listOfRequests == []) {
          setEmpty(true);
          return;
        }
        const holder = [];
        await Promise.all(
          listOfRequests.map(async (userId) => {
            await userRef
              .doc(userId)
              .get()
              .then(async (doc) => {
                const data = await doc.data();
                holder.push(data);
              });
          })
        );
        if (isMounted > 0) setUserList(holder);
      })
      .catch((error) => alert(error));

    return () => {
      isMounted = isMounted - 1;
    };
  }, []);

  return (
    <Screen style={{ padding: 10, backgroundColor: colors.light }}>
      <BackButton onPress={() => navigation.goBack()} />
      <Text style={styles.pageTitle}>Requests</Text>
      <FlatList
        style={styles.container}
        data={userList}
        keyExtractor={(user) => user.id.toString()}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => (
          <UserListItem
            title={item.displayName}
            image={item.profileImage}
            userId={item.id}
            groupId={group.groupName}
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

export default RequestScreen;
