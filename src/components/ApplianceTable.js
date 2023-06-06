import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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

export default function ApplianceTable({ rows }) {
  return (
    <ThemeProvider theme={theme}>
      <TableContainer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Table sx={{ width: 550 }} aria-label="appliances table">
          <TableHead>
            <TableRow>
              <TableCell>Appliance</TableCell>
              <TableCell align="center">kWh/Month</TableCell>
              <TableCell align="center">Cost</TableCell>
              <TableCell align="center">GHG (Lbs)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
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
