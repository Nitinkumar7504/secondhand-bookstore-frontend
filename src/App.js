// 📁 src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WelcomePage from './components/WelcomePage';
import BookList from './components/BookList';
import AdminLogin from './components/AdminLogin';
import CustomerLogin from './components/CustomerLogin';
import CustomerRegister from './components/CustomerRegister';
import Dashboard from './components/Dashboard';
import UploadBook from './components/UploadBook';
import AdminDashboard from './components/AdminDashboard';
import Cart from './components/Cart';
import Layout from './components/Layout';
import Orders from './components/Orders';
import Profile from './components/Profile';
import OrderForm from './components/OrderForm';
import MyOrders from './components/MyOrders'; 

function App() {
  return (
    <Router>
      <Routes>

        {/* Public routes (without sidebar) */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<CustomerRegister />} />
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} /> {/* ✅ moved outside */}

        {/* Protected customer routes (with sidebar layout) */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/upload" element={<UploadBook />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order/:bookId" element={<OrderForm />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
