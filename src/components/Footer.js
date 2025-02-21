import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Bachelor's Dhobi</h5>
              <p>We have been dedicated to providing high-quality laundry services since 2024.</p>
            </div>
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light">Home</a></li>
                <li><a href="#" className="text-light">Services</a></li>
                <li><a href="#" className="text-light">Prices</a></li>
                <li><a href="#" className="text-light">Contact</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Connect With Us</h5>
              <div className="d-flex gap-3">
                <a href="#" className="text-light"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-light"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-light"><i className="bi bi-twitter"></i></a>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="mb-0">© Copyright 2024 | Bachelor's Dhobi</p>
          </div>
        </div>
      </footer>
    );
}

export default Footer;