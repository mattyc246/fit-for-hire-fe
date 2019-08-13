import React from "react";
import { View, Text } from "react-native";
import Axios from "axios";

class ConversationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      messages: []
    };
  }

  componentDidMount = () => {
    let client = this.props.navigation.getParam("userId");

    this.setState({
      userId: client
    });
  };

  render() {
    return (
      <View>
        <Text> {this.props.navigation.getParam("userId")} </Text>
      </View>
    );
  }
}

export default ConversationScreen;
