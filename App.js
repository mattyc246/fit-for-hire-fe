import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import socket from "./components/Socket";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    socket.connect();
    socket.on("connect", () => {
      console.log("Chat Server Connected!");
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
