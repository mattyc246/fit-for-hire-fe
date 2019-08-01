import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Loader from "../components/Loader";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2500);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.isLoading ? <Loader /> : null}
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
