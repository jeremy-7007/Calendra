import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import { firebase } from "../../firebase/config";

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import BackButton from "../components/BackButton";
import routes from "../navigation/routes";
import Text from "../components/Text";
import DatePicker from "../components/forms/DatePicker";
import TimePicker from "../components/forms/TimePicker";

const validationSchema = Yup.object().shape({
  eventTitle: Yup.string().required().label("Event title"),
});

function AddPostScreen({ navigation }) {
  const eventRef = firebase.firestore().collection("events");
  const current = new Date();

  const handleSubmit = ({ eventTitle, date, time }) => {
    const postedAt = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      title: eventTitle,
      date,
      time,
      score: 0,
      postedAt,
    };
    eventRef
      .add(data)
      .then(() => navigation.navigate(routes.POSTS))
      .catch((error) => alert(error));
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
          date: current,
          time: current,
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormField
          name="eventTitle"
          placeholder="Add a short title"
          icon="format-title"
        />
        <DatePicker name="date" defaultDate={current} />
        <TimePicker name="time" defaultTime={current} />
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
