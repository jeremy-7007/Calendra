import React, { useState } from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFormikContext } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ErrorMessage from "./ErrorMessage";
import colors from "../../config/colors";
import Text from "../Text";
import moment from "moment";

function DatePicker({ name, defaultDate, width }) {
  const { setFieldValue, errors, touched } = useFormikContext();

  const [date, setDate] = useState(defaultDate || new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setFieldValue(name, currentDate);
  };

  return (
    <View style={[styles.container, { width }]}>
      <TouchableWithoutFeedback onPress={() => setShow(true)}>
        <View style={styles.rowContainer}>
          <MaterialCommunityIcons
            name="calendar-month"
            size={25}
            color={colors.medium}
            style={styles.icon}
          />
          <Text>{moment(date).format("DD MMMM YYYY")}</Text>
        </View>
      </TouchableWithoutFeedback>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
      {show && (
        <DateTimePicker
          value={date}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    padding: 15,
    marginVertical: 10,
  },
  rowContainer: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 10,
  },
});

export default DatePicker;
