import React, { useContext, useState } from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { firebase } from "../../../firebase/config";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "../Text";
import colors from "../../config/colors";
import AuthContext from "../../auth/context";

function GroupListItem({ title, image, onPress }) {
  const { user } = useContext(AuthContext);
  const [follow, setFollow] = useState("Following");
  const [moderator, setModerator] = useState(false);
  const [numOfMod, setNumOfMod] = useState(-1);

  const usersRef = firebase.firestore().collection("users").doc(user.id);
  const groupRef = firebase.firestore().collection("groups").doc(title);

  const handleFollow = async () => {
    groupRef.get().then(async (groupDoc) => {
      const privacySetting = groupDoc.data().mode;
      if (privacySetting == "Public") {
        setFollow("Following");
        const addGroup = await usersRef
          .update({
            groups: firebase.firestore.FieldValue.arrayUnion(title),
          })
          .catch((error) => alert(error));
        const addToGroup = await groupRef
          .update({
            members: firebase.firestore.FieldValue.arrayUnion(user.id),
          })
          .catch((error) => alert(error));
      } else {
        setFollow("Requested");
        const requesting = await groupRef.update({
          requests: firebase.firestore.FieldValue.arrayUnion(user.id),
        });
      }
    });
  };
  const handleUnfollow = async () => {
    groupRef.get().then(async (groupDoc) => {
      const data = groupDoc.data();
      const listOfModerators = await data.moderator;
      if (listOfModerators.includes(user.id)) {
        setModerator(true);
        setNumOfMod(listOfModerators.length);
      }
    });

    if (moderator && numOfMod < 2) {
      alert("You cannot unfollow this group since you are the last moderator");
    } else {
      setFollow("Follow");
      const removeGroup = await usersRef
        .update({
          groups: firebase.firestore.FieldValue.arrayRemove(title),
        })
        .catch((error) => alert(error));
      const requesting = await groupRef.update({
        requests: firebase.firestore.FieldValue.arrayRemove(user.id),
      });
      const removeFromGroup = await groupRef
        .update({
          members: firebase.firestore.FieldValue.arrayRemove(user.id),
          moderator: firebase.firestore.FieldValue.arrayRemove(user.id),
        })
        .catch((error) => alert(error));
    }
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
            {
              backgroundColor:
                follow == "Following"
                  ? colors.primary
                  : follow == "Follow"
                  ? colors.white
                  : colors.secondary,
            },
          ]}
          onPress={follow == "Follow" ? handleFollow : handleUnfollow}
        >
          <Text
            style={{ color: follow != "Follow" ? colors.light : colors.medium }}
          >
            {follow}
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
