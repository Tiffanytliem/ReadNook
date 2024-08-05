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
          </div>
        </form>
      </div>
    </div>
  )

}

export default App;
