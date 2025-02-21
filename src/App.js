import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GetStarted from './pages/GetStarted';
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/Login.js" element={<Login />} />
        <Route path="/Signup.js" element={<Signup />} />
        
      </Routes>
    </Router>
  );
};

export default App;
