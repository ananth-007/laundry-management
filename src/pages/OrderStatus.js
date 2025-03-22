import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Spinner,
  Alert,
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
import axios from "axios"; // Make sure axios is imported

const OrderStatus = () => {
  // URL parameters - get orderId if passed
  const { orderId } = useParams();

  // State for orders and current order
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Real-time tracking state
  const [activeStatus, setActiveStatus] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState({});
  const [showPriceModal, setShowPriceModal] = useState(false);

  const navigate = useNavigate();

  // Fetch orders from database
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        // Get user token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Not authenticated");
        }

        // API call to fetch user's orders
        const response = await axios.get("/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.orders) {
          setOrders(response.data.orders);

          // If orderId is provided in URL params, find that specific order
          if (orderId) {
            const order = response.data.orders.find(
              (o) => o._id === orderId || o.orderId === orderId
            );
            if (order) {
              setCurrentOrder(order);
            } else {
              // If order not found, use the most recent active order
              const activeOrders = response.data.orders.filter(
                (o) => o.status !== "Delivered" && o.status !== "Cancelled"
              );
              if (activeOrders.length > 0) {
                setCurrentOrder(activeOrders[0]);
              } else if (response.data.orders.length > 0) {
                // Fallback to most recent order
                setCurrentOrder(response.data.orders[0]);
              }
            }
          } else if (response.data.orders.length > 0) {
            // Default to most recent order if no orderId specified
            const activeOrders = response.data.orders.filter(
              (o) => o.status !== "Delivered" && o.status !== "Cancelled"
            );
            if (activeOrders.length > 0) {
              setCurrentOrder(activeOrders[0]);
            } else {
              setCurrentOrder(response.data.orders[0]);
            }
          }
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.message || "Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [orderId]);

  // Update tracking info based on current order
  useEffect(() => {
    if (currentOrder) {
      // Map order status to activeStatus index
      const statusMapping = {
        "Order Placed": 0,
        "Order Pickup": 1,
        "In Process": 2,
        "Out for Delivery": 3,
        Delivered: 4,
      };

      // Set active status based on current order status
      const status = currentOrder.status || "Order Placed";
      setActiveStatus(statusMapping[status] || 0);

      // Calculate progress percentage based on status
      const progressMapping = {
        "Order Placed": 10,
        "Order Pickup": 30,
        "In Process": 55,
        "Out for Delivery": 80,
        Delivered: 100,
      };
      setProgress(progressMapping[status] || 10);

      // Parse deliveryDate to set estimated delivery time
      if (currentOrder.deliveryDate) {
        const deliveryDate = new Date(currentOrder.deliveryDate);
        setEstimatedDeliveryTime(deliveryDate);
      }
    }
  }, [currentOrder]);

  // Set up time tracking
  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearInterval(timer);
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
        } else {
          setRemainingTime({ hours: 0, minutes: 0 });
        }
      };

      updateRemainingTime();
      const interval = setInterval(updateRemainingTime, 60000);
      return () => clearInterval(interval);
    }
  }, [estimatedDeliveryTime, currentTime]);

  // Create status steps based on current order
  const getStatusSteps = () => {
    if (!currentOrder) return [];

    const orderDate = new Date(
      currentOrder.createdAt || currentOrder.orderedDate
    );
    const deliveryDate = new Date(currentOrder.deliveryDate);

    // Format dates for display
    const formatDate = (date) => {
      return date
        .toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
        })
        .replace(",", "");
    };

    // Format times for display
    const formatTime = (date) => {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };

    // Calculate intermediate times
    const pickupTime = new Date(currentOrder.pickupTime || orderDate);
    pickupTime.setHours(pickupTime.getHours() + 4);

    const processTime = new Date(pickupTime);
    processTime.setHours(processTime.getHours() + 3);

    const outForDeliveryTime = new Date(deliveryDate);
    outForDeliveryTime.setHours(outForDeliveryTime.getHours() - 2);

    // Check if status is active or completed
    const isCompleted = (stepIndex) => stepIndex < activeStatus;
    const isActive = (stepIndex) => stepIndex === activeStatus;

    return [
      {
        id: 1,
        name: "Order Placed",
        icon: Orderplaced,
        time: `${formatDate(orderDate)}, ${formatTime(orderDate)}`,
        desc: "Order received",
        completed: isCompleted(0),
        active: isActive(0),
      },
      {
        id: 2,
        name: "Order Pickup",
        icon: pickup1,
        time: `${formatDate(pickupTime)}, ${formatTime(pickupTime)}`,
        desc: "Items collected",
        completed: isCompleted(1),
        active: isActive(1),
      },
      {
        id: 3,
        name: "In Process",
        icon: inprogress,
        time: `${formatDate(processTime)}, ${formatTime(processTime)}`,
        desc: "Cleaning in progress",
        completed: isCompleted(2),
        active: isActive(2),
      },
      {
        id: 4,
        name: "Out for Delivery",
        icon: outfordelivery,
        time: `${formatDate(outForDeliveryTime)}, ${formatTime(
          outForDeliveryTime
        )}`,
        desc: "On the way",
        completed: isCompleted(3),
        active: isActive(3),
      },
      {
        id: 5,
        name: "Delivered",
        icon: delivered,
        time: `${formatDate(deliveryDate)}, ${formatTime(deliveryDate)}`,
        desc: "Completed",
        completed: isCompleted(4),
        active: isActive(4),
      },
    ];
  };

  // Generate status updates based on current order
  const getStatusUpdates = () => {
    if (!currentOrder) return [];

    const statusSteps = getStatusSteps();

    return statusSteps.map((step, index) => {
      let status = "pending";
      if (step.completed) status = "complete";
      if (step.active) status = "active";

      return {
        time: step.time.split(", ")[1], // Just the time portion
        message: getUpdateMessage(step.name),
        status: status,
      };
    });
  };

  // Get appropriate message for each status
  const getUpdateMessage = (status) => {
    switch (status) {
      case "Order Placed":
        return "Order placed successfully";
      case "Order Pickup":
        return "Pickup agent collected your clothes";
      case "In Process":
        return "Clothes are now being processed";
      case "Out for Delivery":
        return "Clothes are out for delivery";
      case "Delivered":
        return "Order has been delivered";
      default:
        return "Status updated";
    }
  };

  // Format time display
  const formatTimeDisplay = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Format date for display (e.g., "15-Mar-2025")
  const formatDateDisplay = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Price breakdown data
  const getPriceData = () => {
    if (!currentOrder || !currentOrder.items) {
      // Default price data
      return {
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
    }

    // Convert API items to price data format
    const clothingItems = {};
    const prices = {};

    currentOrder.items.forEach((item) => {
      // Create category if it doesn't exist
      if (!clothingItems[item.category]) {
        clothingItems[item.category] = {};
        prices[item.category] = {};
      }

      // Add item to category
      clothingItems[item.category][item.name] = item.quantity;
      prices[item.category][item.name] = item.pricePerItem;
    });

    return {
      serviceType: currentOrder.serviceType || "Dry Cleaning",
      clothingItems,
      prices,
    };
  };

  // Calculate prices
  const getCurrentPrice = (section, itemName) => {
    const priceData = getPriceData();
    return priceData.prices[section][itemName];
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (currentOrder && currentOrder.totalPrice) {
      return currentOrder.totalPrice;
    }

    const priceData = getPriceData();
    return Object.entries(priceData.clothingItems || {}).reduce(
      (total, [section, items]) => {
        return (
          total +
          Object.entries(items || {}).reduce(
            (sectionTotal, [itemName, count]) => {
              return sectionTotal + count * getCurrentPrice(section, itemName);
            },
            0
          )
        );
      },
      0
    );
  };

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    sessionStorage.clear();
    sessionStorage.removeItem("historyReplaced");

    // Clear history and force redirect
    window.history.go(-(window.history.length - 1));
    window.location.href = "/Login";
  };

  // Loading state
  if (loading) {
    return (
      <div className="d-flex min-vh-100 justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
        <span className="ms-2">Loading order details...</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="d-flex min-vh-100 justify-content-center align-items-center">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Orders</Alert.Heading>
          <p>{error}</p>
          <Button variant="primary" onClick={() => navigate("/HomePage")}>
            Back to Home
          </Button>
        </Alert>
      </div>
    );
  }

  // No orders state
  if (!currentOrder) {
    return (
      <div className="d-flex min-vh-100 justify-content-center align-items-center">
        <Alert variant="info">
          <Alert.Heading>No Active Orders</Alert.Heading>
          <p>You don't have any active orders right now.</p>
          <Button variant="primary" onClick={() => navigate("/Stores")}>
            Find a Store
          </Button>
        </Alert>
      </div>
    );
  }

  // Get status steps and updates based on current order
  const statusSteps = getStatusSteps();
  const updates = getStatusUpdates();

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
              <h5 className="mb-0 fw-bold">
                {currentOrder.orderId || `#${currentOrder._id.substring(0, 8)}`}
              </h5>
              <p className="mb-0 text-muted small">
                {currentOrder.items?.length || 0} Items
              </p>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <Badge
              bg={currentOrder.status === "In Process" ? "warning" : "primary"}
              text={currentOrder.status === "In Process" ? "dark" : "white"}
              className="me-2 p-2"
            >
              {currentOrder.status || "In Process"}
            </Badge>
            <div className="mx-3 text-center">
              <p className="mb-0 small text-muted">Estimated Delivery</p>
              <p className="mb-0 fw-bold">
                {formatDateDisplay(currentOrder.deliveryDate)}
              </p>
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
                        <div className="mt-2 text-primary small fw-bold d-flex align-items-center">
                          <span className="me-2">In progress</span>
                          <div
                            className="spinner-grow spinner-grow-sm text-primary"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Connecting line */}
                    {index < statusSteps.length - 1 && (
                      <div
                        className="position-absolute"
                        style={{
                          left: "25px",
                          top: `${index * 80 + 50}px`,
                          width: "2px",
                          height: "30px",
                          background: step.completed ? "#198754" : "#dee2e6",
                          zIndex: 1,
                        }}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* Right Column - Order Details & Notifications */}
          <Col lg={4}>
            {/* Order Details Card */}
            <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
              <h5 className="fw-bold mb-3">Order Details</h5>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <p className="mb-0 text-muted small">Customer</p>
                  <p className="mb-0 fw-bold">{currentOrder.customerName}</p>
                </div>
                <div>
                  <p className="mb-0 text-muted small">Service Type</p>
                  <p className="mb-0 fw-bold">{currentOrder.serviceType}</p>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <p className="mb-0 text-muted small">Ordered Date</p>
                  <p className="mb-0 fw-bold">
                    {formatDateDisplay(
                      currentOrder.createdAt || currentOrder.orderedDate
                    )}
                  </p>
                </div>
                <div>
                  <p className="mb-0 text-muted small">Delivery Date</p>
                  <p className="mb-0 fw-bold">
                    {formatDateDisplay(currentOrder.deliveryDate)}
                  </p>
                </div>
              </div>

              <div className="mb-3">
                <p className="mb-1 text-muted small">Delivery Address</p>
                <div className="d-flex align-items-start">
                  <FaMapMarkedAlt className="text-primary me-2 mt-1" />
                  <p className="mb-0 small">{currentOrder.address}</p>
                </div>
              </div>

              <div className="mb-3">
                <p className="mb-1 text-muted small">Store Contact</p>
                <div className="d-flex align-items-center">
                  <FaPhone className="text-primary me-2" />
                  <p className="mb-0">
                    {currentOrder.storePhone || "080-12345678"}
                  </p>
                </div>
              </div>

              {currentOrder.notes && (
                <div className="p-3 bg-light rounded-3 small">
                  <p className="mb-1 fw-bold">Note from Store:</p>
                  <p className="mb-0 text-muted">{currentOrder.notes}</p>
                </div>
              )}

              <div className="mt-3 d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-0 text-muted small">Total Price</p>
                  <p className="mb-0 fw-bold">
                    ₹{calculateTotalPrice().toFixed(2)}
                  </p>
                </div>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="rounded-pill"
                  onClick={() => setShowPriceModal(true)}
                >
                  <FaReceipt className="me-1" /> View Breakdown
                </Button>
              </div>
            </div>

            {/* Notification Updates */}
            <div className="bg-white rounded-4 shadow-sm p-4">
              <h5 className="fw-bold mb-3">Updates</h5>

              <div className="notification-timeline position-relative">
                {updates.map((update, index) => (
                  <div key={index} className="d-flex mb-3">
                    <div
                      className={`notification-dot rounded-circle d-flex justify-content-center align-items-center ${
                        update.status === "complete"
                          ? "bg-success"
                          : update.status === "active"
                          ? "bg-primary"
                          : "bg-light"
                      }`}
                      style={{
                        width: "30px",
                        height: "30px",
                        border:
                          update.status === "active"
                            ? "2px solid #0d6efd"
                            : "1px solid #dee2e6",
                        zIndex: 2,
                        position: "relative",
                      }}
                    >
                      {update.status === "complete" && (
                        <FaBell style={{ color: "white", fontSize: "12px" }} />
                      )}
                      {update.status === "active" && (
                        <>
                          <FaBell
                            style={{ color: "white", fontSize: "12px" }}
                          />
                          <div
                            className="position-absolute"
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              border: "2px solid #0d6efd",
                              opacity: 0.5,
                              animation: "pulse 2s infinite",
                            }}
                          ></div>
                        </>
                      )}
                    </div>

                    <div className="notification-content ms-3 flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <p
                          className={`mb-0 small ${
                            update.status === "active" ? "fw-bold" : ""
                          }`}
                        >
                          {update.message}
                        </p>
                        <span className="text-muted small">{update.time}</span>
                      </div>
                      {update.status === "active" && (
                        <span className="badge bg-primary text-white mt-1">
                          Now
                        </span>
                      )}
                    </div>

                    {/* Connecting line */}
                    {index < updates.length - 1 && (
                      <div
                        className="position-absolute"
                        style={{
                          left: "15px",
                          top: `${index * 60 + 25}px`,
                          width: "2px",
                          height: "40px",
                          background:
                            update.status === "complete"
                              ? "#198754"
                              : "#dee2e6",
                          zIndex: 1,
                        }}
                      ></div>
                    )}
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
        >
          <Modal.Header closeButton>
            <Modal.Title>Price Breakdown</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted small">
              Service Type: {getPriceData().serviceType}
            </p>

            {Object.entries(getPriceData().clothingItems || {}).map(
              ([section, items]) => (
                <div key={section} className="mb-3">
                  <h6 className="text-capitalize">{section}</h6>
                  <table className="table table-sm">
                    <thead className="table-light">
                      <tr>
                        <th>Item</th>
                        <th className="text-center">Qty</th>
                        <th className="text-end">Price</th>
                        <th className="text-end">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(items || {}).map(([itemName, count]) => (
                        <tr key={itemName}>
                          <td>{itemName}</td>
                          <td className="text-center">{count}</td>
                          <td className="text-end">
                            ₹{getCurrentPrice(section, itemName).toFixed(2)}
                          </td>
                          <td className="text-end">
                            ₹
                            {(
                              count * getCurrentPrice(section, itemName)
                            ).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            )}

            <div className="d-flex justify-content-between border-top pt-2 mt-2">
              <h6 className="fw-bold">Total</h6>
              <h6 className="fw-bold">₹{calculateTotalPrice().toFixed(2)}</h6>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowPriceModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </div>
  );
};

export default OrderStatus;
