import React from "react";
import {
  Text,
  AsyncStorage,
  SafeAreaView,
  StyleSheet,
  View,
  Dimensions,
  Image
} from "react-native";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoading: true
    };
  }

  componentDidMount = async () => {
    const userLoggedIn = await AsyncStorage.getItem("userTokenF4H");

    setTimeout(() => {
      this.setState({
        userLoading: false
      });

      this.props.navigation.navigate(userLoggedIn ? "Main" : "Auth");
    }, 5000);
  };

  render() {
    return (
      <SafeAreaView style={styles.mainBody}>
        <View style={styles.centerContainer}>
          <Image
            source={require("../assets/images/761.gif")}
            style={{ marginBottom: 50 }}
          />
          <Text style={styles.centerText}>
            {this.state.userLoading
              ? "Verifying User... Wait a while"
              : "Loaded"}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default AuthLoadingScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    backgroundColor: "#cbe5f8"
  },
  centerContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%"
  },
  centerText: {
    textAlign: "center"
  }
});
