import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import EnergyForm from "./components/EnergyForm";

function App() {
  const [appliances, setAppliances] = useState([]);

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

  return (
    <div className="App">
      <EnergyForm data={appliances} />
    </div>
  );
}

export default App;
