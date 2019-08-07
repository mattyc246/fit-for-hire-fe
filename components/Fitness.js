import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import SevenDayChart from "../components/SevenDayChart";
import { Pedometer } from "expo-sensors";

class Fitness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sevenDayHistory: []
    };
  }

  componentDidMount = () => {
    this.getSevenDayResults();
  };

  getSevenDayResults = async () => {
    let dayData = [];
    for (let i = 6; i >= 0; i--) {
      const end = new Date();
      const start = new Date();

      start.setDate(start.getDate() - i);
      start.setHours(0, 0, 0, 0);
      end.setDate(end.getDate() - i);
      end.setHours(23, 59, 59, 59);

      await Pedometer.getStepCountAsync(start, end).then(result => {
        console.log(result);
        dayData.push(result.steps);
      });
    }
    console.log(dayData);
    this.setState({
      sevenDayHistory: dayData
    });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>7 Day Step Count History</Text>
        </View>
        <View style={styles.chartContainer}>
          <SevenDayChart dataSet={this.state.sevenDayHistory} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headingContainer: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    height: 70,
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
  headingText: {
    fontSize: 20,
    textAlign: "center",
    alignSelf: "center"
  },
  chartContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  }
});

export default Fitness;
