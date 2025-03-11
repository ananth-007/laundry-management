import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Image,
  Button,
  Badge,
  Card,
  Form,
  InputGroup,
  Modal,
  Table,
} from "react-bootstrap";
import {
  FaHome,
  FaStore,
  FaClipboardList,
  FaHistory,
  FaSignOutAlt,
  FaSearch,
  FaReceipt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaTshirt,
  FaCheck,
  FaExternalLinkAlt,
} from "react-icons/fa";
import logo from "../assets/logo.png";

const HistoryPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showModal, setShowModal] = useState(false);

  // Sample data for the table (replace with dynamic data from your backend)
  const orderHistory = [
    {
      id: "#BD00123",
      items: "4Pc",
      serviceType: "Dry Cleaning",
      orderedDate: "15-Mar-2025",
      deliveredDate: "16-Mar-2025",
      transactionId: "TXN78901234",
      amountPaid: "₹450",
      address: "Flat 201, BVR Lake Front, Bengaluru",
      status: "Completed",
      itemDetails: [
        { name: "Suits", count: 2, price: "₹150" },
        { name: "Shirts", count: 2, price: "₹75" },
      ],
    },
    {
      id: "#BD00124",
      items: "2Pc",
      serviceType: "Washing",
      orderedDate: "14-Mar-2025",
      deliveredDate: "15-Mar-2025",
      transactionId: "TXN78901235",
      amountPaid: "₹250",
      address: "Flat 202, BVR Lake Front, Bengaluru",
      status: "Completed",
      itemDetails: [
        { name: "Jeans", count: 1, price: "₹120" },
        { name: "T-shirts", count: 1, price: "₹130" },
      ],
    },
    {
      id: "#BD00125",
      items: "5Pc",
      serviceType: "Steam Iron",
      orderedDate: "13-Mar-2025",
      deliveredDate: "14-Mar-2025",
      transactionId: "TXN78901236",
      amountPaid: "₹350",
      address: "Flat 101, BVR Lake Front, Bengaluru",
      status: "Completed",
      itemDetails: [
        { name: "Shirts", count: 3, price: "₹210" },
        { name: "Pants", count: 2, price: "₹140" },
      ],
    },
  ];

  // Filter orders based on search term and filter type
  const filteredOrders = orderHistory.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.transactionId.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === "all") return matchesSearch;
    return (
      matchesSearch &&
      order.serviceType.toLowerCase() === filterType.toLowerCase()
    );
  });

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to get appropriate badge variant based on status
  const getStatusVariant = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Pending":
        return "warning";
      case "Cancelled":
        return "danger";
      default:
        return "primary";
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar - kept unchanged as requested */}
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

      {/* Redesigned Main Content - Using only Bootstrap classes */}
      <Col xs={9} md={9} lg={10} className="p-4 bg-light">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold">Your Laundry Journey</h1>
          <div className="d-flex">
            <InputGroup className="me-3" style={{ width: "250px" }}>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            <Form.Select
              style={{ width: "180px" }}
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Services</option>
              <option value="dry cleaning">Dry Cleaning</option>
              <option value="washing">Washing</option>
              <option value="steam iron">Steam Iron</option>
            </Form.Select>
          </div>
        </div>

        {/* Order History Cards */}
        {filteredOrders.length > 0 ? (
          <Row>
            {filteredOrders.map((order, index) => (
              <Col md={6} lg={4} key={index} className="mb-4">
                <Card
                  className="h-100 shadow-sm"
                  onClick={() => handleOrderClick(order)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3 pb-2 border-bottom">
                      <div>
                        <h5 className="mb-1 fw-bold">{order.id}</h5>
                        <Badge bg={getStatusVariant(order.status)} pill>
                          {order.status}
                        </Badge>
                      </div>
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle"
                        style={{
                          backgroundColor: "#daf5ff",
                          width: "40px",
                          height: "40px",
                        }}
                      >
                        <FaTshirt className="text-primary" />
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex mb-2">
                        <FaCalendarAlt className="text-secondary me-2 mt-1" />
                        <div>
                          <small className="text-muted d-block">Ordered</small>
                          <span>{order.orderedDate}</span>
                        </div>
                      </div>

                      <div className="d-flex mb-2">
                        <FaCheck className="text-secondary me-2 mt-1" />
                        <div>
                          <small className="text-muted d-block">
                            Delivered
                          </small>
                          <span>{order.deliveredDate}</span>
                        </div>
                      </div>

                      <div className="d-flex">
                        <FaRupeeSign className="text-secondary me-2 mt-1" />
                        <div>
                          <small className="text-muted d-block">Amount</small>
                          <span>{order.amountPaid}</span>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center pt-2 mt-auto border-top">
                      <Badge bg="info" pill className="px-3 py-2">
                        {order.serviceType}
                      </Badge>
                      <Badge bg="light" text="dark" pill className="px-3 py-2">
                        {order.items}
                      </Badge>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="d-flex align-items-center"
                      >
                        Details <FaExternalLinkAlt size={12} className="ms-1" />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="text-center py-5">
            <h3>No orders found</h3>
            <p className="text-muted">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </Col>

      {/* Order Details Modal - Using Bootstrap Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details {selectedOrder?.id}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedOrder && (
            <div>
              <div className="mb-4">
                <h5 className="border-bottom pb-2 mb-3">Order Information</h5>
                <Row>
                  <Col md={3} className="mb-3">
                    <small className="text-muted d-block">Service Type</small>
                    <span>{selectedOrder.serviceType}</span>
                  </Col>
                  <Col md={3} className="mb-3">
                    <small className="text-muted d-block">Order Date</small>
                    <span>{selectedOrder.orderedDate}</span>
                  </Col>
                  <Col md={3} className="mb-3">
                    <small className="text-muted d-block">Delivery Date</small>
                    <span>{selectedOrder.deliveredDate}</span>
                  </Col>
                  <Col md={3} className="mb-3">
                    <small className="text-muted d-block">Status</small>
                    <Badge bg={getStatusVariant(selectedOrder.status)}>
                      {selectedOrder.status}
                    </Badge>
                  </Col>
                </Row>
              </div>

              <div className="mb-4">
                <h5 className="border-bottom pb-2 mb-3">Payment Information</h5>
                <Row>
                  <Col md={6} className="mb-3">
                    <small className="text-muted d-block">Transaction ID</small>
                    <span>{selectedOrder.transactionId}</span>
                  </Col>
                  <Col md={6} className="mb-3">
                    <small className="text-muted d-block">Amount Paid</small>
                    <span className="fw-bold">{selectedOrder.amountPaid}</span>
                  </Col>
                </Row>
              </div>

              <div className="mb-4">
                <h5 className="border-bottom pb-2 mb-3">Delivery Address</h5>
                <p className="d-flex align-items-center">
                  <FaMapMarkerAlt className="me-2 text-danger" />
                  {selectedOrder.address}
                </p>
              </div>

              <div>
                <h5 className="border-bottom pb-2 mb-3">Items</h5>
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.itemDetails.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.name}</td>
                        <td>{item.count}</td>
                        <td>{item.price}</td>
                      </tr>
                    ))}
                    <tr className="fw-bold">
                      <td colSpan="2">Total</td>
                      <td>{selectedOrder.amountPaid}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary">
            <FaReceipt className="me-2" /> Download Receipt
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HistoryPage;
