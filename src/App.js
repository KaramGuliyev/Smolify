import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/LandingPage";
import Account from "./components/Account";
import NavBar from "./Layouts/NavBar";
import "./index.css"

const App = () => {
  return (
    <Router>
      <NavBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </NavBar>
    </Router>
  );
};

export default App;
