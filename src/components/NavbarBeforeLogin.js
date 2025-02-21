import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/NavbarBeforeLogin.css";
import logo from '../assets/logo.png';
import { useEffect } from "react";

const NavbarBeforeLogin = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm container-bg bg-info-subtle">
      <div className="container">
        {/* Logo */}
        <a href="#" className="navbar-brand">
          <img src={logo} className="img-fluid logo pd-0" alt="Logo" />
        </a>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div className="collapse navbar-collapse d-flex justify-content-between align-items-center" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            <li className="nav-item">
              <a className="nav-link fw-bold nav-hover" href="#">Home</a>
            </li>

            {/* Services Dropdown */}
            <li className="nav-item dropdown">
              <button
                className={`nav-link dropdown-toggle fw-bold btn nav-hover ${isDropdownOpen ? "active" : ""}`}
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

            <li className="nav-item"><a className="nav-link fw-bold nav-hover" href="#">Prices</a></li>
            <li className="nav-item"><a className="nav-link fw-bold nav-hover" href="#">Stores</a></li>
            <li className="nav-item"><a className="nav-link fw-bold nav-hover" href="#">Schedule a Pickup</a></li>
            <li className="nav-item"><a className="nav-link fw-bold nav-hover" href="#">Contact</a></li>
          </ul>

        </div>

      </div>
    </nav>
  );
};

export default NavbarBeforeLogin;
