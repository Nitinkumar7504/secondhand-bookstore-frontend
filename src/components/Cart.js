import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/orders/cart', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCartItems(res.data || []);
      } catch (err) {
        console.error('Error fetching cart:', err);
        setCartItems([]); // fallback
      }
    };

    fetchCart();
  }, []);

  return (
    <div>
      <h2>🛒 Your Cart</h2>
      {cartItems && cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>{item.title} - ₹{item.price}</li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
