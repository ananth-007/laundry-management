import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import Footer from "../components/Footer";
import NavbarBeforeLogin from "../components/NavbarBeforeLogin";
import heroLogo from "../assets/hero-bg.png";
import washFold from "../assets/wash-fold.png";
import washIron from "../assets/wash-iron.png";
import steamIron from "../assets/steam-iron.png";
import dryClean from "../assets/dry-clean.png";
import "./GetStarted.css";


const GetStarted = () => {

  return (
    
    <div className="container-fluid p-0">
      {/* Navbar */}
      <NavbarBeforeLogin />

      {/* Hero Section */}
      <section className="hero text-center py-5 bg-info-subtle bg-height">
          <Container>
            <Row className="align-items-center">
              <Col md={6} className="text-start">
                <h1>Effortless Laundry Solution at your Fingertips</h1>
                <p>
                  Streamline your laundry routine with our intuitive app that offers 
                  on-demand pickup, eco-friendly washing, and convenient scheduling.
                </p>
                <Button variant="dark" className="me-2 mt-3"><a href="Signup.js" style={{ textDecoration: 'none', color: 'inherit' }}>Join Now</a></Button>
                <Button variant="outline-dark" className="mt-3">Discover More</Button>
              </Col>
              <Col md={6}>
                <img src={heroLogo} alt="Laundry Service" className="img-fluid hero-img" style={{width:'70%',height:'70%'}} />
              </Col>
            </Row>
          </Container>
      </section>

      {/* Services Section */}
      <section className="text-center py-5 container-fluid shadow-lg rounded-5 justify-content-center services-center">
        <Container>
          <Row className="services">
            <Col md={3}><img src={washFold} alt="Wash & Fold"/><p><strong>Wash & Fold</strong></p></Col>
            <Col md={3}><img src={washIron} alt="Wash & Iron"/><p><strong>Wash & Iron</strong></p></Col>
            <Col md={3}><img src={steamIron} alt="Steam Iron"/><p><strong>Steam Iron</strong></p></Col>
            <Col md={3}><img src={dryClean} alt="Dry Cleaning"/><p><strong>Dry Cleaning</strong></p></Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section className="about text-center py-5 bg-light">
        <Container>
          <Row>
            <Col md={6}>
              <img src="/about-image.jpg" alt="About Us" className="img-fluid" />
            </Col>
            <Col md={6}>
              <h2>Hi! We're Bachelor's Dhobi</h2>
              <p>
                We blend technology with eco-friendly cleaning to give your 
                clothes the best care. From daily washes to premium dry cleaning, 
                we handle it all hassle-free.
              </p>
              <ul>
                <li>✅ Quick & Reliable Service</li>
                <li>✅ Eco-Friendly Cleaning</li>
                <li>✅ Pickup & Delivery at Your Doorstep</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Us Section */}
      <section className="why-us text-center py-5">
        <Container>
          <h2>Why Us?</h2>
          <Row className="mt-4">
            <Col md={4}><h5>🧼 Hygienic Guaranteed</h5><p>One washing machine per customer.</p></Col>
            <Col md={4}><h5>📦 Assurance of Goods</h5><p>Nothing is lost or left behind.</p></Col>
            <Col md={4}><h5>📊 Accurate Calculation</h5><p>Payments calculated per kg or piece.</p></Col>
          </Row>
          <Row className="mt-3">
            <Col md={4}><h5>🚚 Delivery Service</h5><p>Pick-up and drop-off available.</p></Col>
            <Col md={4}><h5>💳 Payment Options</h5><p>Cash & electronic payments accepted.</p></Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials text-center py-5 bg-light">
        <Container>
          <h2>What They Say About Us</h2>
          <Row className="mt-4">
            <Col md={4}>
              <div className="p-3 border rounded">
                <h5>Ying Li</h5>
                <p>⭐⭐⭐⭐⭐</p>
                <p>"Great service! Clothes always come back fresh and clean."</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-3 border rounded">
                <h5>Sarah Williams</h5>
                <p>⭐⭐⭐⭐⭐</p>
                <p>"Affordable and quick service. Will use again!"</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-3 border rounded">
                <h5>Emily Roberts</h5>
                <p>⭐⭐⭐⭐⭐</p>
                <p>"Convenient and top-quality cleaning."</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Contact Us</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input type="text" className="form-control" placeholder="Your name" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="tel" className="form-control" placeholder="Your phone" />
                  </div>
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Your email" />
                </div>
                <div className="mb-3">
                  <textarea className="form-control" rows="4" placeholder="Your message"></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default GetStarted;
