import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserId(user.id);
      fetchBooks(user.id);
    }
  }, []);

  const fetchBooks = async (id) => {
    try {
      const res = await axios.get('http://localhost:5000/api/books');
      const myBooks = res.data.filter(book => book.seller === id);
      setBooks(myBooks);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  return (
    <div>
      <h2>📚 Your Uploaded Books</h2>
      {books.length === 0 ? (
        <p>No books uploaded yet.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 20
        }}>
          {books.map(book => (
            <div key={book._id} style={{
              border: '1px solid #ccc',
              padding: 10,
              borderRadius: 8
            }}>
              <img
                src={`http://localhost:5000${book.image}`}
                alt={book.title}
                style={{ width: '100%', height: 150, objectFit: 'cover' }}
              />
              <h3>{book.title}</h3>
              <p><b>Author:</b> {book.author}</p>
              <p><b>Price:</b> ₹{book.price}</p>
              <p><small>{book.description}</small></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
