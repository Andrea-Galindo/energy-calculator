import React, { useEffect } from "react";
import { createTheme, rgbToHex, ThemeProvider } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./ApplianceTable.css";

// Create a custom theme for table
const theme = createTheme({
  typography: {
    fontFamily: "Manrope",
  },
});

function ApplianceTable({ rows, onDeleteRow }) {
  const handleRowClick = (appliance, event) => {
    event.preventDefault();
    if (event.button === 2) {
      // Right-click (desktop)
      onDeleteRow(appliance);
    } else if (event.type === "touchstart") {
      // Touchstart (mobile)
      const timer = setTimeout(() => {
        onDeleteRow(appliance);
      }, 2000); // 2 seconds

      event.target.addEventListener("touchend", () => {
        clearTimeout(timer);
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <TableContainer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Table sx={{ width: 550 }} aria-label="appliances table">
          <caption style={{ fontSize: "10px" }}>
            *To delete a row: Right-click on the appliance you want to delete.
            If using mobile, tap and hold.
          </caption>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "rgb(0, 165,133)" }}>Appliance</TableCell>
              <TableCell sx={{ color: "rgb(0, 165,133)" }} align="center">
                kWh/Month
              </TableCell>
              <TableCell sx={{ color: "rgb(0, 165,133)" }} align="center">
                Cost
              </TableCell>
              <TableCell sx={{ color: "rgb(0, 165,133)" }} align="center">
                GHG (Lbs)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                onContextMenu={(e) => handleRowClick(row.name, e)}
                onTouchStart={(e) => handleRowClick(row.name, e)}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.energy_usage}</TableCell>
                <TableCell align="center">{row.cost}</TableCell>
                <TableCell align="center">{row.GHG}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

export default ApplianceTable;
