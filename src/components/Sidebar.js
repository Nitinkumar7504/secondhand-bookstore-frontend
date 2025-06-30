// src/components/Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#4e342e',
    display: 'block',
    padding: '10px 0',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  };

  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    left: isOpen ? 0 : '-240px',
    width: '220px',
    height: '100vh',
    backgroundColor: '#fff8e1',
    boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
    padding: '1.2rem',
    transition: 'left 0.3s ease',
    zIndex: 999,
    fontFamily: 'Segoe UI, sans-serif',
  };

  const closeStyle = {
    textAlign: 'right',
    cursor: 'pointer',
    marginBottom: '1rem',
    fontSize: 22,
    color: '#d84315',
  };

  return (
    <div style={sidebarStyle}>
      <div onClick={closeSidebar} style={closeStyle}>✖</div>

      <h3 style={{ color: '#6d4c41', marginBottom: '1rem' }}>📚 Menu</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li><Link to="/dashboard" onClick={closeSidebar} style={linkStyle}>🏠 Home</Link></li>
        <li><Link to="/books" onClick={closeSidebar} style={linkStyle}>📖 Books</Link></li>
        <li><Link to="/upload" onClick={closeSidebar} style={linkStyle}>⬆️ Upload</Link></li>
        <li><Link to="/cart" onClick={closeSidebar} style={linkStyle}>🛒 Cart</Link></li>
        <li><Link to="/orders" onClick={closeSidebar} style={linkStyle}>📦 Orders</Link></li>
        <li><Link to="/profile" onClick={closeSidebar} style={linkStyle}>👤 Profile</Link></li>
        <li>
          <button
            onClick={handleLogout}
            style={{
              marginTop: '1.5rem',
              padding: '10px 12px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              fontWeight: '600',
            }}
          >
            🔓 Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
