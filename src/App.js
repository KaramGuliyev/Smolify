// React
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

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
import LinkRedirect from "./Pages/LinkRedirect";

const App = () => {
  const { pathname } = useLocation();
  const [user, setUser] = useState(null);
  const [initialLoad, setInitialLoad] = useState(pathname === "/" || pathname === "/account" ? true : false);

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
      <NavBar>
        <Routes>
          <Route exact path="/" element={user ? <Navigate to="/account" /> : <Home />} />
          <Route path="/account" element={!user ? <Navigate to="/" /> : <Account />} />
          <Route path="/:shortCode" Component={LinkRedirect} />
        </Routes>
      </NavBar>
    </ThemeProvider>
  );
};

export default App;
