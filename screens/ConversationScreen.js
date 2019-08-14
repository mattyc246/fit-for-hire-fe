import React from "react";
import {
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Axios from "axios";
import Loader from "../components/Loader";
import socket from "../components/Socket";

class ConversationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.scroll = null;
    this.state = {
      userId: null,
      currentUser: null,
      newMessage: "",
      messages: []
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("username")
    };
  };

  setUpSocket = () => {
    socket.on("join", {
      roomNo: `${this.state.currentUser.id}-${this.state.userId}`
    });
    socket.on("message_in", data => {
      let newMessages = [...this.state.messages];

      newMessages.push({
        body: data.message,
        username: data.username
      });

      this.setState({
        messages: newMessages,
        newMessage: ""
      });
    });
  };

  handleNewMessage = () => {
    let data = {
      roomNo: `${this.state.currentUser.id}-${this.state.userId}`,
      username: this.state.currentUser.username,
      message: this.state.newMessage
    };
    socket.emit("message_out", data);
  };

  fetchChatHistory = async () => {
    console.log("fetching...");
    let JWT = await AsyncStorage.getItem("userTokenF4H");

    let config = {
      headers: {
        Authorization: `Bearer ${JWT}`
      }
    };

    let roomNo = `${this.state.currentUser.id}-${this.state.userId}`;
    Axios.get(
      `https://fitforhire.herokuapp.com/api/v1/messages/all?room_no=${roomNo}`,
      config
    ).then(response => {
      this.setState({
        messages: response.data.messages
      });
    });
  };

  componentDidMount = async () => {
    let professional = this.props.navigation.getParam("userId");
    let JWT = await AsyncStorage.getItem("userTokenF4H");

    let config = {
      headers: {
        Authorization: `Bearer ${JWT}`
      }
    };

    Axios.get("https://fitforhire.herokuapp.com/api/v1/users/me", config).then(
      results => {
        this.setState({
          currentUser: results.data.user,
          userId: professional
        });
        this.setUpSocket();
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
        <ScrollView
          style={styles.chatContainer}
          ref={scroll => (this.scroll = scroll)}
          onContentSizeChange={() =>
            this.scroll.scrollToEnd({ animated: true })
          }
        >
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
                  <Text style={styles.messageBody}>{message.body}</Text>
                  <Text style={styles.messageUsername}>{message.username}</Text>
                </View>
              );
            })
          ) : (
            <View style={styles.noChatsBox}>
              <Text style={styles.noChatsText}>
                Start your conversation now!
              </Text>
            </View>
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
    height: Dimensions.get("window").height - 165
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
  },
  noChatsBox: {
    width: Dimensions.get("window").width / 2,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 0.5,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    alignSelf: "center",
    marginTop: 200
  },
  noChatsText: {
    fontSize: 25,
    textAlign: "center"
  },
  messageBody: {
    fontSize: 15
  },
  messageUsername: {
    fontSize: 15,
    opacity: 0.5,
    marginTop: 5
  }
});
