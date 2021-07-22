import React, { useState } from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFormikContext } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ErrorMessage from "./ErrorMessage";
import colors from "../../config/colors";
import Text from "../Text";
import moment from "moment";

function MomentPicker({ name, dateTime, mode, onChange, width }) {
  const { setFieldValue, errors, touched } = useFormikContext();
  const [show, setShow] = useState(false);

  const icon = mode === "date" ? "calendar-month" : "clock";
  const textFormat = mode === "date" ? "DD MMMM YYYY" : "hh : mm";

  const updateValues = (event, selectedDate) => {
    const currentDate = selectedDate || dateTime;
    currentDate.setSeconds(0);
    setShow(false);
    setFieldValue(name, currentDate);
    onChange(currentDate);
  };

  return (
    <View style={[styles.container, { width }]}>
      <TouchableWithoutFeedback onPress={() => setShow(true)}>
        <View style={styles.rowContainer}>
          <MaterialCommunityIcons
            name={icon}
            size={25}
            color={colors.medium}
            style={styles.icon}
          />
          <Text>{moment(dateTime).format(textFormat)}</Text>
        </View>
      </TouchableWithoutFeedback>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
      {show && (
        <DateTimePicker
          value={dateTime}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={updateValues}
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

export default MomentPicker;
