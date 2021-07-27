import React, { useContext, useEffect, useState, useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";
import { firebase } from "../../firebase/config";
import { useFocusEffect, NavigationEvents } from "@react-navigation/native";

import BackButton from "../components/BackButton";
import Text from "../components/Text";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import GroupListItem from "../components/lists/GroupListItem";
import AuthContext from "../auth/context";
import colors from "../config/colors";

function SeparatorWhite() {
  return <ListItemSeparator color={colors.white} />;
}

function MyGroupScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [myGroups, setMyGroups] = useState([]);

  const fetchData = () => {
    const userRef = firebase.firestore().collection("users").doc(user.id);
    const groupRef = firebase.firestore().collection("groups");
    userRef
      .get()
      .then(async (userDoc) => {
        const listOfGroups = await userDoc.data().groups.sort();
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

        setMyGroups(holder);
      })
      .catch((error) => alert(error));
  };

  const checkLastMod = (groupData) => {
    const listOfMods = groupData.moderator;
    const numOfMods = listOfMods.length;
    return listOfMods.includes(user.id) && numOfMods == 1;
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <Screen style={{ padding: 10, backgroundColor: colors.white }}>
      <BackButton onPress={() => navigation.navigate(routes.GROUPOPTIONS)} />
      <Text style={styles.pageTitle}>My Groups</Text>

      <FlatList
        style={styles.container}
        data={myGroups}
        keyExtractor={(group) => group.id.toString()}
        ItemSeparatorComponent={SeparatorWhite}
        renderItem={({ item }) => (
          <GroupListItem
            title={item.groupName}
            image={item.groupImage}
            onPress={() => navigation.navigate(routes.GROUP, { group: item })}
            lastMod={checkLastMod(item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
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
