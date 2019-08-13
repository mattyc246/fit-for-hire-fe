import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Loader from "../components/Loader";
import Home from "../components/Home";
import { connectSocket } from "../components/Socket";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount = () => {
    connectSocket();
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2500);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.isLoading ? <Loader /> : <Home />}
      </SafeAreaView>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cbe5f8"
  }
});

export default HomeScreen;
