import React from "react";
import {
  Text,
  AsyncStorage,
  Alert,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions
} from "react-native";
import axios from "axios";
import { Pedometer } from "expo-sensors";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isPedometerAvailable: "checking",
      todayStepCount: 0,
      caloriesToday: 0,
      averageSteps: 0,
      averageCals: 0
    };
  }

  componentDidMount = async () => {
    let jwt = await AsyncStorage.getItem("userTokenF4H");

    let config = {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    };

    axios
      .get("http://192.168.1.71:5000/api/v1/users/", config)
      .then(response => {
        this.setState({
          user: response.data.user
        });
      })
      .catch(error => {
        Alert.alert("Error", error.response.data.message);
      });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: true
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: false
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        calories = result.steps / 20;
        this.setState({
          todayStepCount: result.steps,
          caloriesToday: calories
        });
      },
      error => {
        this.setState({
          todayStepCount: "Unavailable"
        });
      }
    );

    this.calcuateAverage();
  };

  calculateMessage = () => {
    let message = "";
    let sc = this.state.todayStepCount;

    if (sc < 3000) {
      message =
        "More exercise needed! You are way below what you should be achieving!";
    } else if (sc < 5000) {
      message = "Get a move on! You are getting close to your steps for today!";
    } else if (sc < 7000) {
      message = "You are at the final hurdle! Just a couple more steps!";
    } else {
      message =
        "Congratulations! You have passed the number of steps for today!";
    }

    return message;
  };

  calcuateAverage = async () => {
    let avgCals = 0;
    let avgSteps = 0;
    let sevenSteps = [];
    let sevenCals = [];

    for (let i = 6; i >= 0; i--) {
      const start = new Date();
      const end = new Date();
      start.setDate(start.getDate() - i);
      end.setDate(end.getDate() - i);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 59);
      await Pedometer.getStepCountAsync(start, end).then(result => {
        sevenSteps.push(result.steps);
        sevenCals.push(result.steps / 20);
      });
    }

    sumCals = sevenCals.reduce((a, b) => a + b, 0);
    sumSteps = sevenSteps.reduce((a, b) => a + b, 0);

    avgCals = Math.floor(sumCals / sevenCals.length);
    avgSteps = Math.floor(sumSteps / sevenSteps.length);

    this.setState({
      averageSteps: avgSteps,
      averageCals: avgCals
    });
  };

  render() {
    const {
      user,
      todayStepCount,
      isPedometerAvailable,
      caloriesToday,
      averageCals,
      averageSteps
    } = this.state;

    const analysisMessage = this.calculateMessage();

    return (
      <ScrollView>
        <View style={styles.welcomeContainer}>
          <Image
            style={styles.profileImage}
            source={require("../assets/images/me.jpg")}
          />
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.welcomeText}>{user.username}</Text>
          </View>
        </View>
        <View style={styles.mosaicBoard}>
          <View style={styles.mosaicBox}>
            <Text style={styles.mosaicTitle}>Fitness</Text>
            <Text style={styles.textAverage}>Avg. Steps</Text>
            <Text style={styles.textStepsAvg}>{averageSteps} steps</Text>
            <Text style={styles.textAverage}>Avg. Calories</Text>
            <Text style={styles.textStepsAvg}>{averageCals} cals</Text>
          </View>
          <View style={styles.mosaicBox}>
            <Text style={styles.mosaicTitle}>Chats</Text>
          </View>
          <View style={styles.mosaicBox}>
            <Text style={styles.mosaicTitle}>Calories</Text>
            <Text style={styles.textToday}>Today</Text>
            <Text style={styles.textSteps}>{caloriesToday}</Text>
            <Text style={styles.textSteps}>calories</Text>
          </View>
          <View style={styles.mosaicBox}>
            <Text style={styles.mosaicTitle}>Steps</Text>
            {isPedometerAvailable ? (
              <>
                <Text style={styles.textToday}>Today</Text>
                <Text style={styles.textSteps}>{todayStepCount}</Text>
                <Text style={styles.textSteps}>steps</Text>
              </>
            ) : (
              <Text>Error! Unavailable</Text>
            )}
          </View>
        </View>
        <View style={styles.welcomeContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>Analysis:</Text>
            <Text>{analysisMessage}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    height: 100,
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
  welcomeText: {
    fontSize: 20,
    textAlign: "center"
  },
  textContainer: {
    alignSelf: "center"
  },
  profileImage: {
    width: 70,
    height: 70,
    alignSelf: "center",
    borderRadius: 35
  },
  mosaicBoard: {
    width: Dimensions.get("screen").width,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 10
  },
  mosaicBox: {
    height: 180,
    width: 180,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 15,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 15
  },
  mosaicTitle: {
    fontSize: 12,
    textAlign: "center",
    textDecorationLine: "underline"
  },
  textSteps: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 25
  },
  textToday: {
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 30
  },
  textAverage: {
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 20
  },
  textStepsAvg: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 20
  }
});

export default Home;
