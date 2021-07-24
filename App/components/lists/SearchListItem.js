import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "../Text";
import colors from "../../config/colors";

function SearchListItem({ imageUri, name, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        {!imageUri && (
          <MaterialCommunityIcons
            name={"account-group"}
            size={30}
            color={colors.medium}
            style={styles.icon}
          />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
      <Text numberOfLines={1} style={styles.name}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginRight: 25,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  name: {
    width: 150,
  },
  icon: {},
});

export default SearchListItem;
