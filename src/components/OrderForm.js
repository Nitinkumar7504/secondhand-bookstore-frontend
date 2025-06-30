import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/OrderForm.css'; // Make sure this path is correct

const OrderForm = () => {
  const { bookId } = useParams();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/orders', {
        bookId,
        name,
        address,
        mobile
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      alert('✅ Order placed successfully!');
      navigate('/myorders');
    } catch (err) {
      alert('❌ Failed to place order');
    }
  };

  return (
    <div className="order-form-container">
      <h2 className="order-form-heading">📦 Place Your Order</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="order-form-input"
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className="order-form-input"
          placeholder="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
        />
        <input
          className="order-form-input"
          placeholder="Mobile Number"
          value={mobile}
          onChange={e => setMobile(e.target.value)}
          required
        />
        <button type="submit" className="order-form-button">Place Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
