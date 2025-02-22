import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import GetStarted from './pages/GetStarted';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/GetStarted" element={<GetStarted />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/HomePage" element={<HomePage />}/>
        
        
      </Routes>
    </Router>
  );
};

export default App;
