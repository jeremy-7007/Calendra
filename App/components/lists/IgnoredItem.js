import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import moment from "moment";
import { firebase } from "../../../firebase/config";

import Text from "../Text";
import CrossButton from "./CrossButton";
import colors from "../../config/colors";
import AuthContext from "../../auth/context";

function IgnoredItem({ dateTime, title, id, deleteCall }) {
  const { user } = useContext(AuthContext);

  const userRef = firebase.firestore().collection("users").doc(user.id);

  function onDelete() {
    userRef
      .get()
      .then(() => {
        var userUpdate = {
          ignoredEvents: firebase.firestore.FieldValue.arrayRemove(id),
        };
        userRef.update(userUpdate).catch((error) => alert(error));
        deleteCall();
      })
      .catch((error) => alert(error));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{moment(dateTime).format("DD MMMM YYYY")}</Text>
      <Text style={styles.time}>{moment(dateTime).format("HH : mm")}</Text>
      <Text style={styles.title} numberOfLines={3}>
        {title}
      </Text>
      <CrossButton onPress={() => onDelete()} style={styles.delete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: colors.silver,
    padding: 20,
  },
  date: {
    fontSize: 20,
  },
  time: {
    fontSize: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  delete: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default IgnoredItem;
