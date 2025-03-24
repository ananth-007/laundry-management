import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Nav, Image } from "react-bootstrap";
import {
  FaHome,
  FaStore,
  FaClipboardList,
  FaHistory,
  FaSignOutAlt,
  FaEdit,
  FaUser,
  FaEnvelope,
  FaUpload,
} from "react-icons/fa";
import LaundryBanner from "../assets/ProfileImg/laundry-banner.png";
import logo from "../assets/logo.png";
import profileImg from "../assets/ProfileImg/profile-img.jpg";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    name: "Ratan Tata",
    email: "ratantata@gmail.com",
    phone: "+91 8867535499",
    avatar: profileImg,
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    sessionStorage.clear();

    // Clear history and force redirect
    window.history.go(-(window.history.length - 1));
    window.location.href = "/Login";
  };

  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check if file exists and validate file type
    if (!file) return;

    // Check file type
    if (!file.type.match("image/jpeg") && !file.type.match("image/png")) {
      alert("Please upload a JPG or PNG file");
      return;
    }

    // Check file size (10MB = 10 * 1024 * 1024 bytes)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit");
      return;
    }

    // Create a preview URL for the image
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
      // Also update the user info avatar
      setUserInfo({
        ...userInfo,
        avatar: reader.result,
      });
    };
    reader.readAsDataURL(file);

    // Here you would typically handle the file upload to your server
    uploadFile(file);
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    // Example using fetch:
    // fetch('/api/upload-avatar', {
    //   method: 'POST',
    //   body: formData
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    // })
    // .catch(error => {
    //   console.error('Error:', error);
    // });
  };

  return (
    <Container fluid className="p-0 m-0">
      <Row className="m-0">
        {/* Sidebar */}
        <Col
          xs={3}
          md={3}
          lg={2}
          className="p-0 min-vh-100"
          style={{ backgroundColor: "#daf5ff" }}
        >
          <div className="d-flex flex-column h-100">
            <div className="p-2 text-start">
              <Image
                src={logo}
                alt="Bachelor's Dhobi Logo"
                fluid
                style={{ maxWidth: "150px" }}
              />
            </div>

            <Nav className="flex-column mt-4">
              <Nav.Link
                href="/HomePage"
                className="p-3 d-flex align-items-center text-dark"
              >
                <FaHome className="me-3" size={20} /> Home
              </Nav.Link>
              <Nav.Link
                href="/Stores"
                className="p-3 d-flex align-items-center text-dark"
              >
                <FaStore className="me-3" size={20} /> Stores
              </Nav.Link>
              <Nav.Link
                href="/OrderStatus"
                className="p-3 d-flex align-items-center text-dark"
              >
                <FaClipboardList className="me-3" size={20} /> Orders
              </Nav.Link>
              <Nav.Link
                href="/OrderHistory"
                className="p-3 d-flex align-items-center text-dark"
              >
                <FaHistory className="me-3" size={20} /> History
              </Nav.Link>
            </Nav>

            <div className="mt-auto p-3">
              <Button
                onClick={handleLogout}
                variant="dark"
                className="w-100 d-flex align-items-center justify-content-center rounded-4"
              >
                <FaSignOutAlt className="me-2" /> Logout
              </Button>
            </div>
          </div>
        </Col>

        {/* Main Content */}
        <Col xs={9} md={9} lg={10} className="p-0">
          {/* Header with Laundry Banner */}
          <div className="position-relative border-bottom">
            <img
              src={LaundryBanner}
              alt="Laundry Banner"
              className="w-100"
              style={{ height: "auto", objectFit: "cover" }}
            />

            {/* Profile Picture */}
            <div
              className="position-absolute"
              style={{ bottom: "-80px", left: "50px" }}
            >
              <Image
                src={userInfo.avatar}
                roundedCircle
                style={{
                  width: "180px",
                  height: "180px",
                  border: "3px solid white",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </div>
          </div>

          {/* Profile Information */}
          <Container className="mt-5 p-5">
            <Row>
              <Col
                xs={12}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <h2>{userInfo.name}</h2>
                  <p className="text-muted">{userInfo.email}</p>
                </div>
                <Button
                  variant="outline-primary"
                  className="d-flex align-items-center"
                >
                  Edit <FaEdit className="ms-2" />
                </Button>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col xs={12}>
                <h4>Personal Info</h4>
                <p className="text-muted">
                  You can change your personal information settings here.
                </p>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col xs={12}>
                <Form
                  className="bg-white p-4 rounded-4"
                  style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)" }}
                >
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Full Name</Form.Label>
                        <div
                          className="input-group rounded-4"
                          style={{
                            border: "1px solid black",
                            overflow: "hidden",
                          }}
                        >
                          <span className="input-group-text">
                            <FaUser />
                          </span>
                          <Form.Control
                            type="text"
                            placeholder="Enter your full name"
                            value={userInfo.name}
                            onChange={(e) =>
                              setUserInfo({ ...userInfo, name: e.target.value })
                            }
                          />
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <div
                          className="input-group rounded-4"
                          style={{
                            border: "1px solid black",
                            overflow: "hidden",
                          }}
                        >
                          <span className="input-group-text">
                            <FaEnvelope />
                          </span>
                          <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={userInfo.email}
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <div
                          className="input-group rounded-4"
                          style={{
                            border: "1px solid black",
                            overflow: "hidden",
                          }}
                        >
                          <span className="input-group-text">+91</span>
                          <Form.Control
                            type="tel"
                            placeholder="Enter your phone number"
                            value={userInfo.phone}
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
                                phone: e.target.value,
                              })
                            }
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label>Change Avatar</Form.Label>
                        <div
                          className="position-relative p-5 text-center rounded-4"
                          style={{
                            border: "2px dotted black",
                            borderSpacing: "15px",
                            overflow: "hidden",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            document.getElementById("fileInput").click()
                          }
                        >
                          <FaUpload size={24} className="mb-3" />
                          <h5>Click here to upload your image.</h5>
                          <p className="text-muted small">
                            Supported format JPG, PNG(10mb each)
                          </p>
                          <Form.Control
                            id="fileInput"
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
