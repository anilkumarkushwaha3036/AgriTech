import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AddEquipment = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'tractor',
    pricePerDay: ''
  });
  
  const [customCategory, setCustomCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  // Protect Route internally
  if(!user) {
    return (
      <div className="container" style={{padding: '4rem 1rem', textAlign:'center'}}>
        <h2>Authentication Required</h2>
        <p>Please login to list your machinery.</p>
        <button className="btn-primary" onClick={() => navigate('/login')} style={{marginTop: '1rem'}}>Go to Login</button>
      </div>
    );
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setUploading(true);

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      let imageUrls = [];
      
      // Upload image first
      if (imageFile) {
        const fileData = new FormData();
        fileData.append('image', imageFile);
        const { data: imgPath } = await axios.post('http://localhost:5000/api/upload', fileData, {
           headers: { 'Content-Type': 'multipart/form-data' }
        });
        imageUrls.push(imgPath); // backend returns path string
      }

      // Determine final category (use custom if selected 'other')
      let finalCategory = formData.category;
      if (formData.category === 'other' && customCategory.trim() !== '') {
        finalCategory = customCategory;
      }

      // Save to database
      await axios.post('http://localhost:5000/api/equipment', { 
        ...formData, 
        category: finalCategory, 
        images: imageUrls 
      }, config);
      
      navigate('/tools');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add equipment');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: '600px' }}>
        <h2>List Your Tool</h2>
        <p className="subtitle">Earn money by renting your idle machinery</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tool Name (e.g. Mahindra Tractor 575)</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="tractor">Tractor</option>
              <option value="harvester">Harvester</option>
              <option value="implement">Implement (Plough, Cultivator)</option>
              <option value="irrigation">Irrigation Motor/Pumps</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          {formData.category === 'other' && (
             <div className="form-group">
               <label>Custom Category Name</label>
               <input 
                 type="text" 
                 placeholder="e.g. Thresher" 
                 value={customCategory} 
                 onChange={(e) => setCustomCategory(e.target.value)} 
                 required 
               />
             </div>
          )}

          <div className="form-group">
            <label>Upload Machinery Image</label>
            <input type="file" onChange={handleImageChange} accept="image/*" />
          </div>

          <div className="form-group">
            <label>Rental Price Per Day (₹)</label>
            <input type="number" name="pricePerDay" required value={formData.pricePerDay} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Short Description</label>
            <input type="text" name="description" required placeholder="Very good condition, comes with driver..." value={formData.description} onChange={handleChange} />
          </div>

          <button type="submit" className="btn-primary btn-submit" disabled={uploading}>
            {uploading ? 'Publishing...' : 'Publish Listing'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEquipment;
