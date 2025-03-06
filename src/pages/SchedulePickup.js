import React, { useState, useMemo, useCallback } from "react";
import {
  Truck,
  Calendar,
  MapPin,
  DollarSign,
  ShoppingBag,
  X,
  ShirtIcon,
  ShoppingBagIcon,
  Baby,
  HomeIcon,
} from "lucide-react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Modal,
} from "react-bootstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SchedulePickup = () => {
  // Modified pricing structure to include different prices for each service type
  const clothingTypes = {
    men: [
      {
        name: "Shirt",
        prices: {
          "Wash & Fold": 4,
          "Wash & Iron": 6,
          "Steam Iron": 3,
          "Dry Cleaning": 8,
        },
      },
      {
        name: "Pants",
        prices: {
          "Wash & Fold": 5,
          "Wash & Iron": 7,
          "Steam Iron": 4,
          "Dry Cleaning": 10,
        },
      },
      {
        name: "T-Shirt",
        prices: {
          "Wash & Fold": 3,
          "Wash & Iron": 5,
          "Steam Iron": 2,
          "Dry Cleaning": 7,
        },
      },
      {
        name: "Suit",
        prices: {
          "Wash & Fold": 8,
          "Wash & Iron": 12,
          "Steam Iron": 7,
          "Dry Cleaning": 15,
        },
      },
      {
        name: "Shorts",
        prices: {
          "Wash & Fold": 3,
          "Wash & Iron": 5,
          "Steam Iron": 2,
          "Dry Cleaning": 6,
        },
      },
    ],
    women: [
      {
        name: "Blouse",
        prices: {
          "Wash & Fold": 4,
          "Wash & Iron": 6,
          "Steam Iron": 3,
          "Dry Cleaning": 8,
        },
      },
      {
        name: "Dress",
        prices: {
          "Wash & Fold": 7,
          "Wash & Iron": 9,
          "Steam Iron": 5,
          "Dry Cleaning": 12,
        },
      },
      {
        name: "Skirt",
        prices: {
          "Wash & Fold": 5,
          "Wash & Iron": 7,
          "Steam Iron": 4,
          "Dry Cleaning": 9,
        },
      },
      {
        name: "Jacket",
        prices: {
          "Wash & Fold": 6,
          "Wash & Iron": 8,
          "Steam Iron": 5,
          "Dry Cleaning": 11,
        },
      },
      {
        name: "Leggings",
        prices: {
          "Wash & Fold": 3,
          "Wash & Iron": 5,
          "Steam Iron": 2,
          "Dry Cleaning": 7,
        },
      },
    ],
    kids: [
      {
        name: "Kids Shirt",
        prices: {
          "Wash & Fold": 2,
          "Wash & Iron": 4,
          "Steam Iron": 2,
          "Dry Cleaning": 5,
        },
      },
      {
        name: "Kids Pants",
        prices: {
          "Wash & Fold": 3,
          "Wash & Iron": 5,
          "Steam Iron": 2,
          "Dry Cleaning": 6,
        },
      },
      {
        name: "Romper",
        prices: {
          "Wash & Fold": 3,
          "Wash & Iron": 5,
          "Steam Iron": 2,
          "Dry Cleaning": 6,
        },
      },
      {
        name: "Kids Jacket",
        prices: {
          "Wash & Fold": 4,
          "Wash & Iron": 6,
          "Steam Iron": 3,
          "Dry Cleaning": 7,
        },
      },
      {
        name: "Kids Dress",
        prices: {
          "Wash & Fold": 4,
          "Wash & Iron": 6,
          "Steam Iron": 3,
          "Dry Cleaning": 8,
        },
      },
    ],
    household: [
      {
        name: "Towel",
        prices: {
          "Wash & Fold": 3,
          "Wash & Iron": 4,
          "Steam Iron": 2,
          "Dry Cleaning": 5,
        },
      },
      {
        name: "Bedsheet",
        prices: {
          "Wash & Fold": 5,
          "Wash & Iron": 7,
          "Steam Iron": 4,
          "Dry Cleaning": 9,
        },
      },
      {
        name: "Blanket",
        prices: {
          "Wash & Fold": 7,
          "Wash & Iron": 10,
          "Steam Iron": 6,
          "Dry Cleaning": 12,
        },
      },
      {
        name: "Curtain",
        prices: {
          "Wash & Fold": 4,
          "Wash & Iron": 6,
          "Steam Iron": 3,
          "Dry Cleaning": 8,
        },
      },
      {
        name: "Pillow Cover",
        prices: {
          "Wash & Fold": 2,
          "Wash & Iron": 4,
          "Steam Iron": 2,
          "Dry Cleaning": 5,
        },
      },
    ],
  };

  const [formData, setFormData] = useState({
    store: "",
    serviceType: "",
    clothingItems: {
      men: {},
      women: {},
      kids: {},
      household: {},
    },
    pickupAddress: "",
    pickupDate: "",
    pickupTime: "",
    deliveryAddress: "",
    deliveryDate: "",
    deliveryTime: "",
  });

  const [clothingItem, setClothingItem] = useState("");
  const [errors, setErrors] = useState({});
  const [showPriceModal, setShowPriceModal] = useState(false);

  // Memoized store and service options
  const storeOptions = useMemo(
    () => [
      {
        value: "Store Malleshwaram",
        label: "Bachelor's Dhobi Laundry Store, Malleshwaram",
      },
      {
        value: "Store Bellandur",
        label: "Bachelor's Dhobi Laundry Store, Bellandur",
      },
      {
        value: "Store RR Nagar",
        label: "Bachelor's Dhobi Laundry Store, RR Nagar",
      },
      {
        value: "Store K R Puram",
        label: "Bachelor's Dhobi Laundry Store, K R Puram",
      },
      {
        value: "Store Thanisandra Main Road",
        label: "Bachelor's Dhobi Laundry Store, Thanisandra Main Road",
      },
      {
        value: "Store Yelahanka",
        label: "Bachelor's Dhobi Laundry Store, Yelahanka",
      },
      {
        value: "Store Sahakara Nagar",
        label: "Bachelor's Dhobi Laundry Store, Sahakara Nagar",
      },
      {
        value: "Store Marathalli",
        label: "Bachelor's Dhobi Laundry Store, Marathalli",
      },
      { value: "Store Hoodi", label: "Bachelor's Dhobi Laundry Store, Hoodi" },
    ],
    []
  );

  const serviceOptions = useMemo(
    () => [
      { value: "Wash & Fold", label: "Wash & Fold" },
      { value: "Wash & Iron", label: "Wash & Iron" },
      { value: "Steam Iron", label: "Steam Iron" },
      { value: "Dry Cleaning", label: "Dry Cleaning" },
    ],
    []
  );

  const timeSlots = useMemo(
    () => [
      { value: "9 AM - 12 PM", label: "Morning (9 AM - 12 PM)" },
      { value: "12 PM - 3 PM", label: "Afternoon (12 PM - 3 PM)" },
      { value: "3 PM - 6 PM", label: "Evening (3 PM - 6 PM)" },
      { value: "6 PM - 9 PM", label: "Night (6 PM - 9 PM)" },
    ],
    []
  );

  // Get current price for an item based on selected service
  const getCurrentPrice = useCallback(
    (section, itemName) => {
      const item = clothingTypes[section].find(
        (item) => item.name === itemName
      );
      if (!item || !formData.serviceType) return 0;
      return item.prices[formData.serviceType] || 0;
    },
    [formData.serviceType]
  );

  // Add clothing item to list
  const addClothingItem = useCallback(() => {
    if (clothingItem && !formData.clothingItems.includes(clothingItem)) {
      setFormData((prev) => ({
        ...prev,
        clothingItems: [...prev.clothingItems, clothingItem],
      }));
      setClothingItem("");
    }
  }, [clothingItem, formData.clothingItems]);

  // Remove clothing item
  const removeClothingItem = useCallback((item) => {
    setFormData((prev) => ({
      ...prev,
      clothingItems: prev.clothingItems.filter((i) => i !== item),
    }));
  }, []);

  // Update clothing item count
  const updateClothingCount = useCallback((section, itemName, count) => {
    setFormData((prev) => ({
      ...prev,
      clothingItems: {
        ...prev.clothingItems,
        [section]: {
          ...prev.clothingItems[section],
          [itemName]: count > 0 ? count : undefined,
        },
      },
    }));
  }, []);

  // Calculate total price
  const calculateTotalPrice = useMemo(() => {
    // No base service price since it's included in individual items

    // Calculate price for each section
    const sectionPrices = Object.entries(formData.clothingItems).reduce(
      (total, [section, items]) => {
        const sectionTotal = Object.entries(items).reduce(
          (sectionSum, [itemName, count]) => {
            const itemPrice = getCurrentPrice(section, itemName);
            return sectionSum + itemPrice * count;
          },
          0
        );
        return total + sectionTotal;
      },
      0
    );

    return sectionPrices;
  }, [formData.serviceType, formData.clothingItems, getCurrentPrice]);

  // Render clothing type inputs for a section
  const renderClothingSection = (section, icon) => {
    const Icon = icon;
    return (
      <Card className="mb-3">
        <Card.Header className="d-flex align-items-center">
          <Icon className="me-2" />
          <strong>
            {section.charAt(0).toUpperCase() + section.slice(1)} Clothing
          </strong>
        </Card.Header>
        <Card.Body>
          <Row>
            {clothingTypes[section].map((item) => (
              <Col key={item.name} md={4} className="mb-2">
                <div className="d-flex align-items-center">
                  <Form.Label className="me-2 mb-0 flex-grow-1">
                    {item.name}{" "}
                    {formData.serviceType && (
                      <span>(${getCurrentPrice(section, item.name)})</span>
                    )}
                  </Form.Label>
                  <div className="input-group" style={{ width: "120px" }}>
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        const currentCount =
                          formData.clothingItems[section][item.name] || 0;
                        updateClothingCount(
                          section,
                          item.name,
                          Math.max(0, currentCount - 1)
                        );
                      }}
                    >
                      -
                    </Button>
                    <Form.Control
                      type="number"
                      value={formData.clothingItems[section][item.name] || 0}
                      onChange={(e) => {
                        const count = parseInt(e.target.value) || 0;
                        updateClothingCount(section, item.name, count);
                      }}
                      min="0"
                      className="text-center"
                      style={{ maxWidth: "50px" }}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        const currentCount =
                          formData.clothingItems[section][item.name] || 0;
                        updateClothingCount(
                          section,
                          item.name,
                          currentCount + 1
                        );
                      }}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    );
  };

  // Helper function to compare dates
  const isSameDay = useCallback((date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }, []);

  // Updated validation function
  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.store) newErrors.store = "Please select a store";
    if (!formData.serviceType)
      newErrors.serviceType = "Please select a service type";
    if (!formData.pickupAddress)
      newErrors.pickupAddress = "Pickup address is required";
    if (!formData.pickupDate) newErrors.pickupDate = "Pickup date is required";
    if (!formData.pickupTime) newErrors.pickupTime = "Pickup time is required";
    if (!formData.deliveryAddress)
      newErrors.deliveryAddress = "Delivery address is required";
    if (!formData.deliveryDate)
      newErrors.deliveryDate = "Delivery date is required";
    if (!formData.deliveryTime)
      newErrors.deliveryTime = "Delivery time is required";

    // Check if we have all required date and time fields before validation
    if (
      formData.pickupDate &&
      formData.deliveryDate &&
      formData.pickupTime &&
      formData.deliveryTime
    ) {
      // Convert dates to comparable format
      const pickupDate = new Date(formData.pickupDate);
      const deliveryDate = new Date(formData.deliveryDate);

      // Check if delivery date is before pickup date
      if (deliveryDate < pickupDate) {
        newErrors.deliveryDate = "Delivery date must be after pickup date";
      }

      // If it's the same day, also check the time slots
      if (isSameDay(pickupDate, deliveryDate)) {
        // Define time slots in order for comparison
        const timeSlotOrder = [
          "9 AM - 12 PM",
          "12 PM - 3 PM",
          "3 PM - 6 PM",
          "6 PM - 9 PM",
        ];

        const pickupIndex = timeSlotOrder.indexOf(formData.pickupTime);
        const deliveryIndex = timeSlotOrder.indexOf(formData.deliveryTime);

        // Check that pickup and delivery times aren't the same on the same day
        if (pickupIndex === deliveryIndex) {
          newErrors.deliveryTime =
            "Pickup and delivery times cannot be the same on the same day";
        }

        // Check that delivery time is after pickup time on the same day
        if (pickupIndex >= deliveryIndex) {
          newErrors.deliveryTime =
            "Delivery time must be after pickup time when scheduled for the same day";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, isSameDay]);

  // Handle form input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(() => {
    if (validateForm()) {
      // Simulate payment redirection or API call
      alert(`Total Price: $${calculateTotalPrice}\nProceeding to Payment...`);
    }
  }, [validateForm, calculateTotalPrice]);

  return (
    <div>
      <Navbar />

      <Container className="mt-4 mb-4">
        <Card className="shadow">
          <Card.Header className="bg-info-subtle text-dark text-center">
            <h3 className="mb-0 d-flex justify-content-center align-items-center">
              <Truck className="me-3" /> Schedule Your Laundry Pickup
            </h3>
          </Card.Header>
          <Card.Body>
            {/* Store and Service Selection */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Select Store</Form.Label>
                  <Form.Select
                    name="store"
                    onChange={handleChange}
                    isInvalid={!!errors.store}
                  >
                    <option>Choose a Store</option>
                    {storeOptions.map((store) => (
                      <option key={store.value} value={store.value}>
                        {store.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.store}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Service Type</Form.Label>
                  <Form.Select
                    name="serviceType"
                    onChange={handleChange}
                    isInvalid={!!errors.serviceType}
                  >
                    <option>Choose Service</option>
                    {serviceOptions.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.serviceType}
                  </Form.Control.Feedback>
                  {!formData.serviceType && (
                    <Form.Text className="text-muted">
                      Please select a service type to see pricing
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
            </Row>

            {/* Clothing Sections */}
            {renderClothingSection("men", ShirtIcon)}
            {renderClothingSection("women", ShoppingBagIcon)}
            {renderClothingSection("kids", Baby)}
            {renderClothingSection("household", HomeIcon)}

            {/* Pickup Details */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Pickup Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="pickupAddress"
                    onChange={handleChange}
                    placeholder="Enter pickup address"
                    isInvalid={!!errors.pickupAddress}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pickupAddress}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Pickup Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="pickupDate"
                    onChange={handleChange}
                    isInvalid={!!errors.pickupDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pickupDate}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Pickup Time</Form.Label>
                  <Form.Select
                    name="pickupTime"
                    onChange={handleChange}
                    isInvalid={!!errors.pickupTime}
                  >
                    <option>Select Time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.pickupTime}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Delivery Details */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Delivery Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="deliveryAddress"
                    onChange={handleChange}
                    placeholder="Enter delivery address"
                    isInvalid={!!errors.deliveryAddress}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.deliveryAddress}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Delivery Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="deliveryDate"
                    onChange={handleChange}
                    isInvalid={!!errors.deliveryDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.deliveryDate}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Delivery Time</Form.Label>
                  <Form.Select
                    name="deliveryTime"
                    onChange={handleChange}
                    isInvalid={!!errors.deliveryTime}
                  >
                    <option>Select Time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.deliveryTime}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            {/* Price Estimation */}
            <div className="text-center mt-5">
              <Button
                variant="outline-primary"
                onClick={() => setShowPriceModal(true)}
                disabled={!formData.serviceType}
              >
                <DollarSign className="me-2" />
                Estimated Total: ${calculateTotalPrice.toFixed(2)}
              </Button>
            </div>

            {/* Submit Button */}
            <div className="text-center mt-4">
              <Button
                size="lg"
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#003242",
                }}
              >
                Schedule Pickup
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* Price Breakdown Modal */}
        <Modal show={showPriceModal} onHide={() => setShowPriceModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Price Breakdown</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Service Type: {formData.serviceType}</h5>

            {Object.entries(formData.clothingItems).map(([section, items]) => {
              const sectionItems = Object.entries(items).filter(
                ([_, count]) => count > 0
              );

              if (sectionItems.length === 0) return null;

              return (
                <div key={section} className="mb-3">
                  <h6>
                    {section.charAt(0).toUpperCase() + section.slice(1)} Items:
                  </h6>
                  {sectionItems.map(([itemName, count]) => {
                    const itemPrice = getCurrentPrice(section, itemName);
                    return (
                      <p key={itemName} className="mb-1">
                        {itemName}: {count} x ${itemPrice} = $
                        {(count * itemPrice).toFixed(2)}
                      </p>
                    );
                  })}
                </div>
              );
            })}

            <h4 className="mt-3 text-right">
              Total: ${calculateTotalPrice.toFixed(2)}
            </h4>
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
      </Container>

      <Footer />
    </div>
  );
};

export default SchedulePickup;
