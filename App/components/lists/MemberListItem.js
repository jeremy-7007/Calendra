import React, { useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";
import Text from "../Text";
import { firebase } from "../../../firebase/config";

function MemberListItem({ title, imageUri, userId, groupId, mod }) {
  const [add, setAdd] = useState(false);
  const [kick, setKick] = useState(false);

  const groupRef = firebase.firestore().collection("groups").doc(groupId);
  const userRef = firebase.firestore().collection("users").doc(userId);

  groupRef.get().then(async (doc) => {
    const data = await doc.data();
    const listOfMods = data.moderator;
    if (listOfMods.includes(userId)) setAdd(true);
  });

  const handleAddMod = async () => {
    setAdd(true);
    const addToGroupMod = await groupRef
      .update({
        moderator: firebase.firestore.FieldValue.arrayUnion(userId),
        members: firebase.firestore.FieldValue.arrayRemove(userId),
      })
      .catch((error) => alert(error));
  };

  const handleKick = async () => {
    setKick(true);
    const kickFromGroup = await groupRef
      .update({
        members: firebase.firestore.FieldValue.arrayRemove(userId),
      })
      .catch((error) => alert(error));
    const removeFromUser = await userRef
      .update({
        groups: firebase.firestore.FieldValue.arrayRemove(groupId),
      })
      .catch((error) => alert(error));
  };

  return (
    <TouchableHighlight>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {!imageUri && (
            <MaterialCommunityIcons
              name={"account-group"}
              size={30}
              color={colors.medium}
              style={styles.icon}
            />
          )}
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}
        </View>
        <View style={styles.textSegment}>
          <Text numberOfLines={1} style={styles.name}>
            {title}
          </Text>
          {!add && mod && (
            <View>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleAddMod}
              >
                <Text style={{ color: colors.light }}>{"Add"}</Text>
              </TouchableOpacity>
            </View>
          )}
          {!kick && !add && !mod && (
            <View>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleKick}
              >
                <Text style={{ color: colors.light }}>{"Kick"}</Text>
              </TouchableOpacity>
            </View>
          )}
          {kick && <Text style={{ color: colors.medium }}>Kicked</Text>}
          {add && <Text style={{ color: colors.medium }}>Moderator</Text>}
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
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
    marginRight: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  name: {},
  icon: {},
  textSegment: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 75,
    borderRadius: 15,
  },
});

export default MemberListItem;
