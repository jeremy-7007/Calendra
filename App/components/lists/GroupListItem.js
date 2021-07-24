import React, { useContext, useState } from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { firebase } from "../../../firebase/config";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "../Text";
import colors from "../../config/colors";
import AuthContext from "../../auth/context";

function GroupListItem({ title, image, onPress }) {
  const { user } = useContext(AuthContext);
  const [follow, setFollow] = useState(true);

  const usersRef = firebase.firestore().collection("users").doc(user.id);

  const handleFollow = async () => {
    setFollow(true);
    const addGroup = await usersRef
      .update({
        groups: firebase.firestore.FieldValue.arrayUnion(title),
      })
      .catch((error) => alert(error));
  };
  const handleUnfollow = async () => {
    setFollow(false);
    const removeGroup = await usersRef
      .update({
        groups: firebase.firestore.FieldValue.arrayRemove(title),
      })
      .catch((error) => alert(error));
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.containter}>
        <View style={styles.imageContainer}>
          {!image && (
            <MaterialCommunityIcons
              name={"account-group"}
              size={30}
              color={colors.medium}
              style={styles.icon}
            />
          )}
          {image && <Image style={styles.image} source={{ uri: image }} />}
        </View>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: follow ? colors.primary : colors.white },
          ]}
          onPress={follow ? handleUnfollow : handleFollow}
        >
          <Text style={{ color: follow ? colors.light : colors.medium }}>
            {follow ? "Following" : "Follow"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containter: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: colors.light,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  title: {
    width: 150,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 100,
    borderRadius: 20,
  },
  icon: {},
});

export default GroupListItem;
