import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer";

const StoreLocator = () => {
  const stores = [
    {
      id: 1,
      name: "Bachelor's Dhobi Laundry Store, Malleshwaram",
      address:
        "Pragathi Mansion, Margosa Rd, Malleshwaram, Bengaluru, Karnataka 560003, India",
      image: "malleshwaram-store.jpg",
    },
    {
      id: 2,
      name: "Bachelor's Dhobi Laundry Store, Bellandur",
      address:
        "24, Palm Ave, Green Glen Layout, Bellandur, Bengaluru, Karnataka 560103, India",
      image: "bellandur-store.jpg",
    },
    {
      id: 3,
      name: "Bachelor's Dhobi Laundry Store, RR Nagar",
      address:
        "BFML Layout, 5th Stage, Rajarajeshwari Nagar, Bengaluru, Karnataka 560098, India",
      image: "rr-nagar-store.jpg",
    },
    {
      id: 4,
      name: "Bachelor's Dhobi Laundry Store, K R Puram",
      address:
        "KHB Colony, Bhattarahalli, Hosakotehoralnahalli, K R Puram, Bengaluru, Karnataka 560049, India",
      image: "kr-puram-store.jpg",
    },
    {
      id: 5,
      name: "Bachelor's Dhobi Laundry Store, Thanisandra Main Road",
      address:
        "Off Kempegowda International Airport Road, 5th Phase, Thanisandra, Bengaluru, Karnataka 560077, India",
      image: "thanisandra-store.jpg",
    },
    {
      id: 6,
      name: "Bachelor's Dhobi Laundry Store, Yelahanka",
      address:
        "No. 11/1, A S Complex, 1st A Main Road, Near Police Station, Yelahanka New Town 560064",
      image: "yelahanka-store.jpg",
    },
    {
      id: 7,
      name: "Bachelor's Dhobi Laundry Store, Sahakara Nagar",
      address:
        "Kodigehalli main road, sahakarnagar, Sahakarnagar, Bengaluru, Karnataka 560092, India",
      image: "sahakara-nagar-store.jpg",
    },
    {
      id: 8,
      name: "Bachelor's Dhobi Laundry Store, Malleshwaram",
      address:
        "Pragathi Mansion, Margosa Rd, Malleshwaram, Bengaluru, Karnataka 560003, India",
      image: "malleshwaram-2-store.jpg",
    },
    {
      id: 9,
      name: "Bachelor's Dhobi Laundry Store, Hoodi",
      address:
        "Gali Rd, Maruthi Nagar, Basavanna Nagar, Whitefield, Bengaluru, Karnataka 560048, India",
      image: "hoodi-store.jpg",
    },
  ];

  return (
    <div className="app">
      {/* Header */}
      <Navbar />

      {/* Store Locator Title */}
      <div className=" bg-info-subtle py-5">
        <Container>
          <h1 className="text-center fw-bold">Store Locator</h1>
        </Container>
      </div>

      {/* Store Listings */}
      <Container className="py-5">
        <Row>
          {stores.map((store) => (
            <Col lg={4} md={6} className="mb-4" key={store.id}>
              <Card className="h-100 shadow-sm rounded">
                <Card.Img
                  variant="top"
                  src={store.image}
                  alt={store.name}
                  className="img-fluid"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold fs-6">{store.name}</Card.Title>
                  <Card.Text className="small text-muted">
                    {store.address}
                  </Card.Text>
                  <Button variant="dark" size="sm" className="rounded-0 px-4">
                    Get Direction
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default StoreLocator;
