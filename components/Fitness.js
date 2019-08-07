import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import SevenDayStepChart from "../components/SevenDayStepChart";
import SevenDayCalorieChart from "../components/SevenDayCalorieChart";
import HourlyStepChart from "../components/HourlyStepChart";
import { Pedometer } from "expo-sensors";

class Fitness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sevenDayStepHistory: [],
      sevenDayCalorieHistory: [],
      hourlyStepHistory: []
    };
  }

  componentDidMount = () => {
    this.getSevenDayResults();
    this.getHourlyStepCount();
  };

  getSevenDayResults = async () => {
    let dayData = [];
    let calorieData = [];
    for (let i = 6; i >= 0; i--) {
      const end = new Date();
      const start = new Date();

      start.setDate(start.getDate() - i);
      start.setHours(0, 0, 0, 0);
      end.setDate(end.getDate() - i);
      end.setHours(23, 59, 59, 59);

      await Pedometer.getStepCountAsync(start, end).then(result => {
        dayData.push(result.steps);
        calorieData.push(result.steps / 20);
      });
    }
    this.setState({
      sevenDayStepHistory: dayData,
      sevenDayCalorieHistory: calorieData
    });
  };

  getHourlyStepCount = async () => {
    let hours = [0, 3, 6, 9, 12, 15, 18, 21, 23];
    let hourSteps = [];

    for (let i = 0; i < hours.length; i++) {
      let start = new Date();
      let end = new Date();

      if (hours[i] === 23) {
        start.setHours(hours[i], 0, 0, 0);
        end.setHours(hours[i], 59, 59, 59);
      } else {
        start.setHours(hours[i], 0, 0, 0);
        end.setHours(hours[i] + 1, 0, 0, 0);
      }

      await Pedometer.getStepCountAsync(start, end).then(result => {
        hourSteps.push(result.steps);
      });
    }

    this.setState({
      hourlyStepHistory: hourSteps
    });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>7 Day Step Count History</Text>
        </View>
        <View style={styles.chartContainer}>
          <SevenDayStepChart dataSet={this.state.sevenDayStepHistory} />
        </View>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>7 Day Calorie Count History</Text>
        </View>
        <View style={styles.chartContainer}>
          <SevenDayCalorieChart dataSet={this.state.sevenDayCalorieHistory} />
        </View>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Last 24 Hours Steps</Text>
        </View>
        <View style={styles.chartContainer}>
          <HourlyStepChart dataSet={this.state.hourlyStepHistory} />
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
