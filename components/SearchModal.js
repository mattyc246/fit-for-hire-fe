import React from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  StyleSheet,
  TextInput
} from "react-native";

class SearchModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      modalVisible: true
    };
  }

  handleSearch = () => {
    this.setState({
      modalVisible: false
    });
    this.props.performSearch(this.state.query);
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.modalBox}>
            <View>
              <View style={styles.titleBox}>
                <Text style={styles.titleText}>
                  Search For Fitness Professionals
                </Text>
              </View>
              <View>
                <TextInput
                  onChangeText={query => {
                    this.setState({ query: query });
                  }}
                  style={styles.inputSearch}
                  placeholder={"Search..."}
                  value={this.state.query}
                />
              </View>
              <TouchableHighlight
                onPress={() => {
                  this.handleSearch();
                }}
                style={styles.searchButton}
              >
                <Text style={styles.searchText}>Search</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
          style={styles.showModalButton}
        >
          <Text style={styles.showText}>Search For Users</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default SearchModal;

const styles = StyleSheet.create({
  titleBox: {
    width: "90%",
    height: 75,
    justifyContent: "center",
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
  titleText: {
    alignSelf: "center",
    fontSize: 20
  },
  showModalButton: {
    flex: 1,
    justifyContent: "center",
    width: "60%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#c080ed",
    alignSelf: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginTop: 15
  },
  showText: {
    color: "white",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 20
  },
  modalBox: {
    flex: 1,
    backgroundColor: "#c080ed"
  },
  searchButton: {
    justifyContent: "center",
    width: "60%",
    height: 50,
    backgroundColor: "#cbe5f8",
    alignSelf: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginTop: 15,
    borderRadius: 15
  },
  searchText: {
    color: "black",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 20
  },
  inputSearch: {
    height: 50,
    width: "60%",
    alignSelf: "center",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5
  }
});
