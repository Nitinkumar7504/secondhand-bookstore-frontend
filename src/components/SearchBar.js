import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Hide sidebar toggle on welcome page
  if (location.pathname === '/' || location.pathname === '/welcome') {
    return null;
  }

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div style={{ display: 'flex' }}>
      {/* Toggle Button */}
      {!isOpen && (
        <div style={{ padding: '1rem', zIndex: 1100 }}>
          <div
            onClick={toggleSidebar}
            style={{
              cursor: 'pointer',
              fontSize: 24,
              userSelect: 'none'
            }}
          >
            ☰
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div style={{
        width: isOpen ? '220px' : '0',
        backgroundColor: '#f8f9fa',
        padding: isOpen ? '1rem' : '0',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        boxShadow: isOpen ? '2px 0 5px rgba(0,0,0,0.2)' : 'none',
        overflowX: 'hidden',
        transition: 'width 0.3s ease, padding 0.3s ease',
        zIndex: 1000
      }}>
        {isOpen && (
          <>
            <div style={{ textAlign: 'right' }}>
              <button
                onClick={toggleSidebar}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 22,
                  cursor: 'pointer'
                }}
              >
                ✖
              </button>
            </div>
            <h3>Menu</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li><Link to="/dashboard">Home</Link></li>
              <li><Link to="/booklist">Books</Link></li>
              <li><Link to="/upload">Upload</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/orders">Orders</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </ul>
          </>
        )}
      </div>

      {/* Shifted Content */}
      <div style={{ marginLeft: isOpen ? '220px' : '0', transition: 'margin-left 0.3s ease', flex: 1 }}>
        {/* Your main content goes here via <Outlet /> or direct rendering */}
      </div>
    </div>
  );
};

export default Sidebar;
