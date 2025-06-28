import React, { useState } from "react";
import Modal from "./Modal";
import axios from "axios"; 
import { API_ENDPOINTS } from '../config/api';

function Checkout({ cart, setCart }) {
  const [address, setAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const getTotal = () => {
    return cart.reduce(
      (total, item) =>
        total + Math.ceil(item.persons / item.serves) * item.price,
      0
    );
  };

  const handleRemove = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleSubmit = async () => {
    if (!address) {
      setModalMessage("Please enter your address.");
      setShowModal(true);
      return;
    }

    if (cart.length === 0) {
      setModalMessage("Cart is empty.");
      setShowModal(true);
      return;
    }

    const orderTime = new Date();
    const deliveryTime = new Date(orderTime.getTime() + 5 * 60 * 60 * 1000);

    const orderData = {
      items: cart,
      total: getTotal(),
      address,
      orderTime: orderTime.toISOString(),
    };

    try {
      await axios.post(API_ENDPOINTS.ORDERS, orderData);  //sending to backend
    } catch (error) {
      console.error("Failed to save order:", error);
    }

    setModalMessage(
      `Order placed!\nTotal: Rs. ${getTotal()}\nDelivery in 5 hours by ${deliveryTime.toLocaleTimeString()}\nDelivery Address: ${address}`
    );
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - For {item.persons} person(s)
            <button className="remove-btn" onClick={() => handleRemove(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h3>Total: Rs. {getTotal()}</h3>
      <input
        type="text"
        placeholder="Delivery Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleSubmit}>Place Order</button>

      {showModal && <Modal message={modalMessage} onClose={handleCloseModal} />}
    </div>
  );
}

export default Checkout;
