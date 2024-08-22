import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:5000/api/admin-login', { email, password });
        navigate('/admin-dashboard');
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="signup-page">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqI4hvCHWsCjsEn-It33lBpAL80baI4OOZkQ&s" alt="Admin Login" className="signup-image" />
      <div className="signup-form">
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <input 
            className='in' 
            type="email" 
            placeholder="Email Id" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            className='in' 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button 
            type="submit" 
            style={{ marginTop: '10px' }}
          >
            Login
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
