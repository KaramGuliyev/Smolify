// React
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Stylings
import { ThemeProvider } from "@emotion/react";
import { Box, CircularProgress } from "@mui/material";
import theme from "./theme";
import "./index.css";

// Firebase
import { auth } from "./firebase";

// Pages
import Home from "./Pages/LandingPage";
import Account from "./Pages/Account";
import NavBar from "./Layouts/NavBar";

const App = () => {
  const [user, setUser] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setInitialLoad(false);
    });
  }, []);

  if (initialLoad) {
    return (
      <Box mt={5} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar>
          <Routes>
            <Route path="/" element={user ? <Navigate to="/account" /> : <Home />} />
            <Route path="/account" element={!user ? <Navigate to="/" /> : <Account />} />
          </Routes>
        </NavBar>
      </Router>
    </ThemeProvider>
  );
};

export default App;
