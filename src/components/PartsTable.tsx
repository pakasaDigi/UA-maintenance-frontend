import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";

interface Part {
  id: number;
  partNumber: string;
  serialNumber: string;
  notice: string;
  description: string;
  quantity: number;
}

interface PartsTableProps {
  parts: Part[];
}

const PartsTable: React.FC<PartsTableProps> = ({ parts }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      minHeight="100vh"
      sx={{ background: "linear-gradient(to bottom, black, red, yellow)", padding: 3 }}
    >
      <Typography variant="h4" color="white" fontWeight="bold" gutterBottom mt={5}>
        Parts List
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: "90%", borderRadius: "12px", overflow: "hidden", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "yellow" }}>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>ID</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>Part Number</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>Serial Number</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>Notice</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>Description</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "black" }}>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parts.map((part) => (
              <TableRow key={part.id} sx={{ '&:nth-of-type(even)': { backgroundColor: "rgba(255, 255, 255, 0.1)" } }}>
                <TableCell sx={{ color: "black" }}>{part.id}</TableCell>
                <TableCell sx={{ color: "black" }}>{part.partNumber}</TableCell>
                <TableCell sx={{ color: "black" }}>{part.serialNumber}</TableCell>
                <TableCell sx={{ color: "black" }}>{part.notice}</TableCell>
                <TableCell sx={{ color: "black" }}>{part.description}</TableCell>
                <TableCell sx={{ color: "black" }}>{part.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PartsTable;