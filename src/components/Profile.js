import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => setUser(res.data))
      .catch(err => {
        console.error('Failed to fetch profile:', err);
        alert('Error loading profile');
      });
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">👤 Your Profile</div>
      <p className="profile-info"><strong>Name:</strong> {user.name}</p>
      <p className="profile-info"><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default Profile;
