import React, { useContext, useState, useCallback, useEffect } from "react";
import { StyleSheet, Button } from "react-native";
import { Agenda } from "react-native-calendars";
import { firebase } from "../../firebase/config";
import { useFocusEffect } from "@react-navigation/native";

import Screen from "../components/Screen";
import ItemCard from "../components/calendar/ItemCard";
import EmptyDay from "../components/calendar/EmptyDay";
import moment from "moment";
import AuthContext from "../auth/context";
import colors from "../config/colors";

function CalendarScreen(props) {
  const [items, setItems] = useState({});
  const { user } = useContext(AuthContext);

  const userRef = firebase.firestore().collection("users").doc(user.id);
  const eventsRef = firebase.firestore().collection("events");

  function fetchEvents() {
    userRef
      .get()
      .then((userDoc) => {
        const newIds = userDoc.data().selectedEvents;
        const newItem = {};
        newIds.forEach((eventId) => {
          eventsRef
            .doc(eventId)
            .get()
            .then((doc) => {
              const event = doc.data();
              const dateField = dateFormat(event.date.toDate());
              if (!newItem.hasOwnProperty(dateField)) {
                newItem[dateField] = [event];
              } else {
                newItem[dateField].push(event);
              }
            })
            .catch((error) => alert(error));
        });
        setItems(newItem);
      })
      .catch((error) => alert(error));
  }

  function dateFormat(date) {
    return moment(date).format("YYYY-MM-DD");
  }

  useFocusEffect(useCallback(fetchEvents, []));

  return (
    <Screen>
      <Button title="Fetch" onPress={fetchEvents} />
      <Agenda
        items={items}
        renderItem={(item, firstItemInDay) => {
          return (
            <ItemCard
              startTime={moment(item.time.toDate()).format("hh : mm")}
              description={item.title}
              bookmarkColor={colors.primary}
            />
          );
        }}
        renderEmptyData={() => {
          return <EmptyDay />;
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CalendarScreen;
