import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  KeyboardAvoidingView
} from "react-native";

const { width, height } = Dimensions.get("window");

function Comments(props) {
  return <View style={{ flex: 1, backgroundColor: "red" }}></View>;
}

const styles = StyleSheet.create({
  container: { width: "100%", height: height }
});

export default Comments;
