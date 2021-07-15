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

function GroupList({ title, image, onPress }) {
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
    <TouchableHighlight underlayColor={colors.primary} onPress={onPress}>
      <View style={styles.containter}>
        <Image style={styles.image} source={image} />
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

export default GroupList;
