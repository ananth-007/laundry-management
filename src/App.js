import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import GetStarted from "./pages/GetStarted";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./pages/Home";
import Stores from "./pages/Stores";
import PriceList from "./pages/Prices";
import DryCleaning from "./pages/DryCleaning";
import SteamIron from "./pages/SteamIron";
import WashFold from "./pages/Wash-Fold";
import WashIron from "./pages/Wash-Iron";
import SchedulePickup from "./pages/SchedulePickup";
import ProfilePage from "./pages/Profile";
import OrderStatus from "./pages/OrderStatus";
import HistoryPage from "./pages/HistoryPage";
import ProtectedRoute from "./pages/ProtectedRoute";
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
        <Route
          path="/HomePage"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/Stores" element={<Stores />} />
        <Route path="/PriceList" element={<PriceList />} />
        <Route path="/DryCleaning" element={<DryCleaning />} />
        <Route path="/SteamIron" element={<SteamIron />} />
        <Route path="/WashFold" element={<WashFold />} />
        <Route path="/WashIron" element={<WashIron />} />
        <Route path="/SchedulePickup" element={<SchedulePickup />} />
        <Route
          path="/OrderStatus"
          element={
            <ProtectedRoute>
              <OrderStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ProfilePage"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/HistoryPage"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
