import React, { useState } from 'react';
import axios from 'axios';
import './styles/UploadBook.css';
const UploadBook = () => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    price: '',
    description: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      alert('✅ Book uploaded successfully!');
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert('❌ Upload failed: ' + (err.response?.data?.error || 'Unknown error'));
    }
  };

  return (
    <form className="upload-form-container" onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>📚 Upload Book</h2>
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <input name="author" placeholder="Author" onChange={handleChange} required />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required />
      <input type="file" name="image" accept="image/*" onChange={handleChange} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadBook;