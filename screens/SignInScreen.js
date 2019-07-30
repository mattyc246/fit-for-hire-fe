import React from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";

class AuthorizationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/images/f4h.png")}
          style={styles.mainLogo}
        />
        <Text style={styles.headingText}>Login</Text>
        <Text style={styles.mainText}>
          If you are a new user, you can register for an account first, it's
          free.
        </Text>
        <TextInput
          name="username"
          onChangeText={username => this.setState({ username })}
          style={styles.inputField}
          value={this.state.username}
          placeholder={"Enter Username"}
        />
        <TextInput
          name="password"
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          style={styles.inputField}
          value={this.state.username}
          placeholder={"Enter Password"}
        />
      </View>
    );
  }
}

export default AuthorizationScreen;

AuthorizationScreen.navigationOptions = {
  title: "Login",
  headerStyle: {
    backgroundColor: "#9ECFF2"
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#cbe5f8"
  },
  mainLogo: {
    width: "80%",
    alignSelf: "center"
  },
  headingText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#3c444a"
  },
  mainText: {
    textAlign: "center",
    color: "#3c444a",
    width: "60%",
    alignSelf: "center"
  },
  inputField: {
    marginTop: 20,
    alignSelf: "center",
    width: "70%",
    borderBottomWidth: 1,
    padding: 10,
    borderBottomColor: "#000000"
  }
});
