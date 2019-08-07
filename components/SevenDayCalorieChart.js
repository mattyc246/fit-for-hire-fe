import React from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const SevenDayCalorieChart = props => {
  return (
    <LineChart
      data={{
        labels: ["6", "5", "4", "3", "2", "1", "0"],
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
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
  );
};

export default SevenDayCalorieChart;
