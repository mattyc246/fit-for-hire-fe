import React from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const HourlyStepChart = props => {
  return (
    <LineChart
      data={{
        labels: [
          "12am",
          "3am",
          "6am",
          "9am",
          "12pm",
          "3pm",
          "6pm",
          "9pm",
          "11pm"
        ],
        datasets: [
          {
            data: props.dataSet
          }
        ]
      }}
      width={Dimensions.get("window").width - 30}
      height={220}
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#0000A0",
        backgroundGradientTo: "#0055a0",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
  );
};

export default HourlyStepChart;
