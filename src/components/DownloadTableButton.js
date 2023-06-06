import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Manrope",
    fontSize: "12px",
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

const DownloadTableButton = ({ tableData, fileName }) => {
  if (!tableData || tableData.length === 0) {
    console.log("Table data is empty or undefined");
    return;
  }
  const downloadTableAsPDF = () => {
    const doc = new jsPDF();
    const tableContent = generateTableContent(tableData);
    const tableColumns = Object.keys(tableData[0]);
    doc.autoTable({ head: [tableColumns], body: tableContent });
    doc.save(`${fileName}.pdf`);
  };

  const generateTableContent = (data) => {
    return data.map((row) => Object.values(row));
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "550px", marginLeft: "25px", marginTop: "10px" }}>
          <Button
            sx={{ fontSize: "12px" }}
            variant="outlined"
            onClick={downloadTableAsPDF}
          >
            Download
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default DownloadTableButton;
