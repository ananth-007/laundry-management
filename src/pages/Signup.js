import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignupBg from '../assets/login-bgg.png';
import "./Signup.css";

function Signup() {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-container">
      <div className="row w-75 shadow-lg custom-rounded bg-overlay">
        {/* Left Side: Image & Branding */}
        <div className="col-md-6 p-0 bg-info-subtle">
          <img
            src={SignupBg}
            alt="Laundry Illustration"
            className="img-fluid"
          />
        </div>

        {/* Right Side: Signup Form */}
        <div className="col-md-6 p-5 bg-info-subtle">
          <h2 className="text-dark fw-bold text-center">SIGN UP</h2>
          <p className="text-center text-muted"><em>Create your free account</em></p>

          <form>
            <div className="mb-3">
              <input type="text" className="form-control bg-light" placeholder="Full Name" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control bg-light" placeholder="Username" />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control bg-light" placeholder="Email" />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control bg-light" placeholder="Password" />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control bg-light" placeholder="Confirm Password" />
            </div>

            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="terms" />
              <label className="form-check-label" htmlFor="terms">
                I agree to <span className="fw-bold">Terms of User</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-bold">
              Create Account
            </button>
          </form>

          <p className="mt-3 text-center">
            Already have an account? <a href="Login.js" className="fw-bold text-dark">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
