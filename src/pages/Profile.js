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
  FaPhoneAlt,
  FaCamera,
} from "react-icons/fa";
import LaundryBanner from "../assets/ProfileImg/laundry-banner.png";
import logo from "../assets/logo.png";
import profileImg from "../assets/ProfileImg/profile-img.jpg";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    name: "Ratan Tata",
    email: "ratantata@gmail.com",
    phone: "8867535499",
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
  const [isEditing, setIsEditing] = useState(false);

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

  const handleSaveChanges = () => {
    setIsEditing(false);
    // Here you would save changes to the backend
    alert("Changes saved successfully!");
  };

  return (
    <Container fluid className="p-0 m-0">
      <Row className="m-0">
        {/* Sidebar */}
        <Col
          xs={2}
          md={2}
          lg={2}
          className="p-0 min-vh-100 shadow"
          style={{
            background: "#003242",
            color: "white",
            transition: "all 0.3s",
          }}
        >
          <div className="d-flex flex-column h-100">
            <div className="p-3 text-center">
              <Image
                src={logo}
                alt="Bachelor's Dhobi Logo"
                fluid
                style={{ maxWidth: "200px" }}
                className="mb-0"
              />
            </div>

            <Nav className="flex-column mt-5">
              <Nav.Link
                href="/HomePage"
                className="py-3 px-4 d-flex align-items-center text-white"
              >
                <FaHome className="me-3" size={18} /> Home
              </Nav.Link>
              <Nav.Link
                href="/Stores"
                className="py-3 px-4 d-flex align-items-center text-white"
              >
                <FaStore className="me-3" size={18} /> Stores
              </Nav.Link>
              <Nav.Link
                href="/OrderStatus"
                className="py-3 px-4 d-flex align-items-center text-white"
              >
                <FaClipboardList className="me-3" size={18} /> Orders
              </Nav.Link>
              <Nav.Link
                href="/OrderHistory"
                className="py-3 px-4 d-flex align-items-center text-white"
              >
                <FaHistory className="me-3" size={18} /> History
              </Nav.Link>
            </Nav>

            <div className="mt-auto p-4">
              <Button
                onClick={handleLogout}
                variant="light"
                className="w-100 d-flex align-items-center justify-content-center rounded-pill py-2"
              >
                <FaSignOutAlt className="me-2" /> Logout
              </Button>
            </div>
          </div>
        </Col>

        {/* Main Content */}
        <Col xs={10} md={10} lg={10} className="p-0 bg-light">
          {/* Header with Laundry Banner */}
          <div className="position-relative">
            <img
              src={LaundryBanner}
              alt="Laundry Banner"
              className="w-100"
              style={{
                height: "auto",
                objectFit: "cover",
              }}
            />

            {/* Profile Picture */}
            <div
              className="position-absolute"
              style={{ bottom: "-70px", left: "60px" }}
            >
              <div className="position-relative">
                <Image
                  src={userInfo.avatar}
                  roundedCircle
                  style={{
                    width: "150px",
                    height: "150px",
                    border: "5px solid white",
                    objectFit: "cover",
                    objectPosition: "center",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <div
                  className="position-absolute bg-primary text-white d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    bottom: "10px",
                    right: "5px",
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                  }}
                  onClick={() => document.getElementById("avatarInput").click()}
                >
                  <FaCamera size={18} />
                  <input
                    id="avatarInput"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <Container className="mt-5 py-4 px-5">
            <Row className="mt-5">
              <Col
                xs={12}
                className="d-flex justify-content-between align-items-center mb-4"
              >
                <div>
                  <h2 className="fw-bold">{userInfo.name}</h2>
                  <p className="text-muted mb-0">{userInfo.email}</p>
                </div>
                {isEditing ? (
                  <Button
                    variant="primary"
                    className="d-flex align-items-center rounded-pill px-4"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </Button>
                ) : (
                  <Button
                    variant="outline-primary"
                    className="d-flex align-items-center rounded-pill px-4"
                    onClick={() => setIsEditing(true)}
                  >
                    <FaEdit className="me-2" /> Edit Profile
                  </Button>
                )}
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <div className="bg-white p-4 rounded-4 shadow-sm">
                  <h4 className="mb-1 fw-bold">Personal Information</h4>
                  <p className="text-muted small mb-4">
                    Manage your personal information and account settings
                  </p>

                  <Form>
                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Full Name
                          </Form.Label>
                          <div
                            className="input-group"
                            style={{
                              overflow: "hidden",
                            }}
                          >
                            <span className="input-group-text bg-light border-end-0">
                              <FaUser className="text-primary" />
                            </span>
                            <Form.Control
                              type="text"
                              placeholder="Enter your full name"
                              value={userInfo.name}
                              onChange={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  name: e.target.value,
                                })
                              }
                              readOnly={!isEditing}
                              className="border-start-0 py-2"
                              style={{
                                backgroundColor: isEditing
                                  ? "white"
                                  : "#f8f9fa",
                              }}
                            />
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Email Address
                          </Form.Label>
                          <div
                            className="input-group"
                            style={{
                              overflow: "hidden",
                            }}
                          >
                            <span className="input-group-text bg-light border-end-0">
                              <FaEnvelope className="text-primary" />
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
                              readOnly={!isEditing}
                              className="border-start-0 py-2"
                              style={{
                                backgroundColor: isEditing
                                  ? "white"
                                  : "#f8f9fa",
                              }}
                            />
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Phone Number
                          </Form.Label>
                          <div
                            className="input-group"
                            style={{
                              overflow: "hidden",
                            }}
                          >
                            <span className="input-group-text bg-light border-end-0">
                              <FaPhoneAlt className="text-primary" />
                            </span>
                            <span className="input-group-text bg-light border-start-0 border-end-0">
                              +91
                            </span>
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
                              readOnly={!isEditing}
                              className="border-start-0 py-2"
                              style={{
                                backgroundColor: isEditing
                                  ? "white"
                                  : "#f8f9fa",
                              }}
                            />
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>

                    {isEditing && (
                      <Row>
                        <Col xs={12}>
                          <Form.Group>
                            <Form.Label className="fw-semibold">
                              Change Avatar
                            </Form.Label>
                            <div
                              className="position-relative p-4 text-center rounded-4 mb-3"
                              style={{
                                border: "2px dashed #dee2e6",
                                background: "#f8f9fa",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                document.getElementById("fileInput").click()
                              }
                            >
                              <div className="py-3">
                                <FaUpload
                                  size={24}
                                  className="mb-3 text-primary"
                                />
                                <h5 className="fw-semibold">
                                  Click to upload your image
                                </h5>
                                <p className="text-muted small mb-0">
                                  Supported formats: JPG, PNG (Maximum 10MB)
                                </p>
                              </div>
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
                    )}
                  </Form>
                </div>
              </Col>
            </Row>

            {/* Additional info cards could go here */}
            <Row className="mt-4">
              <Col md={12}>
                <div className="bg-white p-4 rounded-4 shadow-sm h-100">
                  <h5 className="mb-3 fw-bold">Saved Addresses</h5>
                  <p className="text-muted small">No saved addresses found.</p>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="rounded-pill px-4 mt-2"
                  >
                    Add New Address
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
