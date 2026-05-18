import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../assets/scss/layout/_auth.scss';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    location: '',
    role: ''
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
    
    if(!formData.name || !formData.password || !formData.phone) {
      return setError('Please fill in all required fields');
    }
    if(!formData.role) {
      return setError('Please select your role to continue');
    }

    const res = await register(formData);
    if (res.success) {
      navigate('/dashboard');
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
          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label style={{ marginBottom: '0.2rem' }}>Full Name</label>
            <input name="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} />
          </div>
          
          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label style={{ marginBottom: '0.2rem' }}>Mobile Number</label>
            <input name="phone" type="text" placeholder="+91 9876543210" value={formData.phone} onChange={handleChange} />
          </div>
          
          <div className="form-group" style={{ marginBottom: '0.75rem' }}>
            <label style={{ marginBottom: '0.2rem' }}>I am joining as a:</label>
            <div className="role-selector" style={{ flexDirection: 'row', gap: '0.5rem', marginBottom: '0' }}>
              <div 
                className={`role-card ${formData.role === 'farmer' ? 'active' : ''}`}
                onClick={() => setFormData({...formData, role: 'farmer'})}
                style={{ padding: '0.4rem', flex: 1, textAlign: 'center', flexDirection: 'column', position: 'relative' }}
              >
                {formData.role === 'farmer' && <span style={{ position: 'absolute', top: 2, right: 4, fontSize: '0.8rem' }}>✅</span>}
                <span className="role-icon" style={{ fontSize: '1.2rem', marginRight: 0, marginBottom: '0.1rem' }}>👨‍🌾</span>
                <span className="role-title" style={{ fontSize: '0.8rem' }}>Farmer</span>
              </div>
              <div 
                className={`role-card ${formData.role === 'service_provider' ? 'active' : ''}`}
                onClick={() => setFormData({...formData, role: 'service_provider'})}
                style={{ padding: '0.4rem', flex: 1, textAlign: 'center', flexDirection: 'column', position: 'relative' }}
              >
                {formData.role === 'service_provider' && <span style={{ position: 'absolute', top: 2, right: 4, fontSize: '0.8rem' }}>✅</span>}
                <span className="role-icon" style={{ fontSize: '1.2rem', marginRight: 0, marginBottom: '0.1rem' }}>🚜</span>
                <span className="role-title" style={{ fontSize: '0.8rem' }}>Provider</span>
              </div>
              <div 
                className={`role-card ${formData.role === 'laborer' ? 'active' : ''}`}
                onClick={() => setFormData({...formData, role: 'laborer'})}
                style={{ padding: '0.4rem', flex: 1, textAlign: 'center', flexDirection: 'column', position: 'relative' }}
              >
                {formData.role === 'laborer' && <span style={{ position: 'absolute', top: 2, right: 4, fontSize: '0.8rem' }}>✅</span>}
                <span className="role-icon" style={{ fontSize: '1.2rem', marginRight: 0, marginBottom: '0.1rem' }}>👷</span>
                <span className="role-title" style={{ fontSize: '0.8rem' }}>Labour</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Location (City / Village) *</label>
            <input 
              type="text" 
              name="location" 
              placeholder="e.g. Sonipat, Haryana"
              value={formData.location}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1rem' }}>
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
