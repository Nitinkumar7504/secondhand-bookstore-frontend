import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${adminToken}` };

        const [usersRes, ordersRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/users', { headers }),
          axios.get('http://localhost:5000/api/admin/orders', { headers })
        ]);

        setUsers(usersRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || 'Failed to fetch admin data');
      }
    };

    if (adminToken) fetchData();
  }, [adminToken]);

  if (!adminToken) return <p>Access Denied. Please log in as admin.</p>;

  return (
   <div className="admin-dashboard">
      <h2>📋 Admin Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>👥 Registered Users</h3>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr><th>#</th><th>Name</th><th>Email</th></tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3 style={{ marginTop: '30px' }}>📦 Orders</h3>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Address</th>
              <th>Book</th>
              <th>Price</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.userId?.name}</td>
                <td>{order.userId?.email}</td>
                <td>{order.mobile}</td>
                <td>{order.address}</td>
                <td>{order.bookId?.title}</td>
                <td>₹{order.bookId?.price}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
