import React, { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MicrophoneIcon from "../assets/icons/microphone.svg";
import { useTheme } from "../hooks";

export const MicrophoneComponent: FC = () => {
  const { colors: { secondary } } = useTheme();
  return (
    <TouchableOpacity style={[styles.microphoneButton, { backgroundColor: secondary }]}>
      <MicrophoneIcon width={25} height={25} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  microphoneButton: {
    padding: 20,
    position: "absolute",
    right: 20,
    bottom: 20,
    borderRadius: 40,
  },
});