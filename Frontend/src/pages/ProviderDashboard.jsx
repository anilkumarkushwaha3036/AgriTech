import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../assets/scss/layout/_provider_dashboard.scss';

const ProviderDashboard = () => {
  const { user, setUser } = useContext(AuthContext);

  // Machinery Listing State
  const [myMachinery, setMyMachinery] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Add New Machinery Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMachine, setNewMachine] = useState({
    category: 'Tractor',
    customCategory: '',
    name: '',
    pricePerHour: '',
    imageUrl: ''
  });
  const [addMessage, setAddMessage] = useState('');

  const fetchMyMachinery = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('/api/equipment/my', config);
      setMyMachinery(data);
    } catch (error) {
      console.error("Failed to fetch machinery", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyMachinery();
  }, []);

  const handleAddMachinery = async (e) => {
    e.preventDefault();
    setAddMessage('');
    
    // Determine the final category
    const finalCategory = newMachine.category === 'Other' ? newMachine.customCategory : newMachine.category;
    
    if (!finalCategory || !newMachine.name || !newMachine.pricePerHour) {
      return setAddMessage('Please fill all required fields.');
    }

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const payload = {
        name: newMachine.name,
        description: `High quality ${finalCategory} available for rent.`,
        category: finalCategory,
        pricePerHour: Number(newMachine.pricePerHour),
        images: newMachine.imageUrl ? [newMachine.imageUrl] : []
      };

      await axios.post('/api/equipment', payload, config);
      setAddMessage('Machinery added successfully!');
      setShowAddForm(false);
      setNewMachine({ category: 'Tractor', customCategory: '', name: '', pricePerHour: '', imageUrl: '' });
      fetchMyMachinery(); // Refresh list
    } catch (error) {
      setAddMessage(error.response?.data?.message || 'Failed to add machinery.');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`/api/equipment/${id}/status`, { status: newStatus }, config);
      // Update local state to reflect change instantly
      setMyMachinery(myMachinery.map(m => m._id === id ? { ...m, status: newStatus } : m));
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="provider-dashboard">
      <div className="dashboard-container">
        
        {/* Header Section */}
        <div className="header-section">
          <div>
            <h2>Provider Dashboard 🚜</h2>
            <p>Manage your machinery fleet</p>
            <span className="location-badge" style={{display:'inline-block', marginTop:'0.5rem', padding:'0.25rem 0.75rem', background:'#E3F2FD', color:'#1976D2', borderRadius:'15px', fontSize:'0.9rem', fontWeight:'600'}}>
              📍 {user?.location?.city || 'Location Not Set'}
            </span>
          </div>
        </div>

        {/* My Machinery Section */}
        <div className="card-section fleet-card">
          <div className="card-header">
            <h3>My Machinery Fleet</h3>
            <button className="btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? 'Close Form' : '+ Add Machinery'}
            </button>
          </div>

          {/* Add Machinery Form */}
          {showAddForm && (
            <div className="add-form-container">
              <h4>Add New Equipment</h4>
              {addMessage && <div className="alert">{addMessage}</div>}
              <form onSubmit={handleAddMachinery}>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Machine Type</label>
                    <select 
                      value={newMachine.category} 
                      onChange={(e) => setNewMachine({...newMachine, category: e.target.value})}
                    >
                      <option value="Tractor">Tractor</option>
                      <option value="Harvester">Harvester</option>
                      <option value="Thresher">Thresher</option>
                      <option value="Cultivator">Cultivator</option>
                      <option value="Other">Other (Specify)</option>
                    </select>
                  </div>

                  {newMachine.category === 'Other' && (
                    <div className="form-group">
                      <label>Specify Type</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Seeder" 
                        value={newMachine.customCategory}
                        onChange={(e) => setNewMachine({...newMachine, customCategory: e.target.value})}
                        required
                      />
                    </div>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Model / Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Mahindra 575 DI" 
                      value={newMachine.name}
                      onChange={(e) => setNewMachine({...newMachine, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Price per Hour (₹)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 800" 
                      value={newMachine.pricePerHour}
                      onChange={(e) => setNewMachine({...newMachine, pricePerHour: e.target.value})}
                      required
                      min="0"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Image URL (Optional)</label>
                  <input 
                    type="url" 
                    placeholder="https://example.com/tractor.jpg" 
                    value={newMachine.imageUrl}
                    onChange={(e) => setNewMachine({...newMachine, imageUrl: e.target.value})}
                  />
                </div>

                <button type="submit" className="btn-success">Save Machinery</button>
              </form>
            </div>
          )}

          {/* Machinery List */}
          <div className="machinery-list">
            {loading ? (
              <p>Loading your fleet...</p>
            ) : myMachinery.length === 0 ? (
              <p className="empty-state">You haven't added any machinery yet. Click '+ Add Machinery' to get started!</p>
            ) : (
              <div className="grid-list">
                {myMachinery.map(machine => (
                  <div key={machine._id} className="machine-card">
                    {machine.images && machine.images[0] ? (
                      <img src={machine.images[0]} alt={machine.name} className="machine-img" />
                    ) : (
                      <div className="machine-img placeholder">🚜 No Image</div>
                    )}
                    <div className="machine-details">
                      <h4>{machine.name} <span className="category-tag">{machine.category}</span></h4>
                      <p className="price">₹{machine.pricePerHour} / hour</p>
                      
                      <div className="status-control">
                        <label>Current Status:</label>
                        <select 
                          value={machine.status || 'Available'} 
                          onChange={(e) => handleStatusChange(machine._id, e.target.value)}
                          className={`status-select ${machine.status?.replace(' ', '-').toLowerCase()}`}
                        >
                          <option value="Available">🟢 Available</option>
                          <option value="Working">🟡 Working</option>
                          <option value="Not Active">🔴 Not Active</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProviderDashboard;
