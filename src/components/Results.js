import React from "react";
import "./Results.css";

function Results({ rows }) {
  function sumValuesByKey(arr, key) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];

      if (obj.hasOwnProperty(key)) {
        sum += parseFloat(obj[key]);
      }
    }

    return sum;
  }

  const totalConsumption = sumValuesByKey(rows, "energy_usage");
  const energyCharge = sumValuesByKey(rows, "cost");
  const greenHouseEmissions = sumValuesByKey(rows, "GHG");

  return (
    <div className="totals">
      <div className="totals__container">
        <p>Total Consumption: {totalConsumption} kWh/Month</p>
        <p>Green House Gas Emissions: {greenHouseEmissions} Lbs</p>
        <p>Total Cost: ${energyCharge}</p>
      </div>
    </div>
  );
}

export default Results;
