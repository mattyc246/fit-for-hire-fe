import React from "react";
import { View, Image, StyleSheet, Dimensions, Text } from "react-native";

const Loader = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.centerMe}
        source={require("../assets/images/799.gif")}
      />
      <Text style={styles.centerMe}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height - 40,
    width: Dimensions.get("screen").width,
    justifyContent: "center"
  },
  centerMe: {
    alignSelf: "center"
  }
});

export default Loader;
