import React, { useState } from "react";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

function EnergyForm({ data }) {
  const [appliance, setAppliance] = useState("");
  const [power, setPower] = useState("");
  const [usage, setUsage] = useState("");
  const [cost, setCost] = useState(13.0);

  const handleApplianceChange = (event, value) => {
    setAppliance(value);
    const selectedAppliance = data.find(({ name }) => name === value);
    if (value) {
      setPower(selectedAppliance.power_consumption_watts);
      console.log(value);
      console.log(selectedAppliance);
    } else {
      // reset value when selecting different appliance
      setPower("");
      setUsage("");
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
    <Box sx={{ width: 550, flexWrap: "wrap" }}>
      <form>
        <Autocomplete
          disablePortal
          onInputChange={handleApplianceChange}
          id="appliance-select"
          options={data}
          getOptionLabel={(option) => option.name}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Appliance" />}
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
  );
}

export default EnergyForm;
