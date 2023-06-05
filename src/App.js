import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import EnergyForm from "./components/EnergyForm";
import ApplianceTable from "./components/ApplianceTable";

function App() {
  const [appliances, setAppliances] = useState([]);
  const [applianceTable, setApplianceTable] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/appliances`)
      .then((response) => {
        setAppliances(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddRow = (newAppliance) => {
    const applianceExists = applianceTable
      .map((item) => item.name)
      .includes(newAppliance.name);
    if (!applianceExists) {
      setApplianceTable((prevTable) => [...prevTable, newAppliance]);
      console.log(newAppliance);
    }
  };

  const handleDeleteRow = (appliance) => {};

  return (
    <div className="App">
      <EnergyForm data={appliances} onAddRow={handleAddRow} />
      <ApplianceTable rows={applianceTable} />
    </div>
  );
}

export default App;
