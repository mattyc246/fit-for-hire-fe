import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const UserCard = props => {
  return (
    <View style={styles.cardBody}>
      <View style={styles.cardContent}>
        <TouchableOpacity
          onPress={() => alert(props.user.id)}
          style={styles.userLink}
        >
          <Text style={styles.userName}>{props.user.username}</Text>
        </TouchableOpacity>
        <Text style={styles.cardText}>|</Text>
        <Text style={styles.cardText}>{props.user.profession}</Text>
        <Text style={styles.cardText}>|</Text>
        <TouchableOpacity
          style={styles.chatNow}
          onPress={() => props.handleChat(props.user.id)}
        >
          <Text style={styles.chatNowText}>Chat Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  cardBody: {
    width: "95%",
    height: 60,
    backgroundColor: "whitesmoke",
    alignSelf: "center",
    marginTop: 15,
    borderRadius: 15,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    height: 60
  },
  cardText: {
    alignSelf: "center"
  },
  userLink: {
    alignSelf: "center"
  },
  userName: {
    fontSize: 12,
    fontWeight: "bold"
  },
  chatNow: {
    width: 70,
    height: 25,
    backgroundColor: "#c080ed",
    alignSelf: "center",
    borderRadius: 5,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    justifyContent: "center"
  },
  chatNowText: {
    color: "white",
    alignSelf: "center"
  }
});
