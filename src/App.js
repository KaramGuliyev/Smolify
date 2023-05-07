import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/LandingPage";
import Account from "./Pages/Account";
import NavBar from "./Layouts/NavBar";

import { ThemeProvider } from "@emotion/react";
import theme from "./theme";

import "./index.css";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";

const App = () => {
  const [user, setUser] = useState(null);
  const [initalLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setInitialLoad(false);
    });
  }, []);

  if (initalLoad)
    return (
      <Box mt={5} display={"flex"} justifyContent={"center"}>
        <CircularProgress />
      </Box>
    );

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
