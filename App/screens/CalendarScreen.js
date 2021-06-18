import React from "react";
import { StyleSheet, View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

import Screen from "../components/Screen";
import ItemCard from "../components/calendar/ItemCard";
import EmptyDay from "../components/calendar/EmptyDay";

function CalendarScreen(props) {
  return (
    <Screen>
      <Agenda
        items={{
          "2021-06-15": [{ name: "item 1 - any js object" }],
          "2021-06-17": [{ name: "item 2 - any js object" }],
          "2021-06-20": [],
          "2021-06-22": [
            { name: "item 3 - any js object" },
            { name: "any js object" },
          ],
        }}
        renderItem={(item, firstItemInDay) => {
          return (
            <ItemCard
              startTime="12:00"
              endTime="13:00"
              description={item.name}
              bookmarkColor="blue"
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
