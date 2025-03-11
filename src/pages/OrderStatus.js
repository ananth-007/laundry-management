import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Image,
  Button,
  ProgressBar,
  Badge,
  Modal,
} from "react-bootstrap";
import {
  FaHome,
  FaStore,
  FaClipboardList,
  FaHistory,
  FaSignOutAlt,
  FaBell,
  FaPhone,
  FaMapMarkedAlt,
  FaClock,
  FaTruck,
  FaRegClock,
  FaReceipt,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import Orderplaced from "../assets/OrderStatusImg/Orderplaced.png";
import delivered from "../assets/OrderStatusImg/delivered.png";
import inprogress from "../assets/OrderStatusImg/inprogress.png";
import pickup1 from "../assets/OrderStatusImg/pickup1.png";
import outfordelivery from "../assets/OrderStatusImg/outfordelivery.png";

const OrderStatus = () => {
  // Real-time tracking state
  const [activeStatus, setActiveStatus] = useState(3);
  const [progress, setProgress] = useState(55);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState({});
  const [showPriceModal, setShowPriceModal] = useState(false);

  // Order details
  const orderDetails = {
    orderId: "#BD00123",
    items: "4Pc",
    customerName: "Ratan Tata",
    serviceType: "Dry Cleaning",
    orderedDate: "15-Mar-2025",
    deliveryDate: "16-Mar-2025",
    address:
      "Flat 201, BVR Lake Front, 1/2, Kanaka Nagar, Veerannapalya, Nagavara, Bengaluru, Karnataka 560045",
    storePhone: "080-12345678",
    notesFromStore:
      "Your white shirts require special treatment, will take extra care",
  };

  // Price breakdown data
  const priceData = {
    serviceType: "Dry Cleaning",
    clothingItems: {
      tops: {
        Shirt: 3,
        "T-Shirt": 1,
      },
      bottoms: {
        Trousers: 2,
      },
    },
    prices: {
      tops: {
        Shirt: 3.5,
        "T-Shirt": 2.75,
      },
      bottoms: {
        Trousers: 4.5,
      },
    },
  };

  // Calculate prices
  const getCurrentPrice = (section, itemName) => {
    return priceData.prices[section][itemName];
  };

  const calculateTotalPrice = Object.entries(priceData.clothingItems).reduce(
    (total, [section, items]) => {
      return (
        total +
        Object.entries(items).reduce((sectionTotal, [itemName, count]) => {
          return sectionTotal + count * getCurrentPrice(section, itemName);
        }, 0)
      );
    },
    0
  );

  // Notification updates
  const [updates, setUpdates] = useState([
    {
      time: "10:30 AM",
      message: "Order placed successfully",
      status: "complete",
    },
    {
      time: "02:15 PM",
      message: "Pickup agent collected your clothes",
      status: "complete",
    },
    {
      time: "05:00 PM",
      message: "Clothes are now being processed",
      status: "active",
    },
    {
      time: "08:30 AM",
      message: "Clothes will be out for delivery",
      status: "pending",
    },
    {
      time: "10:00 AM",
      message: "Expected delivery to your address",
      status: "pending",
    },
  ]);

  // Status steps info
  const statusSteps = [
    {
      id: 1,
      name: "Order Placed",
      icon: Orderplaced,
      time: "15 Mar, 10:30 AM",
      desc: "Order received",
      completed: true,
    },
    {
      id: 2,
      name: "Order Pickup",
      icon: pickup1,
      time: "15 Mar, 02:15 PM",
      desc: "Items collected",
      completed: true,
    },
    {
      id: 3,
      name: "In Process",
      icon: inprogress,
      time: "15 Mar, 05:00 PM",
      desc: "Cleaning in progress",
      completed: false,
      active: true,
    },
    {
      id: 4,
      name: "Out for Delivery",
      icon: outfordelivery,
      time: "16 Mar, 08:30 AM",
      desc: "On the way",
      completed: false,
    },
    {
      id: 5,
      name: "Delivered",
      icon: delivered,
      time: "16 Mar, 10:00 AM",
      desc: "Completed",
      completed: false,
    },
  ];

  // Set up time tracking
  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Set estimated delivery time (for demo purposes)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    setEstimatedDeliveryTime(tomorrow);

    // For demo - slowly increase progress
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev < 58) return prev + 0.2;
        return prev;
      });
    }, 10000);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, []);

  // Calculate remaining time
  useEffect(() => {
    if (estimatedDeliveryTime) {
      const updateRemainingTime = () => {
        const diff = estimatedDeliveryTime - new Date();
        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          setRemainingTime({ hours, minutes });
        }
      };

      updateRemainingTime();
      const interval = setInterval(updateRemainingTime, 60000);
      return () => clearInterval(interval);
    }
  }, [estimatedDeliveryTime, currentTime]);

  // Format time display
  const formatTimeDisplay = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="app-container d-flex">
      {/* Sidebar - Keeping original design */}
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
              href="/HistoryPage"
              className="p-3 d-flex align-items-center text-dark"
            >
              <FaHistory className="me-3" size={20} /> History
            </Nav.Link>
          </Nav>

          <div className="mt-auto p-3">
            <Button
              variant="dark"
              className="w-100 d-flex align-items-center justify-content-center rounded-4"
            >
              <FaSignOutAlt className="me-2" /> Logout
            </Button>
          </div>
        </div>
      </Col>

      {/* Main Content */}
      <Col xs={9} md={9} lg={10} className="px-4 py-4 bg-light">
        {/* Header with live time */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-bold" style={{ color: "#1a3a78" }}>
              Live Order Tracking
            </h1>
            <p className="text-muted mb-0">
              Follow your laundry's journey in real-time
            </p>
          </div>
          <div className="text-end">
            <div className="d-flex align-items-center">
              <FaRegClock className="me-2 text-primary" />
              <span className="fw-bold">{formatTimeDisplay(currentTime)}</span>
            </div>
            <p className="text-muted mb-0">Updated just now</p>
          </div>
        </div>

        {/* Order ID and Quick Info Bar */}
        <div className="bg-white rounded-4 shadow-sm p-3 mb-4 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Badge bg="primary" className="me-2 p-2 rounded-circle">
              <FaClipboardList />
            </Badge>
            <div>
              <h5 className="mb-0 fw-bold">{orderDetails.orderId}</h5>
              <p className="mb-0 text-muted small">
                {orderDetails.items} Items
              </p>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <Badge bg="warning" text="dark" className="me-2 p-2">
              In Process
            </Badge>
            <div className="mx-3 text-center">
              <p className="mb-0 small text-muted">Estimated Delivery</p>
              <p className="mb-0 fw-bold">{orderDetails.deliveryDate}</p>
            </div>
          </div>
        </div>

        <Row>
          {/* Left Column - Status Timeline */}
          <Col lg={8} className="mb-4">
            <div className="bg-white rounded-4 shadow-sm p-4">
              {/* Real-time progress */}
              <div className="mb-4 position-relative">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="mb-0 fw-bold">Overall Progress</h6>
                  <div className="d-flex align-items-center">
                    <FaClock className="text-primary me-1" size={14} />
                    <span className="text-primary fw-bold">
                      {remainingTime.hours}h {remainingTime.minutes}m remaining
                    </span>
                  </div>
                </div>
                <ProgressBar
                  now={progress}
                  variant="primary"
                  className="rounded-pill"
                  style={{ height: "10px" }}
                />
                <div className="d-flex justify-content-between mt-1">
                  <span className="small text-muted">Order Placed</span>
                  <span className="small text-muted">Delivery</span>
                </div>

                {/* Live update badge */}
                <div
                  className="position-absolute"
                  style={{
                    left: `${progress}%`,
                    top: "0",
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="d-flex flex-column align-items-center">
                    <Badge
                      pill
                      bg="primary"
                      className="px-2 py-1"
                      style={{
                        marginBottom: "-8px",
                        animation: "pulse 1.5s infinite",
                      }}
                    >
                      LIVE
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Status timeline */}
              <div className="status-timeline position-relative mt-5">
                {statusSteps.map((step, index) => (
                  <div key={step.id} className="d-flex mb-4">
                    {/* Status Icon */}
                    <div
                      className={`status-icon-container rounded-circle d-flex justify-content-center align-items-center ${
                        step.completed
                          ? "bg-success"
                          : step.active
                          ? "bg-primary"
                          : "bg-light"
                      }`}
                      style={{
                        width: "50px",
                        height: "50px",
                        border: step.active
                          ? "2px solid #0d6efd"
                          : "1px solid #dee2e6",
                        boxShadow: step.active
                          ? "0 0 10px rgba(13, 110, 253, 0.4)"
                          : "none",
                        zIndex: 2,
                        position: "relative",
                      }}
                    >
                      <img
                        src={step.icon}
                        alt={step.name}
                        style={{
                          width: "30px",
                          height: "30px",
                          filter:
                            step.completed || step.active
                              ? "brightness(10)"
                              : "none",
                        }}
                      />

                      {step.active && (
                        <div
                          className="position-absolute"
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            border: "2px solid #0d6efd",
                            opacity: 0.5,
                            animation: "pulse 2s infinite",
                          }}
                        ></div>
                      )}
                    </div>

                    {/* Status content */}
                    <div className="status-content ms-3 flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <h6
                          className={`fw-bold mb-0 ${
                            step.active ? "text-primary" : ""
                          }`}
                        >
                          {step.name}
                        </h6>
                        <span
                          className={`small ${
                            step.completed
                              ? "text-success"
                              : step.active
                              ? "text-primary"
                              : "text-muted"
                          }`}
                        >
                          {step.time}
                        </span>
                      </div>
                      <p className="mb-0 text-muted small">{step.desc}</p>

                      {step.active && (
                        <div
                          className="mt-2 p-2 rounded-3"
                          style={{ backgroundColor: "#f0f7ff" }}
                        >
                          <div className="d-flex align-items-center">
                            <div className="me-2">
                              <div
                                className="spinner-grow spinner-grow-sm text-primary"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            </div>
                            <p className="mb-0 small">
                              Your clothes are currently being processed with
                              special care
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Vertical timeline line */}
                <div
                  className="timeline-line position-absolute"
                  style={{
                    width: "2px",
                    backgroundColor: "#e9ecef",
                    height: "100%",
                    left: "24px",
                    top: "0",
                    zIndex: 1,
                  }}
                ></div>

                {/* Active timeline line */}
                <div
                  className="timeline-line position-absolute"
                  style={{
                    width: "2px",
                    backgroundColor: "#0d6efd",
                    height: `${(activeStatus / statusSteps.length) * 100}%`,
                    left: "24px",
                    top: "0",
                    zIndex: 1,
                    transition: "height 0.5s ease-in-out",
                  }}
                ></div>
              </div>
            </div>
          </Col>

          {/* Right Column - Order Details and Updates */}
          <Col lg={4}>
            {/* Order Details */}
            <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Order Details</h5>
                <Badge bg="success" className="rounded-pill">
                  {orderDetails.serviceType}
                </Badge>
              </div>

              <div className="customer-details">
                <div className="info-item mb-2 pb-2 border-bottom">
                  <p className="text-muted mb-1 small">Customer</p>
                  <p className="fw-bold mb-0">{orderDetails.customerName}</p>
                </div>

                <div className="info-item mb-2 pb-2 border-bottom">
                  <p className="text-muted mb-1 small">Order Date</p>
                  <p className="fw-bold mb-0">{orderDetails.orderedDate}</p>
                </div>

                <div className="info-item mb-2 pb-2 border-bottom">
                  <p className="text-muted mb-1 small">Delivery Address</p>
                  <p className="fw-bold mb-0 small">{orderDetails.address}</p>
                </div>

                <div className="info-item mb-2 pb-2 border-bottom">
                  <p className="text-muted mb-1 small">Store Notes</p>
                  <p className="fst-italic mb-0 small">
                    {orderDetails.notesFromStore}
                  </p>
                </div>

                {/* New Price Overview Section */}
                <div className="info-item mb-2 pb-2 border-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="text-muted mb-1 small">Price</p>
                    <Badge bg="info" className="rounded-pill">
                      ${calculateTotalPrice.toFixed(2)}
                    </Badge>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-0 small">
                      Items:{" "}
                      <span className="fw-bold">
                        {Object.values(priceData.clothingItems).reduce(
                          (total, items) =>
                            total +
                            Object.values(items).reduce(
                              (sum, count) => sum + count,
                              0
                            ),
                          0
                        )}{" "}
                        pcs
                      </span>
                    </p>
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 text-primary"
                      onClick={() => setShowPriceModal(true)}
                    >
                      <div className="d-flex align-items-center">
                        <FaReceipt className="me-1" size={12} />
                        <span>View breakdown</span>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Updates */}
            <div className="bg-white rounded-4 shadow-sm p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Live Updates</h5>
                <Badge pill bg="danger" className="d-flex align-items-center">
                  <FaBell className="me-1" /> 3 New
                </Badge>
              </div>

              <div className="updates-timeline">
                {updates.map((update, index) => (
                  <div
                    key={index}
                    className={`update-item d-flex mb-3 ${
                      update.status === "active" ? "active-update" : ""
                    }`}
                  >
                    <div
                      className={`update-indicator rounded-circle ${
                        update.status === "complete"
                          ? "bg-success"
                          : update.status === "active"
                          ? "bg-primary"
                          : "bg-light"
                      }`}
                      style={{
                        width: "12px",
                        height: "12px",
                        marginTop: "6px",
                        border:
                          update.status === "pending"
                            ? "1px solid #dee2e6"
                            : "none",
                      }}
                    ></div>
                    <div className="ms-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <p
                          className={`mb-0 small ${
                            update.status === "active"
                              ? "fw-bold text-primary"
                              : update.status === "complete"
                              ? "text-success"
                              : "text-muted"
                          }`}
                        >
                          {update.message}
                        </p>
                        <span className="text-muted smaller ms-2">
                          {update.time}
                        </span>
                      </div>

                      {update.status === "active" && (
                        <div className="live-indicator d-flex align-items-center mt-1">
                          <div
                            className="pulsing-dot me-1"
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              backgroundColor: "#0d6efd",
                              animation: "pulseDot 1.5s infinite",
                            }}
                          ></div>
                          <span className="text-primary smaller">Live now</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>

        {/* Price Breakdown Modal */}
        <Modal
          show={showPriceModal}
          onHide={() => setShowPriceModal(false)}
          centered
          className="price-breakdown-modal"
        >
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="text-primary fw-bold">
              <FaReceipt className="me-2" />
              Price Breakdown
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-0">
            <div
              className="p-2 rounded-4 mb-3"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="d-flex align-items-center mb-2">
                <div
                  className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-2"
                  style={{ width: "24px", height: "24px" }}
                >
                  <FaStore className="text-white" size={12} />
                </div>
                <p className="mb-0 fw-bold">
                  Service Type: {priceData.serviceType}
                </p>
              </div>

              <div className="ms-4">
                <p className="text-muted mb-1 small">
                  Order #{orderDetails.orderId} • {orderDetails.orderedDate}
                </p>
              </div>
            </div>

            <div className="price-items px-2">
              {Object.entries(priceData.clothingItems).map(
                ([section, items]) => {
                  const sectionItems = Object.entries(items).filter(
                    ([_, count]) => count > 0
                  );
                  if (sectionItems.length === 0) return null;

                  return (
                    <div key={section} className="mb-3">
                      <h6 className="text-uppercase small fw-bold text-secondary mb-2">
                        {section.charAt(0).toUpperCase() + section.slice(1)}{" "}
                        Items
                      </h6>

                      {sectionItems.map(([itemName, count], idx) => {
                        const itemPrice = getCurrentPrice(section, itemName);
                        return (
                          <div
                            key={`${section}-${itemName}`}
                            className={`d-flex justify-content-between py-2 ${
                              idx !== sectionItems.length - 1
                                ? "border-bottom"
                                : ""
                            }`}
                          >
                            <div>
                              <p className="mb-0">{itemName}</p>
                              <p className="text-muted mb-0 small">
                                {count} × ${itemPrice.toFixed(2)}
                              </p>
                            </div>
                            <p className="mb-0 fw-bold">
                              ${(count * itemPrice).toFixed(2)}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  );
                }
              )}

              <div className="d-flex justify-content-between mt-4 pt-2 border-top">
                <div>
                  <p className="mb-0 fw-bold">Total</p>
                  <p className="text-muted mb-0 small">Inc. of all taxes</p>
                </div>
                <p
                  className="mb-0 fw-bold text-primary"
                  style={{ fontSize: "1.2rem" }}
                >
                  ${calculateTotalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button
              variant="primary"
              className="w-100 rounded-pill"
              onClick={() => setShowPriceModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Add animation keyframes via style tag */}
        <style>
          {`
            @keyframes pulse {
              0% {
                transform: scale(1);
                opacity: 1;
              }
              50% {
                transform: scale(1.1);
                opacity: 0.7;
              }
              100% {
                transform: scale(1);
                opacity: 1;
              }
            }
            
            @keyframes pulseDot {
              0% {
                opacity: 0.4;
              }
              50% {
                opacity: 1;
              }
              100% {
                opacity: 0.4;
              }
            }
            
            .smaller {
              font-size: 0.7rem;
            }
            
            .price-breakdown-modal .modal-content {
              border-radius: 12px;
              border: none;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            }
          `}
        </style>
      </Col>
    </div>
  );
};

export default OrderStatus;
