import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../assets/scss/layout/_farmer_dashboard.scss';

const FarmerDashboard = () => {
  const { user, setUser } = useContext(AuthContext);

  // Bookings / Rentals State
  const [myRentals, setMyRentals] = useState([]);
  const [loadingRentals, setLoadingRentals] = useState(true);

  // Small Tools State
  const [myTools, setMyTools] = useState([]);
  const [loadingTools, setLoadingTools] = useState(true);
  const [showAddToolForm, setShowAddToolForm] = useState(false);
  const [newTool, setNewTool] = useState({
    name: '',
    pricePerDay: '',
    imageUrl: ''
  });
  const [addToolMessage, setAddToolMessage] = useState('');

  useEffect(() => {
    fetchMyRentals();
    fetchMyTools();
  }, []);

  const fetchMyRentals = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('/api/bookings/mybookings', config);
      setMyRentals(data);
    } catch (error) {
      console.error("Failed to fetch rentals", error);
    } finally {
      setLoadingRentals(false);
    }
  };

  const fetchMyTools = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get('/api/equipment/my', config);
      setMyTools(data);
    } catch (error) {
      console.error("Failed to fetch tools", error);
    } finally {
      setLoadingTools(false);
    }
  };

  const handleAddTool = async (e) => {
    e.preventDefault();
    setAddToolMessage('');
    
    if (!newTool.name || !newTool.pricePerDay) {
      return setAddToolMessage('Please fill all required fields.');
    }

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const payload = {
        name: newTool.name,
        description: `Farmer's tool available for rent.`,
        category: 'Small Tool', // Hardcoded for farmer tools
        pricePerDay: Number(newTool.pricePerDay),
        images: newTool.imageUrl ? [newTool.imageUrl] : []
      };

      await axios.post('/api/equipment', payload, config);
      setAddToolMessage('Tool listed successfully!');
      setShowAddToolForm(false);
      setNewTool({ name: '', pricePerDay: '', imageUrl: '' });
      fetchMyTools(); // Refresh list
    } catch (error) {
      setAddToolMessage(error.response?.data?.message || 'Failed to list tool.');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`/api/equipment/${id}/status`, { status: newStatus }, config);
      setMyTools(myTools.map(t => t._id === id ? { ...t, status: newStatus } : t));
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="farmer-dashboard">
      <div className="dashboard-container">
        
        {/* Header Section */}
        <div className="header-section">
          <div>
            <h2>Farmer Dashboard 👨‍🌾</h2>
            <p>Manage your field rentals and list your tools for others</p>
            <span className="location-badge" style={{display:'inline-block', marginTop:'0.5rem', padding:'0.25rem 0.75rem', background:'#E3F2FD', color:'#1976D2', borderRadius:'15px', fontSize:'0.9rem', fontWeight:'600'}}>
              📍 {user?.location?.city || 'Location Not Set'}
            </span>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* My Rentals (Bookings) */}
          <div className="card-section rentals-card">
            <div className="card-header">
              <h3>📦 My Rented Labour & Machinery</h3>
            </div>
            
            <div className="rentals-list">
              {loadingRentals ? (
                <p>Loading rentals...</p>
              ) : myRentals.length === 0 ? (
                <p className="empty-state">You haven't rented any labour or machinery yet.</p>
              ) : (
                myRentals.map(booking => (
                  <div key={booking._id} className="booking-item">
                    <div className="booking-info">
                      <h4>{booking.itemType === 'Equipment' ? '🚜 Machinery' : '👷 Labourer'}</h4>
                      <p><strong>Provider:</strong> {booking.provider?.name || 'Unknown'}</p>
                      <p><strong>Phone:</strong> {booking.provider?.phone || 'N/A'}</p>
                      <p className="amount">Total: ₹{booking.totalAmount}</p>
                    </div>
                    <div className={`status-badge ${booking.status.toLowerCase()}`}>
                      {booking.status.toUpperCase()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* List Tools Section */}
          <div className="card-section tools-card">
            <div className="card-header">
              <h3>🛠️ My Listed Tools</h3>
              <button className="btn-primary" onClick={() => setShowAddToolForm(!showAddToolForm)}>
                {showAddToolForm ? 'Close Form' : '+ List a Tool'}
              </button>
            </div>

            {/* Add Tool Form */}
            {showAddToolForm && (
              <div className="add-form-container">
                <h4>List a tool for rent (Pipes, Pumps, etc.)</h4>
                {addToolMessage && <div className="alert">{addToolMessage}</div>}
                <form onSubmit={handleAddTool}>
                  <div className="form-group">
                    <label>Tool Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 5HP Water Pump" 
                      value={newTool.name}
                      onChange={(e) => setNewTool({...newTool, name: e.target.value})}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Price per Day (₹)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 150" 
                      value={newTool.pricePerDay}
                      onChange={(e) => setNewTool({...newTool, pricePerDay: e.target.value})}
                      required
                      min="0"
                    />
                  </div>

                  <div className="form-group">
                    <label>Image URL (Optional)</label>
                    <input 
                      type="url" 
                      placeholder="https://example.com/pump.jpg" 
                      value={newTool.imageUrl}
                      onChange={(e) => setNewTool({...newTool, imageUrl: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="btn-success">List Tool</button>
                </form>
              </div>
            )}

            {/* Listed Tools List */}
            <div className="tools-list">
              {loadingTools ? (
                <p>Loading your tools...</p>
              ) : myTools.length === 0 ? (
                <p className="empty-state">You haven't listed any tools yet. Share your tools with others to earn extra income!</p>
              ) : (
                <div className="grid-list">
                  {myTools.map(tool => (
                    <div key={tool._id} className="tool-card">
                      {tool.images && tool.images[0] ? (
                        <img src={tool.images[0]} alt={tool.name} className="tool-img" />
                      ) : (
                        <div className="tool-img placeholder">🛠️</div>
                      )}
                      <div className="tool-details">
                        <h4>{tool.name}</h4>
                        <p className="price">₹{tool.pricePerDay} / day</p>
                        
                        <div className="status-control">
                          <select 
                            value={tool.status || 'Available'} 
                            onChange={(e) => handleStatusChange(tool._id, e.target.value)}
                            className={`status-select ${tool.status?.replace(' ', '-').toLowerCase()}`}
                          >
                            <option value="Available">🟢 Available</option>
                            <option value="Working">🟡 Rented Out</option>
                            <option value="Not Active">🔴 Hidden</option>
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
    </div>
  );
};

export default FarmerDashboard;
