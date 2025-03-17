import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import loginBg from '../assets/login-bgg.png';
import "./Login.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import HomePage from "../pages/Home";
import Signup from "../pages/Signup";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/users/login", {
        username: formData.username,
        password: formData.password,
      });

      if (response.data.success) {
        toast.success("Login successful!");
        navigate("/HomePage"); // Redirect to the home page
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data);
        toast.error(`Login failed: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response received from the server. Please try again.");
      } else {
        console.error("Request setup error:", error.message);
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-container">
      <div className="row w-75 shadow-lg custom-rounded">
        {/* Left Side: Image & Branding */}
        <div className="col-md-6 p-0 bg-info-subtle">
          <img src={loginBg} alt="Laundry Illustration" className="img-fluid" />
        </div>

        {/* Right Side: Login Form */}
        <div className="col-md-6 p-6 bg-info-subtle right-container">
          <h2 className="text-dark fw-bold text-center">WELCOME</h2>
          <p className="text-center text-muted"><em>Login with username</em></p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control bg-light"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control bg-light"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
           <button
             type="button"
             className="btn btn-primary w-100 fw-bold"
             onClick={() => window.location.href = "/HomePage"}>
             Login
           </button>

          </form>

          <p className="mt-3 text-center">
            "Don't have an account?" <a href="/SignUp" className="fw-bold text-dark">Create an account</a>
          </p>
        </div>
      </div>

      {/* Toastify Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Login;