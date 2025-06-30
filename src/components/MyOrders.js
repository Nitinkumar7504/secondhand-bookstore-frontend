import React from 'react';
import { Link } from 'react-router-dom';
import './styles/main.css';

const MyOrders = () => {
  // Sample orders - in a real app, this would come from an API
  const orders = [
    { id: 1, date: '2023-05-15', total: 34.97, status: 'Delivered', items: 3 },
    { id: 2, date: '2023-06-02', total: 12.99, status: 'Shipped', items: 1 }
  ];

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <div className="empty-orders">
          <p>You haven't placed any orders yet.</p>
          <Link to="/dashboard" className="btn btn-primary">Browse Books</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span>Order #{order.id}</span>
                <span>{order.date}</span>
              </div>
              <div className="order-details">
                <p>Items: {order.items}</p>
                <p>Total: ${order.total.toFixed(2)}</p>
                <p>Status: <span className={`status-${order.status.toLowerCase()}`}>{order.status}</span></p>
              </div>
              <button className="btn btn-outline">View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;