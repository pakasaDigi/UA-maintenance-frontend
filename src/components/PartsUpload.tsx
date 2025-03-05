import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../redux/slice";
import { RootState, AppDispatch } from "../redux/store";
import { Box, Button, TextField, CircularProgress, Typography, Card, CardContent } from "@mui/material";
import AirlineLogo from "../assets/airlineLogo.png";

const PartsUpload: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector((state: RootState) => state.upload);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      dispatch(uploadFile(formData));
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ background: "linear-gradient(to bottom, black, red, yellow)", padding: 3 }}
    >
      <Box height="80px" />
      <Card sx={{ maxWidth: 500, padding: 4, textAlign: "center", background: "white", borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}>
        <CardContent>
          <Typography variant="h5" color="black" fontWeight="bold">
            Upload Your Parts Data
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <img src={AirlineLogo} alt="Airline Logo" style={{ width: "120px" }} />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gap={2}
            width="100%"
            maxWidth="400px"
            p={3}
            bgcolor="rgba(0, 0, 0, 0.8)"
            borderRadius={2}
            mt={2}
          >
            <TextField
              value={fileName}
              placeholder="Select a file..."
              variant="outlined"
              fullWidth
              inputProps={{ readOnly: true }}
              onClick={() => document.getElementById("file-input")?.click()}
              sx={{ bgcolor: "white", borderRadius: 1 }}
            />
            <input id="file-input" type="file" accept=".xlsx" onChange={handleFileChange} hidden />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "yellow",
                color: "black",
                fontWeight: "bold",
                width: "100%",
                height: "48px",
                borderRadius: "8px",
                '&:hover': { backgroundColor: "goldenrod", color: "black" },
              }}
              onClick={handleUpload}
              disabled={!selectedFile || loading}
            >
              {loading ? <CircularProgress size={24} sx={{ color: "black" }} /> : "Upload"}
            </Button>
          </Box>
          {error && <Typography color="error" mt={2}>{error}</Typography>}
          {success && <Typography color="green" mt={2}>File uploaded successfully!</Typography>}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PartsUpload;
