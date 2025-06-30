// src/components/Layout.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const hideSidebar = location.pathname === '/';

  // Automatically close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      {!hideSidebar && (
        <>
          <Sidebar isOpen={isOpen} closeSidebar={() => setIsOpen(false)} />

          <div
            style={{
              marginLeft: isOpen ? '200px' : '0',
              transition: 'margin-left 0.3s ease',
              minHeight: '100vh',
              backgroundColor: '#f5f5f5',
              padding: '1rem',
            }}
          >
            {/* ☰ Hamburger Icon */}
            <div
              onClick={toggleSidebar}
              style={{
                cursor: 'pointer',
                fontSize: 24,
                marginBottom: '1rem',
              }}
            >
              ☰
            </div>

            <Outlet />
          </div>
        </>
      )}

      {hideSidebar && <Outlet />}
    </>
  );
};

export default Layout;
