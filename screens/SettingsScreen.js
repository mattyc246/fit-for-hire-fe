import React from "react";
import {
  AsyncStorage,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView
} from "react-native";

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
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={this.handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cbe5f8",
    padding: 15
  },
  logoutButton: {
    width: "70%",
    height: 40,
    alignSelf: "center",
    backgroundColor: "#cc3b56",
    borderRadius: 10,
    justifyContent: "center"
  },
  buttonText: {
    alignSelf: "center",
    color: "#ffffff"
  }
});

SettingsScreen.navigationOptions = {
  title: "Settings"
};

export default SettingsScreen;
