import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import { firebase } from "../../firebase/config";

import AuthContext from "../auth/context";
import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import BackButton from "../components/BackButton";
import routes from "../navigation/routes";
import Text from "../components/Text";
import MomentPicker from "../components/forms/MomentPicker";

const validationSchema = Yup.object().shape({
  eventTitle: Yup.string().required().label("Event title"),
});

function AddPostScreen({ navigation }) {
  const authContext = useContext(AuthContext);
  const eventRef = firebase.firestore().collection("events");
  const [dateTime, setDateTime] = useState(new Date());

  const onChange = (currentDate) => setDateTime(currentDate);

  const handleSubmit = async ({ eventTitle, groupName, dateTime }) => {
    const postedAt = firebase.firestore.FieldValue.serverTimestamp();
    const eventId = groupName + ": " + eventTitle + " at " + dateTime;

    if (eventRef.doc(eventId).get().exists) {
      alert("Event already exists");
      return;
    };

    const data = {
      eventTitle,
      group: groupName,
      dateTime,
      score: 0,
      postedAt,
    };
    eventRef
      .doc(eventId)
      .set(data)
      .then(() => navigation.navigate(routes.POSTS))
      .catch((error) => alert(error));

    const groupRef = firebase.firestore().collection("groups").doc(groupName);

    const addEventToGroup = await groupRef.update({
      events: firebase.firestore.FieldValue.arrayUnion(eventId)
    }).catch((error) => alert(error));

    const userId = authContext.user.id;
    const usersRef = firebase.firestore().collection("users").doc(userId);
    const addEventToUser = await usersRef.update({
      selectedEvents: firebase.firestore.FieldValue.arrayUnion(eventId)
    }).catch((error) => alert(error));

  };

  return (
    <Screen style={styles.container}>
      <BackButton
        onPress={() => navigation.navigate(routes.POSTS)}
        cancel={true}
      />
      <Text style={styles.pageTitle}>NEW POST</Text>
      <Form
        initialValues={{
          eventTitle: "",
          groupName: "",
          dateTime: new Date(),
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          name="eventTitle"
          placeholder="Add a short title"
          icon="format-title"
        />
        <FormField
          name="groupName"
          placeholder="Add group"
          icon="format-title"
        />
        <MomentPicker
          name="dateTime"
          dateTime={dateTime}
          mode="date"
          onChange={onChange}
        />
        <MomentPicker
          name="dateTime"
          dateTime={dateTime}
          mode="time"
          onChange={onChange}
        />
        <SubmitButton title="Post Event" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    margin: 30,
  },
});

export default AddPostScreen;
