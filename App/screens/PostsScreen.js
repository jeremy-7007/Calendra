import React from "react";
import { StyleSheet, FlatList } from "react-native";

import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Screen from "../components/Screen";
import colors from "../config/colors";

const posts = [
  {
    id: 1,
    title: "Orbital Milestone 1",
    date: "31 May 2021",
    score: 17,
  },
  {
    id: 2,
    title: "The end of human existence",
    date: "1 June 2021",
    score: 666,
  },
];

function PostsScreen(props) {
  return (
    <Screen style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(post) => post.id.toString()}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => (
          <ListItem title={item.title} date={item.date} score={item.score} />
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
});

export default PostsScreen;
