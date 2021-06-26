import React, { useState } from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useFormikContext } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ErrorMessage from "./ErrorMessage";
import colors from "../../config/colors";
import Text from "../Text";
import moment from "moment";

function TimePicker({ name, defaultTime, width }) {
  const { setFieldValue, errors, touched } = useFormikContext();

  const [time, setTime] = useState(defaultTime || new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShow(false);
    setTime(currentTime);
    setFieldValue(name, currentTime);
  };

  return (
    <View style={[styles.container, { width }]}>
      <TouchableWithoutFeedback onPress={() => setShow(true)}>
        <View style={styles.rowContainer}>
          <MaterialCommunityIcons
            name="clock"
            size={25}
            color={colors.medium}
            style={styles.icon}
          />
          <Text>{moment(time).format("hh : mm")}</Text>
        </View>
      </TouchableWithoutFeedback>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
      {show && (
        <DateTimePicker
          value={time}
          mode={"time"}
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

export default TimePicker;
