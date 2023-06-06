import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import "./EnergyForm.css";

// Create a custom theme
const theme = createTheme({
  typography: {
    fontFamily: "Manrope",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          "&:hover": {
            borderColor: "rgb(0, 165,133)",
          },
          color: "rgb(0, 165,133)",
          border: "1px solid rgb(0, 165,133)",
        },
      },
    },
  },
});

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgb(241, 243, 240",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <h1>Energy Calculator</h1>
      </div>

      <Box
        sx={{ m: 1, border: "1px solid lightgrey", width: 350, height: 670 }}
      >
        <div>
          <ThemeProvider theme={theme}>
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
          </ThemeProvider>
        </div>
        <div>
          <Box sx={{ m: "25px", flexWrap: "wrap" }}>
            <div className="results">
              <h4>Cost</h4>
              <p>
                <span class="material-symbols-outlined">attach_money</span>
                {(((power * usage) / 1000) * (price / 100)).toFixed(2)} per
                month
              </p>
            </div>
            <div className="results">
              <h4>Energy usage</h4>
              <p>
                {" "}
                <span class="material-symbols-outlined">bolt</span>{" "}
                {(power * usage) / 1000} kWh per month
              </p>
            </div>
            <div>
              <h4>Monthly Green House Emissions</h4>
              <p>{(((power * usage) / 1000) * 0.818).toFixed(2)} Lbs</p>
            </div>
            <ThemeProvider theme={theme}>
              <Button variant="outlined" onClick={handleApplianceSubmit}>
                Add
              </Button>
            </ThemeProvider>
          </Box>
        </div>
      </Box>
    </div>
  );
}

export default EnergyForm;
