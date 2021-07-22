import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/colors";

function ProfileImage({ imageUri, onChangeImage, onPress, icon }) {
  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("Please enable permission to access the library");
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) {
        onChangeImage(result.uri);
      }
    } catch (error) {
      console.log("Error reading image", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onPress ? onPress : selectImage}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            name={icon}
            size={70}
            color={colors.medium}
            style={styles.icon}
          />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    alignSelf: "center",
    margin: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ProfileImage;
