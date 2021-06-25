import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import moment from "moment";
import { firebase } from "../../../firebase/config";

import colors from "../../config/colors";
import Text from "../Text";
import VoteCounter from "../VoteCounter";
import AddButton from "./AddButton";
import IgnoreButton from "./IgnoreButton";
import AuthContext from "../../auth/context";

function ListItem({ title, date, time, score, id }) {
  const [visible, setVisible] = useState(true);
  const { user } = useContext(AuthContext);

  const userRef = firebase.firestore().collection("users").doc(user.id);

  function handleAdd() {
    userRef
      .update({
        selectedEvents: firebase.firestore.FieldValue.arrayUnion(id),
      })
      .catch((error) => alert(error));
    setVisible(false);
  }

  if (visible) {
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.date}>{moment(date).format("DD MMMM YYYY")}</Text>
          <Text style={styles.time}>{moment(time).format("hh : mm")}</Text>
          <Text style={styles.title} numberOfLines={3}>
            {title}
          </Text>
          <VoteCounter originalScore={score} id={id} />
        </View>
        <View style={styles.buttonContainer}>
          <AddButton onPress={handleAdd} />
          <IgnoreButton onPress={() => setVisible(false)} />
        </View>
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: colors.silver,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoContainer: {},
  buttonContainer: {
    justifyContent: "space-between",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  date: {
    fontSize: 20,
  },
  time: {
    fontSize: 20,
    paddingBottom: 10,
  },
});

export default ListItem;
