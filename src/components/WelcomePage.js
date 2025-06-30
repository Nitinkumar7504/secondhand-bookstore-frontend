import React from 'react';
import { Link } from 'react-router-dom';
import booksImage from './assets/books.png';
import bookshelfImage from './assets/bookshelf.png';

const WelcomePage = () => {
  return (
    <div style={styles.container}>
      {/* Left Section */}
      <div style={styles.leftSection}>
        <h2 style={styles.welcomeText}>Welcome to</h2>
        <h1 style={styles.heading}>SecondHand<br />BOOK STORE</h1>
        <p style={styles.subtitle}>Buy and sell<br />used books<br />with ease</p>
        <img src={booksImage} alt="Books Stack" style={styles.booksImage} />
      </div>

      {/* Center Section: Bookshelf and Buttons */}
      <div style={styles.centerSection}>
        <img src={bookshelfImage} alt="Bookshelf" style={styles.bookshelfImage} />
        <div style={styles.buttonSection}>
          <Link to="/login" style={styles.button}>Customer Login</Link>
          <Link to="/register" style={styles.button}>Register as Customer</Link>
          <Link to="/admin" style={styles.button}>Admin Login</Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#faeed3',
    fontFamily: 'Georgia, serif',
    height: '100vh',
    padding: '60px 80px',
    boxSizing: 'border-box',
  },

  // Left Section
  leftSection: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '20%',
    textAlign: 'left',
  },
  welcomeText: {
    fontSize: '2.2rem',
    color: '#333',
    marginBottom: '10px',
  },
  heading: {
    fontSize: '2rem', // Increased
    fontWeight: 'bold',
    color: '#1f1f1f',
    margin: '10px 0',
    lineHeight: '1.2',
  },
  subtitle: {
    fontSize: '2rem', // Increased
    color: '#444',
    lineHeight: '1.6',
    marginBottom: '25px',
  },
  booksImage: {
    width: '200px', // Increased size
    height: 'auto',
  },

  // Center Section
  centerSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '50px',
  },

  bookshelfImage: {
    width: '220px',
    height: 'auto',
  },

  buttonSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    alignItems: 'center',
  },

  button: {
    width: '320px',
    padding: '20px 30px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#fff',
    border: '2px solid #333',
    borderRadius: '14px',
    textDecoration: 'none',
    boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
    transition: '0.2s ease',
  },
};

export default WelcomePage;
