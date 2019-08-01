import React from "react";
import {
  Modal,
  Text,
  TouchableHighlight,
  SafeAreaView,
  View,
  Alert,
  StyleSheet,
  Dimensions,
  DatePickerIOS
} from "react-native";

const DateModal = props => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={props.modalVisible}
      >
        <SafeAreaView style={styles.container}>
          <View>
            <DatePickerIOS
              date={props.dateOfBirth}
              onDateChange={date => props.handleDateOfBirth(date)}
              mode={"date"}
            />
            <TouchableHighlight
              onPress={() => {
                props.setModalVisible(!props.modalVisible);
              }}
              style={styles.buttonSignUp}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableHighlight>
          </View>
        </SafeAreaView>
      </Modal>

      <TouchableHighlight
        onPress={() => {
          props.setModalVisible(true);
        }}
        style={styles.inputField}
      >
        <Text style={styles.modalButtonText}>
          {props.dateOfBirth.getUTCFullYear() < new Date().getUTCFullYear()
            ? `${props.dateOfBirth.getDate()}-${props.dateOfBirth.getMonth() +
                1}-${props.dateOfBirth.getUTCFullYear()}`
            : "Pick Date Of Birth"}
        </Text>
      </TouchableHighlight>
    </View>
  );
};

export default DateModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "#cbe5f8",
    justifyContent: "center"
  },
  inputField: {
    marginTop: 30,
    alignSelf: "center",
    width: "70%",
    borderBottomWidth: 1,
    padding: 10,
    borderBottomColor: "#000000"
  },
  modalButtonText: {
    opacity: 0.2
  },
  buttonSignUp: {
    width: "50%",
    height: 40,
    backgroundColor: "#0ABAB5",
    alignSelf: "center",
    justifyContent: "center",
    margin: 30,
    borderRadius: 10
  },
  buttonText: {
    textAlign: "center"
  }
});
