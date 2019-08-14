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
      chats: [],
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
      .get("https://fitforhire.herokuapp.com/api/v1/users/", config)
      .then(response => {
        this.setState({
          user: response.data.user
        });
      })
      .catch(error => {
        Alert.alert("Error", error.response.data.message);
      });

    axios
      .get("https://fitforhire.herokuapp.com/api/v1/chats/last_four", config)
      .then(response => {
        this.setState({
          chats: response.data.chats
        });
      })
      .catch(error => {
        Alert.alert(
          "Error",
          "Something didn't go right fetching your chats :("
        );
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

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

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
            {this.state.chats.map((chat, index) => {
              return (
                <View style={styles.chatBox} key={index}>
                  <Text style={styles.chatText}>
                    {chat.professional.username}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.mosaicBox}>
            <Text style={styles.mosaicTitle}>Calories</Text>
            <Text style={styles.textSteps}>{caloriesToday}</Text>
            <Text style={styles.textSteps}>calories</Text>
            <Text style={styles.textToday}>{today}</Text>
          </View>
          <View style={styles.mosaicBox}>
            <Text style={styles.mosaicTitle}>Steps</Text>
            {isPedometerAvailable ? (
              <>
                <Text style={styles.textSteps}>{todayStepCount}</Text>
                <Text style={styles.textSteps}>steps</Text>
                <Text style={styles.textToday}>{today}</Text>
              </>
            ) : (
              <Text>Error! Unavailable</Text>
            )}
          </View>
        </View>
        <View style={styles.welcomeContainer}>
          <View style={styles.textAnalysisContainer}>
            <Text style={styles.textAnalysisTitle}>Analysis:</Text>
            <Text style={styles.textAnalysis}>{analysisMessage}</Text>
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
  textAnalysisContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 10
  },
  textAnalysis: {
    width: "60%",
    alignSelf: "center"
  },
  textAnalysisTitle: {
    width: "40%",
    fontSize: 30,
    alignSelf: "center"
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
    borderColor: "black",
    borderWidth: 0.5,
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
    fontSize: 20
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
  },
  chatBox: {
    width: 160,
    alignSelf: "center",
    height: 30,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: "whitesmoke",
    margin: 5,
    justifyContent: "center"
  },
  chatText: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default Home;
