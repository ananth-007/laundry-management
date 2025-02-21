import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import loginBg from '../assets/login-bgg.png';
import "./Login.css";

function Login() {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-container">
      <div className="row w-75 shadow-lg custom-rounded">
        {/* Left Side: Image & Branding */}
        <div className="col-md-6 p-0 bg-info-subtle">
          <img
            src={loginBg}
            alt="Laundry Illustration"
            className="img-fluid"
          />
        </div>

        {/* Right Side: Signup Form */}
        <div className="col-md-6 p-6 bg-info-subtle right-container">
          <h2 className="text-dark fw-bold text-center">WELCOME</h2>
          <p className="text-center text-muted"><em>login with uername</em></p>

          <form>
            <div className="mb-3">
              <input type="text" className="form-control bg-light" placeholder="Username" />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control bg-light" placeholder="Password" />
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-bold">
              Login
            </button>
          </form>

          <p className="mt-3 text-center">
            Don't have an account? <a href="Signup.js" className="fw-bold text-dark">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
}


export default Login;
