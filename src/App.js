import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import EnergyForm from "./components/EnergyForm";
import ApplianceTable from "./components/ApplianceTable";
import Results from "./components/Results";
import DownloadTableButton from "./components/DownloadTableButton";

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

  const handleDeleteRow = (appliance) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      setApplianceTable((prevTable) =>
        prevTable.filter((item) => item.name !== appliance)
      );
    }
  };

  return (
    <div className="App">
      <EnergyForm data={appliances} onAddRow={handleAddRow} />
      <ApplianceTable rows={applianceTable} onDeleteRow={handleDeleteRow} />
      <Results rows={applianceTable} />
      <DownloadTableButton
        tableData={applianceTable}
        fileName={"Energy_Calculator"}
      />
    </div>
  );
}

export default App;
