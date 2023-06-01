import React, { useState } from "react";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

function EnergyForm({ data }) {
  const [appliance, setAppliance] = useState("select appliance");
  const [inputValue, setInputValue] = useState("");
  const [power, setPower] = useState(0);
  const [usage, setUsage] = useState(0);
  const [cost, setCost] = useState(13);

  const handleApplianceChange = (event, value) => {
    setAppliance(value);
    const selectedAppliance = data.find(({ name }) => name === value);
    if (value) {
      setPower(selectedAppliance.power_consumption_watts);
      console.log(value);
      console.log(selectedAppliance);
    } else {
      // reset value when deleting appliance
      setPower(0);
      setUsage(0);
    }
  };

  const handleUsageChange = (event) => {
    setUsage(event.target.value);
    console.log(event.target.value);
  };

  const handleCostChange = (event) => {
    setCost(event.target.value);
    console.log(event.target.value);
  };
  return (
    <>
      <Box sx={{ width: 550, flexWrap: "wrap" }}>
        <form>
          <Autocomplete
            value={appliance}
            id="appliance-select"
            onChange={handleApplianceChange}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            options={data.map((option) => option.name)}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Appliance" />
            )}
          />
          <TextField
            label="Power"
            value={power}
            id="power-watts"
            type="number"
            sx={{ mt: 1, width: 300 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">watts</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Monthly Usage"
            value={usage}
            onChange={handleUsageChange}
            id="usage"
            type="number"
            sx={{ mt: 1, width: 300 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">hours</InputAdornment>
              ),
            }}
          />
          <TextField
            label="Cost"
            value={cost}
            onChange={handleCostChange}
            id="cost"
            type="number"
            sx={{ mt: 1, width: 300 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">¢/kWh</InputAdornment>
              ),
            }}
            helperText="National average is 13.00 ¢/kWh"
          />
        </form>
      </Box>
      <Box sx={{ width: 550, flexWrap: "wrap" }}>
        <div>
          <p>Cost</p>
          <p>
            $ {(((power * usage) / 1000) * (cost / 100)).toFixed(2)} per month
          </p>
          <p>Energy usage</p>
          <p>{(power * usage) / 1000} kWh per month</p>
          <p>Monthly Green House Emissions</p>
          <p>{(((power * usage) / 1000) * 0.818).toFixed(2)} Lbs</p>
        </div>
      </Box>
    </>
  );
}

export default EnergyForm;
