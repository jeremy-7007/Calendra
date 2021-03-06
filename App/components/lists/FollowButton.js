import React, { useContext, useState, useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../../config/colors";
import Text from "../Text";
import AuthContext from "../../auth/context";
import { firebase } from "../../../firebase/config";
import { useFocusEffect } from "@react-navigation/native";

function FollowButton({ title, status, style, lastMod, onPress }) {
  const { user } = useContext(AuthContext);
  const [follow, setFollow] = useState(status);

  //console.log(follow);

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
      onPress();
    }
  };

  return (
    <View>
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
          style,
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
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 100,
    borderRadius: 20,
  },
});
export default FollowButton;
