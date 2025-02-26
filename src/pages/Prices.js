import React, { useState, useMemo, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import washFoldActive from "../assets/wash-fold-active.png";
import washIronInactive from "../assets/wash-iron-inactive.png";
import steamIronInactive from "../assets/steam-iron-inactive.png";
import dryCleanInactive from "../assets/dry-cleaning-inactive.png";

// Import clothing item icons for men
import halfSleeveShirtIcon from "../assets/washFoldPrice/half-sleeve-shirt.png";
import halfSleeveTShirtIcon from "../assets/washFoldPrice/half-sleeve-tshirt.png";
import fullSleeveTShirtIcon from "../assets/washFoldPrice/full-sleeve-tshirt.png";
import fullSleeveShirtIcon from "../assets/washFoldPrice/full-sleeve-shirt.png";
import jacketIcon from "../assets/washFoldPrice/jacket.png";
import flakJacketIcon from "../assets/washFoldPrice/flak-jacket.png";
import trousersIcon from "../assets/washFoldPrice/trousers.png";
import jeansIcon from "../assets/washFoldPrice/jeans.png";
import shortsIcon from "../assets/washFoldPrice/shorts.png";
import sweatshirtIcon from "../assets/washFoldPrice/sweatshirt.png";
import trackpantIcon from "../assets/washFoldPrice/trackpant.png";
import kurtaIcon from "../assets/washFoldPrice/kurta.png";

// Import clothing item icons for women
import halfSleeveShirtIconWomen from "../assets/washFoldPrice/half-sleeve-shirt-women.png";
import halfSleeveTShirtIconWomen from "../assets/washFoldPrice/half-sleeve-tshirt-women.png";
import fullSleeveTShirtIconWomen from "../assets/washFoldPrice/full-sleeve-tshirt-women.png";
import fullSleeveShirtIconWomen from "../assets/washFoldPrice/full-sleeve-shirt-women.png";
import jacketIconWomen from "../assets/washFoldPrice/jacket-women.png";
import bathrobeIconWomen from "../assets/washFoldPrice/bathrobe-women.png";
import trousersIconWomen from "../assets/washFoldPrice/trousers-women.png";
import jeggingsIconWomen from "../assets/washFoldPrice/jeggings-women.png";
import petticoatIconWomen from "../assets/washFoldPrice/petticoat-women.png";
import jumpsuitIconWomen from "../assets/washFoldPrice/jumpsuit-women.png";
import sareeIconWomen from "../assets/washFoldPrice/saree-women.png";
import nightGownIconWomen from "../assets/washFoldPrice/night-gown-women.png";

// Import clothing item icons for kids
import halfSleeveShirtIconKids from "../assets/washFoldPrice/half-sleeve-shirt-kids.png";
import halfSleeveTShirtIconKids from "../assets/washFoldPrice/half-sleeve-tshirt-kids.png";
import trousersIconKids from "../assets/washFoldPrice/trousers-kids.png";
import jeansIconKids from "../assets/washFoldPrice/jeans-kids.png";
import shortsIconKids from "../assets/washFoldPrice/shorts-kids.png";
import jacketIconKids from "../assets/washFoldPrice/jacket-kids.png";
import kurtaIconKids from "../assets/washFoldPrice/kurta-kids.png";
import sweaterIconKids from "../assets/washFoldPrice/sweater-kids.png";
import jumpsuitIconKids from "../assets/washFoldPrice/jumpsuit-kids.png";

function PriceList() {
  const [activeTab, setActiveTab] = useState("men");
  const [activeService, setActiveService] = useState("wash_fold");

  // Memoize service items to prevent re-creation on each render
  const serviceItems = useMemo(
    () => ({
      men: [
        {
          name: "Half-Sleeve Shirt",
          price: "₹25",
          image: halfSleeveShirtIcon,
        },
        {
          name: "Half-Sleeve T-Shirt",
          price: "₹25",
          image: halfSleeveTShirtIcon,
        },
        {
          name: "Full-Sleeve T-Shirt",
          price: "₹35",
          image: fullSleeveTShirtIcon,
        },
        {
          name: "Full-Sleeve Shirt",
          price: "₹30",
          image: fullSleeveShirtIcon,
        },
        { name: "Jacket", price: "₹140", image: jacketIcon },
        {
          name: "Flak Jacket",
          price: "₹150",
          image: flakJacketIcon,
        },
        { name: "Trousers", price: "₹40", image: trousersIcon },
        { name: "Jeans", price: "₹50", image: jeansIcon },
        { name: "Shorts", price: "₹25", image: shortsIcon },
        { name: "Sweatshirt", price: "₹75", image: sweatshirtIcon },
        { name: "Trackpant", price: "₹40", image: trackpantIcon },
        { name: "Kurta", price: "₹40", image: kurtaIcon },
      ],
      women: [
        {
          name: "Half-Sleeve Shirt",
          price: "₹25",
          image: halfSleeveShirtIconWomen,
        },
        {
          name: "Half-Sleeve T-Shirt",
          price: "₹25",
          image: halfSleeveTShirtIconWomen,
        },
        {
          name: "Full-Sleeve T-Shirt",
          price: "₹35",
          image: fullSleeveTShirtIconWomen,
        },
        {
          name: "Full-Sleeve Shirt",
          price: "₹30",
          image: fullSleeveShirtIconWomen,
        },
        { name: "Jacket", price: "₹140", image: jacketIconWomen },
        {
          name: "Bathrobe",
          price: "₹75",
          image: bathrobeIconWomen,
        },
        { name: "Trousers", price: "₹40", image: trousersIconWomen },
        { name: "Jeggings", price: "₹50", image: jeggingsIconWomen },
        { name: "Petticoat", price: "₹25", image: petticoatIconWomen },
        { name: "Jumpsuit", price: "₹75", image: jumpsuitIconWomen },
        { name: "Saree", price: "₹50", image: sareeIconWomen },
        { name: "Night Gown", price: "₹50", image: nightGownIconWomen },
      ],
      kids: [
        {
          name: "Half-Sleeve Shirt",
          price: "₹15",
          image: halfSleeveShirtIconKids,
        },
        {
          name: "Half-Sleeve T-Shirt",
          price: "₹15",
          image: halfSleeveTShirtIconKids,
        },
        { name: "Trousers", price: "₹20", image: trousersIconKids },
        { name: "Jeans", price: "₹20", image: jeansIconKids },
        { name: "Frock", price: "₹25", image: shortsIconKids },
        { name: "Kurta", price: "₹15", image: kurtaIconKids },
        { name: "Jumpsuit", price: "₹20", image: jumpsuitIconKids },
        { name: "Sweater", price: "₹25", image: sweaterIconKids },
        { name: "Shorts", price: "₹15", image: shortsIconKids },
        { name: "Jacket", price: "₹100", image: jacketIconKids },
      ],
    }),
    []
  );

  // Memoize laundry services
  const laundryServices = useMemo(
    () => [
      { id: "wash_fold", name: "WASH + FOLD", image: washFoldActive },
      { id: "wash_iron", name: "WASH + IRON", image: washIronInactive },
      { id: "steam_iron", name: "STEAM IRON", image: steamIronInactive },
      { id: "dry_clean", name: "DRY CLEAN", image: dryCleanInactive },
    ],
    []
  );

  // Memoize service click handler
  const handleServiceClick = useCallback((serviceId) => {
    setActiveService(serviceId);
  }, []);

  return (
    <div className="container-fluid p-0">
      {/* Navbar section */}
      <Navbar />

      <div className="d-flex flex-column min-vh-100">
        <div className="bg-info bg-opacity-25 py-5">
          <Container className="text-center">
            <h1 className="fw-bold">Pricelist</h1>
          </Container>
        </div>

        <Container className="py-5">
          <Row>
            {/* Service Types Sidebar */}
            <Col md={3}>
              <Card className="mb-4 border-0 rounded-4">
                <div
                  className="text-dark rounded-4"
                  style={{ backgroundColor: "#003242" }}
                >
                  {laundryServices.map((service) => (
                    <div
                      key={service.id}
                      className={`d-flex align-items-center p-3 border-bottom border-light ${
                        activeService === service.id
                          ? "bg-info bg-opacity-25"
                          : ""
                      }`}
                      style={{
                        cursor: "pointer",
                        backgroundColor: "#bce3fa",
                      }}
                      onClick={() => handleServiceClick(service.id)}
                    >
                      <div className="me-3">
                        <img
                          src={service.image}
                          alt={service.name}
                          loading="lazy"
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "contain",
                          }}
                          onError={(e) =>
                            (e.target.src = "/images/placeholder.png")
                          }
                        />
                      </div>
                      <div className="fw-bold">{service.name}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

            {/* Clothing Items Grid */}
            <Col md={8} className="d-flex flex-column align-items-start">
              {/* Category Tabs */}
              <div className="mb-4">
                {["men", "women", "kids"].map((category) => (
                  <Button
                    key={category}
                    variant={activeTab === category ? "dark" : "outline-dark"}
                    onClick={() => setActiveTab(category)}
                    className="me-2 rounded-pill px-4"
                  >
                    {category.toUpperCase()}
                  </Button>
                ))}
              </div>

              {/* Items Grid */}
              <Row>
                {serviceItems[activeTab].map((item, index) => (
                  <Col md={4} key={index} className="mb-4">
                    <Card className="h-100 border rounded-4 shadow-sm">
                      <Card.Body className="d-flex flex-column align-items-center p-4">
                        <div
                          className="bg-info bg-opacity-25 rounded-circle d-flex justify-content-center align-items-center"
                          style={{
                            width: "70px",
                            height: "70px",
                            marginBottom: "15px",
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "contain",
                            }}
                            onError={(e) =>
                              (e.target.src = "/images/placeholder.png")
                            }
                          />
                        </div>
                        <Card.Title className="mb-3 text-center">
                          {item.name}
                        </Card.Title>
                        <Card.Text className="fs-4 fw-bold">
                          {item.price}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer section */}
      <Footer />
    </div>
  );
}

export default PriceList;
