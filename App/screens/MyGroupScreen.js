import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { firebase } from "../../firebase/config";

import BackButton from "../components/BackButton";
import Text from "../components/Text";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import GroupListItem from "../components/lists/GroupListItem";
import AuthContext from "../auth/context";
import colors from "../config/colors";

function MyGroupScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [myGroups, setMyGroups] = useState([]);

  const userRef = firebase.firestore().collection("users").doc(user.id);
  const groupRef = firebase.firestore().collection("groups");

  useEffect(() => {
    let isMounted = 2;

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

        if (isMounted > 0) setMyGroups(holder);
      })
      .catch((error) => alert(error));
    return () => {
      isMounted = isMounted - 1;
    };
  }, []);

  return (
    <Screen style={{ padding: 10, backgroundColor: colors.light }}>
      <BackButton onPress={() => navigation.navigate(routes.ACCOUNT)} />
      <Text style={styles.pageTitle}>My Groups</Text>
      <FlatList
        style={styles.container}
        data={myGroups}
        keyExtractor={(group) => group.id.toString()}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => (
          <GroupListItem
            title={item.groupName}
            image={item.groupImage}
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
