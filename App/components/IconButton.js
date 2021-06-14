import React from "react";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

function IconButton({ icon, size, color, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Entypo name={icon} size={size} color={color} />
    </TouchableOpacity>
  );
}

export default IconButton;
