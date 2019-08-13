import React from "react";
import {
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity
} from "react-native";
import Axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import Loader from "../components/Loader";

class ConversationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      currentUser: null,
      newMessage: "",
      messages: [
        {
          body:
            "Hello it a me mario and i am the greatest person of all time at playing super mario",
          username: "mattyc246"
        },
        {
          body:
            "Hello it a me luigi and i am the second greatest person of all time at playing super mario",
          username: "sansan123"
        }
      ]
    };
  }

  handleNewMessage = () => {
    let newMessages = [...this.state.messages];

    newMessages.push({
      body: this.state.newMessage,
      username: this.state.currentUser.username
    });

    this.setState({
      messages: newMessages,
      newMessage: ""
    });
  };

  fetchChatHistory = () => {
    console.log("fetching...");
  };

  componentDidMount = async () => {
    let professional = this.props.navigation.getParam("userId");
    let JWT = await AsyncStorage.getItem("userTokenF4H");

    let config = {
      headers: {
        Authorization: `Bearer ${JWT}`
      }
    };

    Axios.get("http://192.168.1.71:5000/api/v1/users/me", config).then(
      results => {
        this.setState({
          currentUser: results.data.user,
          userId: professional
        });
        this.fetchChatHistory();
      }
    );
  };

  render() {
    if (!this.state.currentUser) {
      return (
        <View style={styles.body}>
          <Loader />
        </View>
      );
    }
    return (
      <KeyboardAvoidingView
        style={styles.body}
        behavior="height"
        keyboardVerticalOffset={60}
        enabled
      >
        <ScrollView style={styles.chatContainer}>
          {this.state.messages.length > 0 ? (
            this.state.messages.map((message, index) => {
              return (
                <View
                  key={index}
                  style={
                    message.username === this.state.currentUser.username
                      ? styles.chatBoxMe
                      : styles.chatBoxOther
                  }
                >
                  <Text>{message.body}</Text>
                  <Text>{message.username}</Text>
                </View>
              );
            })
          ) : (
            <Text>Start your conversation now!</Text>
          )}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={newMessage => this.setState({ newMessage })}
            style={styles.inputBox}
            value={this.state.newMessage}
          />
          <TouchableOpacity
            onPress={this.handleNewMessage}
            style={styles.inputButton}
          >
            <Text style={styles.inputText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default ConversationScreen;

const styles = StyleSheet.create({
  chatBoxMe: {
    alignSelf: "flex-end",
    width: Dimensions.get("window").width * 0.45,
    padding: 5,
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    borderColor: "#bffa87",
    borderWidth: 1,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    margin: 10
  },
  chatBoxOther: {
    alignSelf: "flex-start",
    width: Dimensions.get("window").width * 0.45,
    padding: 5,
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    borderColor: "#f05b5b",
    borderWidth: 1,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    margin: 10
  },
  body: {
    flex: 1,
    flexDirection: "row",
    height: Dimensions.get("window").height,
    backgroundColor: "#cbe5f8"
  },
  chatContainer: {
    height: Dimensions.get("window").height - 50
  },
  inputBox: {
    width: Dimensions.get("window").width - 100,
    padding: 5,
    backgroundColor: "whitesmoke",
    height: 40,
    alignSelf: "center"
  },
  inputButton: {
    flex: 1,
    width: 100,
    height: 40,
    backgroundColor: "#c080ed",
    color: "white",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  inputText: {
    textAlign: "center",
    color: "white",
    alignSelf: "center",
    fontSize: 20
  },
  inputContainer: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    height: 50,
    position: "absolute",
    bottom: 0
  }
});
