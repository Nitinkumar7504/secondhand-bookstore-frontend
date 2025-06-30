import React, { useState } from 'react';
import axios from 'axios';
import './styles/CustomerRegister.css'; // <-- Import your CSS

const CustomerRegister = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      alert('✅ Registration successful!');
      console.log(res.data);
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      const message = error.response?.data?.error || 'Unknown error occurred';
      alert(`Registration failed: ${message}`);
    }
  };

  return (
    <div className="customer-register-container">
      <form onSubmit={handleSubmit} className="customer-register-form">
        <h2>Register</h2>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default CustomerRegister;
