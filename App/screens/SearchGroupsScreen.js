import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";

import BackButton from "../components/BackButton";
import Screen from "../components/Screen";
import routes from "../navigation/routes";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import { firebase } from "../../firebase/config";
import SearchListItem from "../components/lists/SearchListItem";
import colors from "../config/colors";
import ListItemSeparator from "../components/lists/ListItemSeparator";

function SeparatorWhite() {
  return <ListItemSeparator color={colors.white} />;
}

function SearchGroupsScreen({ navigation }) {
  const [groups, setGroups] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const groupsRef = firebase.firestore().collection("groups");

  function fetchGroups() {
    setRefreshing(true);

    groupsRef
      .orderBy("groupName")
      .get()
      .then((snapshot) => {
        const newGroups = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          newGroups.push(data);
        });
        setGroups(newGroups);
        setDisplayed(newGroups);
      })
      .catch((error) => alert(error));

    setRefreshing(false);
  }

  function filterGroup(input, group) {
    const search = input.toLowerCase().replace(/ /g, "_");
    return group.groupName.toLowerCase().replace(/ /g, "_").startsWith(search);
  }

  function updateQuery(input) {
    setDisplayed(groups.filter((group) => filterGroup(input, group)));
  }

  useEffect(fetchGroups, []);

  return (
    <Screen style={styles.container}>
      <BackButton onPress={() => navigation.navigate(routes.GROUPOPTIONS)} />
      <Text style={styles.pageTitle}>Search Group</Text>
      <TextInput
        icon="magnify"
        placeholder="Enter group name"
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

export default SearchGroupsScreen;
