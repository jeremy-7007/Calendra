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

function SearchScreen({ navigation }) {
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
      <BackButton onPress={() => navigation.navigate(routes.ACCOUNT)} />
      <Text style={styles.pageTitle}>Search Group</Text>
      <TextInput
        icon="magnify"
        placeholder="Enter group name"
        onChangeText={updateQuery}
      />
      <FlatList
        data={displayed}
        keyExtractor={(i) => i.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchGroups}
            colors={[colors.primary]}
          />
        }
        renderItem={({ item }) => (
          <SearchListItem imageUri={item.groupImage} name={item.groupName} />
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
});

export default SearchScreen;
