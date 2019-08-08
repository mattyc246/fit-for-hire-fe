import React from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import SearchModal from "../components/SearchModal";
import Loader from "../components/Loader";

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearching: false,
      searchResults: []
    };
  }

  performSearch = query => {
    this.setState({
      isSearching: true
    });
    console.log(query);
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
