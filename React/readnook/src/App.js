import React, { useState, useEffect } from 'react';
import api from './api';

const App = () => {
  const [booklogs, setBooklogs] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    authors: '',
    category: '',
    summary: '',
    quotes: '',
    isbn: ''
  });
  const [editing, setEditing] = useState(false);

  const fetchBooklogs = async () => {
    const response = await api.get('/booklogs/');
    setBooklogs(response.data);
  };

  useEffect(() => {
    fetchBooklogs();
  }, []);

  const handleInputChange = (e) => {
    // const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      // [e.target.name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await api.put(`/booklogs/${formData.id}`, formData);
    } else {
      await api.post('/booklogs/', formData);
    }
    fetchBooklogs();
    setFormData({
      id: '',
      title: '',
      authors: '',
      category: '',
      summary: '',
      quotes: '',
      isbn: ''
    });
    setEditing(false);
  };

  const handleEditClick = (booklog) => {
    setFormData(booklog);
    setEditing(true);
  };

  return (
    <div>
      <nav className='navbar navbar-dark bg-secondary'>
        <div className='container-fluid'>
          <a className='navbar-brand' href="#">
            <h3>READNOOK</h3>
          </a>
        </div>
      </nav>
      <div className='container'>
        <form onSubmit={handleFormSubmit}>
          <div className='mb-3 mt-3'>
            <label htmlFor='title' className='form-label'>
              Title
            </label>
            <input type='text' className='form-control' id='title' name='title' onChange={handleInputChange} value={formData.title} />
            <br />
            <label htmlFor='authors' className='form-label'>
              Author(s)
            </label>
            <input type='text' className='form-control' id='authors' name='authors' onChange={handleInputChange} value={formData.authors} />
            <br />
            <label htmlFor='category' className='form-label'>
              Category
            </label>
            <input type='text' className='form-control' id='category' name='category' onChange={handleInputChange} value={formData.category} />
            <br />
            <label htmlFor='summary' className='form-label'>
              Summary
            </label>
            <input type='text' className='form-control' id='summary' name='summary' onChange={handleInputChange} value={formData.summary} />
            <br />
            <label htmlFor='quotes' className='form-label'>
              Quotes
            </label>
            <input type='text' className='form-control' id='quotes' name='quotes' onChange={handleInputChange} value={formData.quotes} />
            <br />
            <label htmlFor='isbn' className='form-label'>
              ISBN
            </label>
            <input type='text' className='form-control' id='isbn' name='isbn' onChange={handleInputChange} value={formData.isbn} />
          </div>
          <button type='submit' className='btn btn-secondary'>
            {editing ? 'Update' : 'Submit'}
          </button>
        </form>
        <br />
        <table className='table table-striped table-bordered table-hover'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author(s)</th>
              <th>Category</th>
              <th>Summary</th>
              <th>Quote(s)</th>
              <th>ISBN</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {booklogs.map(booklog => (
              <tr key={booklog.id}>
                <td>{booklog.title}</td>
                <td>{booklog.authors}</td>
                <td>{booklog.category}</td>
                <td>{booklog.summary}</td>
                <td>{booklog.quotes}</td>
                <td>{booklog.isbn}</td>
                <td>
                  <button onClick={() => handleEditClick(booklog)} className='btn btn-secondary'>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;