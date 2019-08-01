import React from "react";
import { ScrollView, StyleSheet, Image, Text, TextInput } from "react-native";
import DateModal from "../components/DateModal";
import { TouchableOpacity } from "react-native-gesture-handler";

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      username: "",
      password: "",
      confirmPw: "",
      phoneNumber: "",
      dateOfBirth: new Date(),
      modalVisible: false
    };
  }

  setModalVisible = value => {
    this.setState({
      modalVisible: value
    });
  };

  handleInput = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  handleDateOfBirth = date => {
    this.setState({
      dateOfBirth: date
    });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Image
          source={require("../assets/images/f4h.png")}
          style={styles.mainLogo}
        />
        <Text style={styles.headingText}>Sign Up</Text>
        <Text style={styles.mainText}>
          Register for an account to get started with Fit 4 Hire. Once you have
          registered you can gain access to thousands of experts in the field of
          health and fitness.
        </Text>
        <TextInput
          name="fullName"
          onChangeText={fullName => this.handleInput("fullName", fullName)}
          style={styles.inputField}
          value={this.state.fullName}
          placeholder={"Enter Full Name"}
        />
        <TextInput
          name="username"
          onChangeText={username => this.handleInput("username", username)}
          style={styles.inputField}
          value={this.state.username}
          placeholder={"Choose a Username"}
        />
        <TextInput
          name="phoneNumber"
          onChangeText={phoneNumber =>
            this.handleInput("phoneNumber", phoneNumber)
          }
          style={styles.inputField}
          value={this.state.phoneNumber}
          placeholder={"Enter Phone Number (+60123456789)"}
        />
        <DateModal
          modalVisible={this.state.modalVisible}
          setModalVisible={this.setModalVisible}
          dateOfBirth={this.state.dateOfBirth}
          handleDateOfBirth={this.handleDateOfBirth}
        />
        <TextInput
          name="password"
          secureTextEntry={true}
          onChangeText={password => this.handleInput("password", password)}
          style={styles.inputField}
          value={this.state.password}
          placeholder={"Choose Password: min 6-12 characters"}
        />
        <TextInput
          name="confirmPw"
          secureTextEntry={true}
          onChangeText={confirmPw => this.handleInput("confirmPw", confirmPw)}
          style={styles.inputField}
          value={this.state.confirmPw}
          placeholder={"Confirm Password"}
        />
        <Text style={styles.mainText}>
          By clicking agree you agree to all terms and conditions of registering
          with Fit 4 Hire.
        </Text>
        <TouchableOpacity style={styles.buttonSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default SignUpScreen;

SignUpScreen.navigationOptions = {
  title: "Sign Up",
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
    width: "80%",
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
  buttonSignUp: {
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
