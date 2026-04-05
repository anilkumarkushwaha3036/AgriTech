import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../assets/scss/layout/_auth.scss';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'farmer'
  });
  const [error, setError] = useState('');
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if(!formData.name || !formData.email || !formData.password || !formData.phone) {
      return setError('Please fill in all required fields');
    }

    const res = await register(formData);
    if (res.success) {
      navigate('/');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="subtitle">Join the AgriTech community</p>
        
        {error && <div className="error-msg">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label>Email ID</label>
            <input name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            <input name="phone" type="text" placeholder="+91 9876543210" value={formData.phone} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label>I am joining as a:</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="farmer">Farmer (Rent & List Equipment)</option>
              <option value="laborer">Agricultural Laborer</option>
            </select>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" placeholder="Create a strong password" value={formData.password} onChange={handleChange} />
          </div>
          
          <button type="submit" className="btn-primary btn-submit">Register Now</button>
        </form>
        
        <div className="auth-links">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
