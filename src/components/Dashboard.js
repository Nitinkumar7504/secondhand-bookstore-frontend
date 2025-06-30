import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/Dashboard.css'; 

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/books');
      setBooks(res.data);
    } catch (err) {
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBooks(books.filter((book) => book._id !== id));
      alert('Book deleted!');
    } catch (err) {
      console.error(err);
      alert('Failed to delete book. Maybe unauthorized.');
    }
  };

  const handleOrder = (bookId) => {
    navigate(`/order/${bookId}`);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">📚 All Uploaded Books</h2>

      <input
        type="text"
        className="dashboard-search"
        placeholder="Search by title or author..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <p>Loading books...</p>
      ) : filteredBooks.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div className="dashboard-grid">
          {filteredBooks.map((book) => (
            <div key={book._id} className="book-card">
              <img
                src={`http://localhost:5000${book.image}`}
                alt={book.title}
                className="book-image"
                onError={(e) => {
                  e.target.src = '/default.jpg';
                }}
              />
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">by {book.author}</p>
              <p className="book-description">{book.description}</p>
              <p className="book-price">₹{book.price}</p>

              <div className="card-buttons">
                {book.seller === userId && (
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="book-button delete-btn"
                  >
                    Delete
                  </button>
                )}
                <button
                  onClick={() => handleOrder(book._id)}
                  className="book-button order-btn"
                >
                  Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
