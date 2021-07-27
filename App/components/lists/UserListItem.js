import React, { useContext, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { firebase } from "../../../firebase/config";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../../config/colors";
import Text from "../Text";
import AuthContext from "../../auth/context";

function UserListItem({ title, image, userId, groupId }) {
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);

  const usersRef = firebase.firestore().collection("users").doc(userId);
  const groupRef = firebase.firestore().collection("groups").doc(groupId);

  const handleAccept = async () => {
    setAccept(true);
    const addGroup = await usersRef
      .update({
        groups: firebase.firestore.FieldValue.arrayUnion(groupId),
      })
      .catch((error) => alert(error));
    const addToGroup = await groupRef
      .update({
        members: firebase.firestore.FieldValue.arrayUnion(userId),
      })
      .catch((error) => alert(error));
    const resolveRequest = await groupRef
      .update({
        requests: firebase.firestore.FieldValue.arrayRemove(userId),
      })
      .catch((error) => alert(error));
  };
  const handleReject = async () => {
    setReject(true);
    const rejectRequest = await groupRef
      .update({
        requests: firebase.firestore.FieldValue.arrayRemove(userId),
      })
      .catch((error) => alert(error));
  };

  return (
    <TouchableHighlight>
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
          {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
        <View style={styles.textSegment}>
          <Text numberOfLines={1} style={styles.title} adjustsFontSizeToFit>
            {title}
          </Text>
          {!accept && !reject && (
            <View>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleAccept}
              >
                <Text style={{ color: colors.light }}>{"Accept"}</Text>
              </TouchableOpacity>
              <View style={{ height: 10 }} />
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.secondary }]}
                onPress={handleReject}
              >
                <Text style={{ color: colors.light }}>{"Reject"}</Text>
              </TouchableOpacity>
            </View>
          )}
          {accept && <Text style={{ color: colors.medium }}>Accepted</Text>}
          {reject && <Text style={{ color: colors.medium }}>Rejected</Text>}
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  containter: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "flex-start",
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: colors.white,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  icon: {},
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
    height: 30,
    width: 75,
    borderRadius: 15,
  },
});

export default UserListItem;
