import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm container-bg">
      <div className="container">
        {/* Logo */}
        <a href="#" className="navbar-brand">
          <img src={logo} width="200px" height="55px" alt="Logo" />
        </a>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div className="collapse navbar-collapse d-flex justify-content-between align-items-center" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            <li className="nav-item">
              <a className="nav-link fw-bold" href="#">Home</a>
            </li>

            {/* Services Dropdown */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle fw-bold btn"
                type="button"
                id="servicesDropdown"
                aria-expanded={isDropdownOpen}
                onClick={toggleDropdown}
                ref={dropdownRef}
              >
                Services
              </button>
              <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`} aria-labelledby="servicesDropdown">
                <li><a className="dropdown-item fw-regular" href="#">Wash & Fold</a></li>
                <li><a className="dropdown-item fw-regular" href="#">Wash & Iron</a></li>
                <li><a className="dropdown-item fw-regular" href="#">Steam Iron</a></li>
                <li><a className="dropdown-item fw-regular" href="#">Dry Cleaning</a></li>
              </ul>
            </li>

            <li className="nav-item"><a className="nav-link fw-bold" href="#">Prices</a></li>
            <li className="nav-item"><a className="nav-link fw-bold" href="#">Stores</a></li>
            <li className="nav-item"><a className="nav-link fw-bold" href="#">Schedule a Pickup</a></li>
            <li className="nav-item"><a className="nav-link fw-bold" href="#">Contact</a></li>
          </ul>

          {/* Profile Icon */}
          <a href="#" className="profile-icon ms-3">
            <img src="profile.png" width="35px" height="35px" alt="Profile" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
