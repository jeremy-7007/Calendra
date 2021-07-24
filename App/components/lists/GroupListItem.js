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

function GroupListItem({ title, image, onPress }) {
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
      } else {
        setFollow("Requested");
        const requesting = await groupRef.update({
          requests: firebase.firestore.FieldValue.arrayUnion(user.id),
        });
      }
    });
  };
  const handleUnfollow = async () => {
    setFollow("Follow");
    const removeGroup = await usersRef
      .update({
        groups: firebase.firestore.FieldValue.arrayRemove(title),
      })
      .catch((error) => alert(error));
    const requesting = await groupRef.update({
      requests: firebase.firestore.FieldValue.arrayRemove(user.id),
    });
  };

  return (
    <TouchableHighlight underlayColor={colors.primary} onPress={onPress}>
      <View style={styles.containter}>
        <Image style={styles.image} source={image} />
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
    height: 40,
    width: 100,
    borderRadius: 20,
  },
});

export default GroupListItem;
