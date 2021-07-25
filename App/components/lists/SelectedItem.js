import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import moment from "moment";
import { firebase } from "../../../firebase/config";
import * as Notifications from "expo-notifications";

import Text from "../Text";
import CrossButton from "./CrossButton";
import Picker from "../AppPicker";
import colors from "../../config/colors";
import AuthContext from "../../auth/context";
import MemoBox from "../MemoBox";

function SelectedItem({
  dateTime,
  title,
  id,
  deleteCall,
  importedMemo,
  importedNotif,
  groupName,
}) {
  const [value, setValue] = useState(importedNotif);
  const { user } = useContext(AuthContext);

  const userRef = firebase.firestore().collection("users").doc(user.id);

  const options = [
    "At event time",
    "1 hour before",
    "1 day before",
    "1 week before",
  ];

  const notificationContent = { title: "Event reminder", body: title };

  async function onDelete() {
    userRef
      .get()
      .then(async (doc) => {
        const notif = await doc.data().notificationIds;
        const eventNotif = await notif[id];
        const identifier = (await eventNotif) ? eventNotif[0] : null;
        if (identifier) {
          await Notifications.cancelScheduledNotificationAsync(identifier);
        }
      })
      .then(() => {
        var userUpdate = {
          selectedEvents: firebase.firestore.FieldValue.arrayRemove(id),
        };
        userUpdate[`notificationIds.${id}`] =
          firebase.firestore.FieldValue.delete();
        userUpdate[`memos.${id}`] = firebase.firestore.FieldValue.delete();
        userRef.update(userUpdate).catch((error) => alert(error));
        deleteCall();
      })
      .catch((error) => alert(error));
  }

  function onValueChange(newValue) {
    if (newValue !== value) {
      var timeChange = 0;
      switch (newValue) {
        case options[0]:
          timeChange = 0;
          break;
        case options[1]:
          timeChange = -(60 * 60);
          break;
        case options[2]:
          timeChange = -(60 * 60 * 24);
          break;
        case options[3]:
          timeChange = -(60 * 60 * 24 * 7);
      }
      userRef
        .get()
        .then(async (doc) => {
          const notif = await doc.data().notificationIds;
          const identifier = await notif[id][0];
          if (identifier) {
            await Notifications.cancelScheduledNotificationAsync(identifier);
          }
        })
        .then(async () => {
          const newIdentifier = await Notifications.scheduleNotificationAsync({
            content: notificationContent,
            trigger: new Date(dateTime.getTime() + timeChange),
          });
          var userUpdate = {};
          userUpdate[`notificationIds.${id}`] = [newIdentifier, newValue];
          userRef.update(userUpdate).catch((error) => alert(error));
        })
        .catch((error) => alert(error));
    }
    setValue(newValue);
  }

  function handleSaveMemo(newMemo) {
    var userUpdate = {};
    userUpdate[`memos.${id}`] = newMemo;
    userRef.update(userUpdate).catch((error) => alert(error));
  }

  return (
    <View style={styles.container}>
      <CrossButton onPress={() => onDelete()} style={styles.delete} />
      <Text style={styles.date}>{moment(dateTime).format("DD MMMM YYYY")}</Text>
      <Text style={styles.time}>{moment(dateTime).format("HH : mm")}</Text>
      <Text style={styles.title} numberOfLines={3}>
        {title}
      </Text>
      <MemoBox
        onSave={(newMemo) => handleSaveMemo(newMemo)}
        importedMemo={importedMemo}
      />
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
      <View style={styles.groupLine}>
        <Text>Group: </Text>
        <Text style={styles.groupName}>{groupName}</Text>
      </View>
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
  groupLine: {
    flexDirection: "row",
    marginTop: 10,
  },
  groupName: {
    fontStyle: "italic",
  },
});

export default SelectedItem;
