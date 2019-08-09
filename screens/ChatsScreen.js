import React from "react";
import {
  ScrollView,
  StyleSheet,
  Alert,
  AsyncStorage,
  View,
  Text,
  Dimensions
} from "react-native";
import socketIO from "socket.io-client";
import Axios from "axios";

class ChatsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: []
    };
  }

  componentDidMount = async () => {
    let jwt = await AsyncStorage.getItem("userTokenF4H");

    let config = {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    };

    Axios.get("http://192.168.1.71:5000/api/v1/chats/active_chats", config)
      .then(response => {
        this.setState({ chats: response.data.chats });
      })
      .catch(error => {
        Alert.alert("Error", "Something went wrong :(");
      });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.chats.length > 0 ? (
          this.state.chats.map(chat => {
            return <View style={styles.titleBox} />;
          })
        ) : (
          <Text style={styles.noChatsText}>No Chats Available</Text>
        )}
      </ScrollView>
    );
  }
}

export default ChatsScreen;

ChatsScreen.navigationOptions = {
  title: "Chats"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cbe5f8"
  },
  titleBox: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    height: 50,
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 15
  },
  noChatsText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: Dimensions.get("window").height / 2.4,
    textAlign: "center"
  }
});
