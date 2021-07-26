import React, { useContext, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import colors from "../../config/colors";
import Text from "../Text";
import AuthContext from "../../auth/context";
import { firebase } from "../../../firebase/config";

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
        members: firebase.firestore.FieldValue.arrayUnion(user.id),
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
    <TouchableHighlight underlayColor={colors.primary}>
      <View style={styles.containter}>
        <Image style={styles.image} source={image} />
        <Text numberOfLines={1} style={styles.title}>
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
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  containter: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    justifyContent: "flex-start",
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
    backgroundColor: "grey",
  },
  title: {
    width: 150,
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
