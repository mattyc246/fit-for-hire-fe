import React from "react";
import { AsyncStorage, TouchableOpacity, Text } from "react-native";

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    AsyncStorage.removeItem("userTokenF4H");
    this.props.navigation.navigate("AuthLoading");
  };

  render() {
    return (
      <TouchableOpacity onPress={this.handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    );
  }
}

SettingsScreen.navigationOptions = {
  title: "app.json"
};

export default SettingsScreen;
