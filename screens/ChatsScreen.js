import React from "react";
import {
  ScrollView,
  StyleSheet,
  Alert,
  AsyncStorage,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import Axios from "axios";

class ChatsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: []
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", async () => {
      let jwt = await AsyncStorage.getItem("userTokenF4H");

      let config = {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      };

      Axios.get(
        "https://fitforhire.herokuapp.com/api/v1/chats/active_chats",
        config
      )
        .then(response => {
          this.setState({ chats: response.data.chats });
        })
        .catch(error => {
          Alert.alert("Error", "Something went wrong :(");
        });
    });
  };

  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.chats.length > 0 ? (
          this.state.chats.map(chat => {
            return (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("Chat", {
                    userId: chat.professional.id,
                    username: chat.professional.username
                  })
                }
                key={chat.room_no}
                style={styles.titleBox}
              >
                <Image
                  source={require("../assets/images/robot-dev.png")}
                  style={styles.chatImage}
                />
                <Text style={styles.chatText}>
                  {chat.professional.username}
                </Text>
              </TouchableOpacity>
            );
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
    height: 70,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 15,
    paddingLeft: 25,
    paddingRight: 25
  },
  chatText: {
    fontSize: 20,
    alignSelf: "center"
  },
  noChatsText: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: Dimensions.get("window").height / 2.4,
    textAlign: "center"
  },
  chatImage: {
    height: 50,
    width: 50,
    borderRadius: 5,
    alignSelf: "center"
  }
});
