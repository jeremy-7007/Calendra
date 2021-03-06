import React, { useContext, useState, useEffect } from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { firebase } from "../../../firebase/config";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "../Text";
import colors from "../../config/colors";
import AuthContext from "../../auth/context";

function GroupListItem({ title, image, onPress, lastMod }) {
  const { user } = useContext(AuthContext);
  const [follow, setFollow] = useState("Following");

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
    if (lastMod) {
      alert(
        "You cannot unfollow *" +
          title +
          "* since you are the last moderator of this group"
      );
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

  const reRender = () => {
    onPress();
  };

  useEffect(() => {
    //setFollow("Following");
    usersRef.get().then((userDoc) => {
      const data = userDoc.data();
      if (data.groups.includes(title)) setFollow("Following");
    });
  });

  return (
    <TouchableOpacity onPress={reRender}>
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
        <View style={styles.textSegment}>
          <Text numberOfLines={1} style={styles.title} adjustsFontSizeToFit>
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
              style={{
                color: follow != "Follow" ? colors.light : colors.medium,
              }}
              adjustsFontSizeToFit
              numberOfLines={1}
            >
              {follow}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containter: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20,
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
    width: "55%",
  },
  textSegment: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: "40%",
    borderRadius: 20,
    paddingHorizontal: 5,
  },
  icon: {},
});

export default GroupListItem;
