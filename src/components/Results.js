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

  const totalConsumption = sumValuesByKey(rows, "energy_usage").toFixed(2);
  const energyCharge = sumValuesByKey(rows, "cost").toFixed(2);
  const greenHouseEmissions = sumValuesByKey(rows, "GHG");

  return (
    <div className="totals">
      <div className="totals__container">
        <p>
          <b style={{ marginRight: "3px" }}>Total Consumption:</b>{" "}
          {totalConsumption} kWh/Month
        </p>
        <p>
          <b style={{ marginRight: "3px" }}>Green House Gas Emissions: </b>
          {greenHouseEmissions} Lbs
        </p>
        <p>
          <b style={{ marginRight: "3px" }}>Total Cost:</b> ${energyCharge}
        </p>
      </div>
    </div>
  );
}

export default Results;
