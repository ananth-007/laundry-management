import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import GetStarted from "./pages/GetStarted";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/Home";
import Stores from "./pages/Stores";
import PriceList from "./pages/Prices";
import DryCleaning from "./pages/DryCleaning";
import SteamIron from "./pages/SteamIron";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/GetStarted" element={<GetStarted />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Stores" element={<Stores />} />
        <Route path="/PriceList" element={<PriceList />} />
        <Route path="/DryCleaning" element={<DryCleaning />} />
        <Route path="/SteamIron" element={<SteamIron />} />
      </Routes>
    </Router>
  );
};

export default App;
