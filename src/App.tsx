import React from "react";
import { Container } from "@mui/material";
// import PartsUpload from "./components/PartsUpload";
import Header from "./components/Header";
import "../src/index.css";


const App: React.FC = () => {
  return (
    <Container>
      <Header />
      {/* <PartsUpload /> */}
    </Container>
  );
};

export default App;
