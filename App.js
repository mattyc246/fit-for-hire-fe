import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import socketIO from "socket.io-client";
import AppNavigator from "./navigation/AppNavigator";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const socket = socketIO("http://192.168.1.71:5001", {
      transports: ["websocket"],
      jsonp: false
    });
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
