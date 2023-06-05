import React, { useState } from "react";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

function EnergyForm({ data, onAddRow }) {
  const [appliance, setAppliance] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [power, setPower] = useState(0);
  const [usage, setUsage] = useState(0);
  const [price, setPrice] = useState(13);

  const handleApplianceChange = (event, value) => {
    setAppliance(value);
    const selectedAppliance = data.find(({ name }) => name === value);
    if (value) {
      setPower(selectedAppliance.power_consumption_watts);
    } else {
      // reset value when deleting appliance
      setPower(0);
      setUsage(0);
    }
  };

  const handleUsageChange = (event) => {
    setUsage(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleApplianceSubmit = () => {
    onAddRow({
      name: appliance,
      energy_usage: (power * usage) / 1000,
      cost: (((power * usage) / 1000) * (price / 100)).toFixed(2),
      GHG: (((power * usage) / 1000) * 0.818).toFixed(2),
    });
  };

  return (
    <div sx={{ with: 929, height: 644, border: 3, display: "flex" }}>
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
            label="Price"
            value={price}
            onChange={handlePriceChange}
            id="price"
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
            $ {(((power * usage) / 1000) * (price / 100)).toFixed(2)} per month
          </p>
          <p>Energy usage</p>
          <p>{(power * usage) / 1000} kWh per month</p>
          <p>Monthly Green House Emissions</p>
          <p>{(((power * usage) / 1000) * 0.818).toFixed(2)} Lbs</p>
          <Button variant="outlined" onClick={handleApplianceSubmit}>
            Add
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default EnergyForm;
