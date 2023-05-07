import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/LandingPage";
import Account from "./Pages/Account";
import NavBar from "./Layouts/NavBar";

import { ThemeProvider } from "@emotion/react";
import theme from "./theme";

import "./index.css";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </NavBar>
      </Router>
    </ThemeProvider>
  );
};

export default App;
