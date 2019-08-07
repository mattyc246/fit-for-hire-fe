import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import Loader from "../components/Loader";
import Fitness from "../components/Fitness";
import { SafeAreaView } from "react-navigation";

class FitnessScreen extends React.Component {
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
    const { isLoading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {isLoading ? <Loader /> : <Fitness />}
      </SafeAreaView>
    );
  }
}

export default FitnessScreen;

FitnessScreen.navigationOptions = {
  title: "Fitness"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cbe5f8"
  }
});
