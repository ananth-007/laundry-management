import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Nav,
  Image,
  Alert,
} from "react-bootstrap";
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
  FaMapMarkerAlt,
} from "react-icons/fa";
import LaundryBanner from "../assets/ProfileImg/laundry-banner.png";
import logo from "../assets/logo.png";
import profileImg from "../assets/ProfileImg/profile-img.jpg";
import axios from "axios";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    avatarUrl: profileImg,
    username: "",
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  const API_BASE_URL = "http://localhost:8080";

  // Fetch user profile when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        console.log("Token being sent:", token); // Log the token

        const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure correct Bearer format
          },
        });

        console.log("Response status:", response.status); // Log response status

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response:", errorText);
          throw new Error(errorText || "Failed to fetch profile");
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (err) {
        console.error("Detailed error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check if file exists and validate file type
    if (!file) return;

    // Check file type
    if (!file.type.match("image/jpeg") && !file.type.match("image/png")) {
      setError("Please upload a JPG or PNG file");
      return;
    }

    // Check file size (10MB = 10 * 1024 * 1024 bytes)
    if (file.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit");
      return;
    }

    // Create a preview URL for the image
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
      // Don't update the state with the full base64 data
      // Just store the file itself for later upload
      setSelectedFile(file);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token missing. Please log in again.");
        return;
      }

      let avatarUrl = userInfo.avatarUrl;

      // Only upload if there's a new file
      if (selectedFile) {
        try {
          const formData = new FormData();
          formData.append("avatar", selectedFile);

          const uploadResponse = await axios.post(
            `${API_BASE_URL}/api/users/upload-avatar`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Get the URL from the server's response
          avatarUrl = uploadResponse.data.avatarUrl;
        } catch (uploadErr) {
          console.error("Error uploading avatar:", uploadErr);
          throw new Error("Failed to upload avatar. Please try again.");
        }
      }

      // Update user profile
      const response = await axios.patch(
        `${API_BASE_URL}/api/users/profile`,
        {
          fullName: userInfo.fullName,
          email: userInfo.email,
          phone: userInfo.phone,
          address: userInfo.address,
          avatarUrl: avatarUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update userInfo with the response data
      setUserInfo({
        ...userInfo,
        ...response.data,
        avatarUrl: response.data.avatarUrl || userInfo.avatarUrl,
      });

      setIsEditing(false);
      setSuccess("Profile updated successfully!");
      setPreviewUrl(null);
      setSelectedFile(null); // Clear the selected file
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
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
                  src={previewUrl || userInfo.avatarUrl}
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
            {loading && <Alert variant="info">Loading profile data...</Alert>}

            {error && (
              <Alert
                variant="danger"
                onClose={() => setError(null)}
                dismissible
              >
                {error}
              </Alert>
            )}

            {success && (
              <Alert
                variant="success"
                onClose={() => setSuccess(null)}
                dismissible
              >
                {success}
              </Alert>
            )}

            <Row className="mt-5">
              <Col
                xs={12}
                className="d-flex justify-content-between align-items-center mb-4"
              >
                <div>
                  <h2 className="fw-bold">{userInfo.fullName}</h2>
                  <p className="text-muted mb-0">{userInfo.email}</p>
                </div>
                {isEditing ? (
                  <Button
                    variant="primary"
                    className="d-flex align-items-center rounded-pill px-4"
                    onClick={handleSaveChanges}
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
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
                              value={userInfo.fullName}
                              onChange={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  fullName: e.target.value,
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
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-semibold">
                            Address
                          </Form.Label>
                          <div
                            className="input-group"
                            style={{
                              overflow: "hidden",
                            }}
                          >
                            <span className="input-group-text bg-light border-end-0">
                              <FaMapMarkerAlt className="text-primary" />
                            </span>
                            <Form.Control
                              as="textarea"
                              rows={1}
                              placeholder="Enter your address"
                              value={userInfo.address}
                              onChange={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  address: e.target.value,
                                })
                              }
                              readOnly={!isEditing}
                              className="border-start-0 py-2"
                              style={{
                                backgroundColor: isEditing
                                  ? "white"
                                  : "#f8f9fa",
                                resize: "none",
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
                            Username
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
                              placeholder="Enter your username"
                              value={userInfo.username}
                              onChange={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  username: e.target.value,
                                })
                              }
                              readOnly={!isEditing}
                              className="border-start-0 py-2"
                              style={{
                                backgroundColor: isEditing
                                  ? "white"
                                  : "#f8f9fa",
                                resize: "none",
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
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
