import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from "react-native";

import axios from "axios";

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleSubmit = () => {
    const { username, password } = this.state;

    if (username && password) {
      let formData = new FormData();

      formData.append("username", username);
      formData.append("password", password);

      axios
        .post("https://fitforhire.herokuapp.com/api/v1/sessions/", formData, {
          headers: { "content-type": "multipart/form-data" }
        })
        .then(response => {
          if (response.data.valid) {
            AsyncStorage.setItem("userTokenF4H", response.data.auth_token);
            Alert.alert("Logged In", "Welcome back!", [
              {
                text: "Continue",
                onPress: () => this.props.navigation.navigate("AuthLoading")
              }
            ]);
          } else {
            Alert.alert("Error", response.data.message);
          }
        })
        .catch(error => {
          console.log(error.response.data);
          Alert.alert("Error", error.response.data.message);
        });
    } else {
      Alert.alert("Error", "Please provide a username and password");
    }
  };

  handleInput = (key, value) => {
    this.setState({
      [key]: value
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
          onChangeText={username => this.handleInput("username", username)}
          style={styles.inputField}
          value={this.state.username}
          placeholder={"Enter Username"}
        />
        <TextInput
          name="password"
          secureTextEntry={true}
          onChangeText={password => this.handleInput("password", password)}
          style={styles.inputField}
          value={this.state.password}
          placeholder={"Enter Password"}
        />
        <TouchableOpacity
          style={styles.buttonSignIn}
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignInScreen;

SignInScreen.navigationOptions = {
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
    marginTop: 20,
    textAlign: "center",
    color: "#3c444a",
    width: "60%",
    alignSelf: "center"
  },
  inputField: {
    marginTop: 30,
    alignSelf: "center",
    width: "70%",
    borderBottomWidth: 1,
    padding: 10,
    borderBottomColor: "#000000"
  },
  buttonSignIn: {
    width: "50%",
    height: 40,
    backgroundColor: "#0ABAB5",
    alignSelf: "center",
    justifyContent: "center",
    margin: 30,
    borderRadius: 10
  },
  buttonText: {
    textAlign: "center"
  }
});
