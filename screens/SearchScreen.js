import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  AsyncStorage
} from "react-native";
import SearchModal from "../components/SearchModal";
import UserCard from "../components/UserCard";
import Axios from "axios";

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      searchResults: []
    };
  }

  performSearch = async query => {
    this.setState({
      isSearching: true
    });

    let jwt = await AsyncStorage.getItem("userTokenF4H");

    let config = {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    };

    Axios.get(
      `https://fitforhire.herokuapp.com/api/v1/users/search?q=${query}`,
      config
    )
      .then(response => {
        this.setState({
          searchResults: response.data.users,
          isSearching: false
        });
      })
      .catch(error => {
        Alert.alert("Error", error.response.data.message);
      });
  };

  handleChat = async userId => {
    let jwt = await AsyncStorage.getItem("userTokenF4H");

    let config = {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    };

    let data = {
      p_id: userId
    };

    Axios.post("https://fitforhire.herokuapp.com/api/v1/chats/", data, config)
      .then(response => {
        if (response.data.ok) {
          this.props.navigation.navigate("Chat", {
            userId: userId
          });
        }
      })
      .catch(error => {
        Alert.alert(
          "Error",
          "Something went wrong, we are fixing it as we speak."
        );
      });
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <SearchModal performSearch={this.performSearch} />
        {this.state.isSearching ? (
          <View>
            <Image
              source={require("../assets/images/805.gif")}
              style={styles.searchingLoader}
            />
            <Text style={styles.searchingText}>Searching...</Text>
          </View>
        ) : this.state.searchResults.length > 0 ? (
          <View>
            {this.state.searchResults.map(user => {
              return (
                <UserCard
                  key={user.id}
                  handleChat={this.handleChat}
                  user={user}
                />
              );
            })}
          </View>
        ) : (
          <Text style={styles.noResultsText}>No results to show</Text>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cbe5f8"
  },
  noResultsText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 50
  },
  searchingLoader: {
    alignSelf: "center",
    marginTop: 30
  },
  searchingText: {
    alignSelf: "center",
    fontSize: 20,
    marginTop: 10
  }
});

export default SearchScreen;

SearchScreen.navigationOptions = {
  title: "Search"
};
