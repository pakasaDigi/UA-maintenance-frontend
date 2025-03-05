import React, { useState } from "react";
import { AppBar, Toolbar, Box, Typography, Button, TextField, Card, CardContent } from "@mui/material";
import axios from "axios";
import PartsTable from "./PartsTable";
import TechlogUpload from "./TechlogUpload";
import PartsUpload from "./PartsUpload";
import AirlineLogo from "../assets/airlineLogo.png";

const mockedUsers = [
  { firstName: "Paul", lastName: "Andwanirira" },
  { firstName: "Henry", lastName: "Kato" },
];

const Header: React.FC = () => {
  const [parts, setParts] = useState<any[]>([]);
  const [showTable, setShowTable] = useState(false);
  const [showPartsUpload, setShowPartsUpload] = useState(false);
  const [showTechlogUpload, setShowTechlogUpload] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedUser, setSelectedUser] = useState(mockedUsers[0]);

  const fetchParts = async () => {
    try {
      const response = await axios.get("http://localhost:2020/api/parts");
      setParts(response.data);
      setShowTable(true);
      setShowPartsUpload(false);
      setShowTechlogUpload(false);
    } catch (error) {
      console.error("Error fetching parts:", error);
    }
  };

  const showPartsUploadPage = () => {
    setShowPartsUpload(true);
    setShowTable(false);
    setShowTechlogUpload(false);
  };

  const toggleTechlogPage = () => {
    setShowTechlogUpload((prev) => !prev);
    setShowTable(false);
    setShowPartsUpload(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ minHeight: "100vh", background: "linear-gradient(to bottom, #fdfdfd, #ffcc00, #d32f2f)", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <AppBar position="static" sx={{ background: "linear-gradient(to bottom, #fff8c6, #ffcc00)", padding: "10px" }}>
          <Toolbar sx={{ justifyContent: "center" }}>
            <Box component="img" src={AirlineLogo} alt="Airline Logo" sx={{ height: 50 }} />
          </Toolbar>
        </AppBar>
        <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
          <Card sx={{ maxWidth: 400, padding: 3, textAlign: "center", background: "white", borderRadius: "12px" }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Hi {selectedUser.firstName}, Please login to continue
              </Typography>
              <TextField fullWidth label="Username" variant="outlined" margin="normal" />
              <TextField fullWidth label="Password" type="password" variant="outlined" margin="normal" />
              <Button fullWidth variant="contained" sx={{ mt: 2, bgcolor: "black", color: "white", borderRadius: "8px", '&:hover': { bgcolor: "#333" } }} onClick={handleLogin}>
                Login
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <AppBar position="static" sx={{ background: "linear-gradient(to bottom, #fff8c6, #ffcc00)", padding: "10px" }}>
        <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box component="img" src={AirlineLogo} alt="Airline Logo" sx={{ height: 40 }} />
          <Box>
            <Button sx={{ color: "#552000", backgroundColor: "yellow", marginRight: "10px", borderRadius: "8px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", '&:hover': { backgroundColor: "gold" } }} onClick={fetchParts}>
              Parts
            </Button>
            <Button sx={{ color: "#552000", backgroundColor: "yellow", marginRight: "10px", borderRadius: "8px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", '&:hover': { backgroundColor: "gold" } }} onClick={showPartsUploadPage}>
              Upload Parts
            </Button>
            <Button sx={{ color: "#552000", backgroundColor: "yellow", borderRadius: "8px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", '&:hover': { backgroundColor: "gold" } }} onClick={toggleTechlogPage}>
              Technical Logbook
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {showTable && <PartsTable parts={parts} />}
      {showPartsUpload && <PartsUpload />}
      {showTechlogUpload && <TechlogUpload />}
    </>
  );
};

export default Header;