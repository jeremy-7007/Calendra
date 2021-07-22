import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import { firebase } from "../../firebase/config";

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import BackButton from "../components/BackButton";
import routes from "../navigation/routes";
import Text from "../components/Text";
import MomentPicker from "../components/forms/MomentPicker";
import ActivityIndicator from "../components/ActivityIndicator";

const validationSchema = Yup.object().shape({
  eventTitle: Yup.string().required().label("Event title"),
});

function AddPostScreen({ navigation, route }) {
  const { group } = route.params;
  const [dateTime, setDateTime] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const eventsRef = firebase.firestore().collection("events");
  const groupRef = firebase.firestore().collection("groups").doc(group);

  const onChange = (currentDate) => setDateTime(currentDate);

  const handleSubmit = ({ eventTitle, dateTime }) => {
    setLoading(true);
    const postedAt = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      title: eventTitle,
      dateTime,
      score: 0,
      postedAt,
      group,
    };
    eventsRef
      .add(data)
      .then((docRef) => {
        docRef
          .update({
            id: docRef.id,
          })
          .catch((error) => alert(error));
        groupRef
          .update({
            events: firebase.firestore.FieldValue.arrayUnion(docRef.id),
          })
          .catch((error) => alert(error));
        navigation.navigate(routes.POSTS);
      })
      .catch((error) => alert(error));
    setLoading(false);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        <BackButton
          onPress={() => navigation.navigate(routes.POSTS)}
          cancel={true}
        />
        <Text style={styles.pageTitle}>New Post</Text>
        <Form
          initialValues={{
            eventTitle: "",
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
    </>
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
