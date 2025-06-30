import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/styles/CustomerLogin.css';
import booksImage from './assets/books.png'; // only this image remains

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      navigate('/dashboard');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(`Login failed: ${err.response?.data?.error || 'Unknown error'}`);
    }
  };

  return (
    <div className="customer-login-container">
      <div className="login-header">
        <h1>SECOND-HAND <br />BOOK SALE</h1>
      </div>
      <form onSubmit={handleSubmit} className="customer-login-form">
        <h2>Customer Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="books-image">
        <img src={booksImage} alt="Books" />
      </div>
    </div>
  );
};

export default CustomerLogin;
