import React from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const SevenDayStepChart = props => {
  return (
    <LineChart
      data={{
        labels: ["6", "5", "4", "3", "2", "1", "Today"],
        datasets: [
          {
            data: props.dataSet
          }
        ]
      }}
      width={Dimensions.get("window").width - 40} // from react-native
      height={220}
      xAxisLabel={"Days Ago"}
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#0000A0",
        backgroundGradientTo: "#0055a0",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
  );
};

export default SevenDayStepChart;
