import React, {useState, useEffect} from 'react'
import api from './api'

const App = () => {
  const [booklogs, setBooklogs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    category: '',
    summary: '',
    quotes: '',
    isbn: ''
  });
  
  const fetchBooklogs = async () => {
    const response = await api.get('/booklogs/');
    setBooklogs(response.data)
  };

  useEffect(() => {
    fetchBooklogs()
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    })
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await api.post('/booklogs/', formData);
    fetchBooklogs();
    setFormData({
      title: '',
      authors: '',
      category: '',
      summary: '',
      quotes: '',
      isbn: ''
    });

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
            <input type='text' className='form-control' id='title' name='title' onChange={handleInputChange} value={formData.title}/>
            <br/>
            <label htmlFor='authors' className='form-label'>
              Author(s)
            </label>
            <input type='text' className='form-control' id='authors' name='authors' onChange={handleInputChange} value={formData.authors}/>
            <br/>
            <label htmlFor='category' className='form-label'>
              Category
            </label>
            <input type='text' className='form-control' id='category' name='category' onChange={handleInputChange} value={formData.category}/>
            <br/>
            <label htmlFor='summary' className='form-label'>
              Summary
            </label>
            <input type='text' className='form-control' id='summary' name='summary' onChange={handleInputChange} value={formData.summary}/>
            <br/>
            <label htmlFor='quotes' className='form-label'>
              Quotes
            </label>
            <input type='text' className='form-control' id='quotes' name='quotes' onChange={handleInputChange} value={formData.quotes}/>
          </div>
          <button type='submit' className='btn btn-secondary'>
            Submit
          </button>
        </form>
      </div>
    </div>
  )

}

export default App;
