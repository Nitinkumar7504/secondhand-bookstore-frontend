import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/Orders.css'; 
const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => setOrders(res.data))
    .catch(err => console.error('Failed to fetch orders:', err));
  }, []);

  return (
    <div className="orders-container">
      <h2 className="orders-title">🛒 Your Orders</h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No orders yet.</p>
      ) : (
        <div className="orders-grid">
          {orders.map(order => (
            <div className="order-card" key={order._id}>
              <h3>{order.book?.title || 'Unknown Book'}</h3>
              <p><strong>Author:</strong> {order.book?.author || 'N/A'}</p>
              <p><strong>Price:</strong> ₹{order.book?.price || 0}</p>
              <p><strong>Delivery Name:</strong> {order.name}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Mobile:</strong> {order.mobile}</p>
              <p><strong>Ordered On:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;