import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import moment from "moment";

import Text from "../Text";
import IgnoreButton from "./IgnoreButton";
import Picker from "../AppPicker";
import colors from "../../config/colors";

function SelectedItem({ dateTime, title, id }) {
  const [value, setValue] = useState();

  const options = [
    "At event time",
    "1 hour before",
    "1 day before",
    "1 week before",
  ];

  function onDelete() {}

  function onValueChange() {}

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{moment(dateTime).format("DD MMMM YYYY")}</Text>
      <Text style={styles.time}>{moment(dateTime).format("hh : mm")}</Text>
      <Text style={styles.title} numberOfLines={3}>
        {title}
      </Text>
      <View style={styles.pickerBar}>
        <Text style={styles.pickerText}>Notification:</Text>
        <Picker
          value={value}
          onValueChange={onValueChange}
          optionList={options}
          containerStyle={styles.pickerContainer}
          pickerStyle={styles.picker}
          mode="dropdown"
        />
      </View>
      <IgnoreButton onPress={onDelete} style={styles.delete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: colors.silver,
    padding: 20,
  },
  buttonContainer: {
    justifyContent: "center",
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
  pickerBar: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  pickerText: {
    fontSize: 20,
  },
  pickerContainer: {
    width: "63%",
  },
  picker: {
    backgroundColor: colors.light,
    height: 45,
  },
  delete: {
    position: "absolute",
    top: 20,
    right: 20,
  },
});

export default SelectedItem;
