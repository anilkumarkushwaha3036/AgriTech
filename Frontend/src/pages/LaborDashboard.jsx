import React, { useState, useContext, useEffect } from 'react';
import { Pickaxe, Sprout, Droplet, Scissors, Leaf, User as DefaultUser } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../assets/scss/layout/_dashboard.scss';

const AVATAR_OPTIONS = [
  { id: 'default', icon: DefaultUser, label: 'General Helper', color: '#4B5563', bgColor: 'rgba(75, 85, 99, 0.1)', borderActive: '2px solid #4B5563', bgActive: '#F3F4F6' },
  { id: 'sower', icon: Sprout, label: 'Sowing Helper', color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.1)', borderActive: '2px solid #10B981', bgActive: '#E8F5E9' },
  { id: 'irrigator', icon: Droplet, label: 'Irrigation Helper', color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.1)', borderActive: '2px solid #3B82F6', bgActive: '#EBF5FF' },
  { id: 'digger', icon: Pickaxe, label: 'Land Digger', color: '#8B5CF6', bgColor: 'rgba(139, 92, 246, 0.1)', borderActive: '2px solid #8B5CF6', bgActive: '#F5F3FF' },
  { id: 'pruner', icon: Scissors, label: 'Pruning Helper', color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.1)', borderActive: '2px solid #EF4444', bgActive: '#FEF2F2' },
  { id: 'plantation', icon: Leaf, label: 'Plantation Helper', color: '#F57F17', bgColor: 'rgba(245, 127, 23, 0.1)', borderActive: '2px solid #F57F17', bgActive: '#FFF8E1' },
];

const LaborDashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const [dailyWage, setDailyWage] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [selectedAvatar, setSelectedAvatar] = useState('default');
  
  // Edit mode is true if no wage is set yet
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    if (user) {
      setDailyWage(user.dailyWage || '');
      setIsAvailable(user.isAvailable !== undefined ? user.isAvailable : true);
      setSelectedAvatar(user.avatar || 'default');
      
      // If user already has profile details, start in View Mode
      if (user.dailyWage) {
        setIsEditing(false);
      }
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const payload = { dailyWage: Number(dailyWage), isAvailable, avatar: selectedAvatar };

      const { data } = await axios.put('/api/auth/profile', payload, config);
      setUser(data);
      localStorage.setItem('kisanSewaUser', JSON.stringify(data));
      
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
      setIsEditing(false); // Switch to View Mode after saving
    } catch (error) {
      console.error("Update profile error:", error);
      setMessage({ 
        text: error.response?.data?.message || error.message || 'Failed to update profile', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async (newStatus) => {
    setIsAvailable(newStatus);
    if (!isEditing) {
      // If in view mode, instantly save the availability change to DB
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.put('/api/auth/profile', { isAvailable: newStatus }, config);
        setUser(data);
        localStorage.setItem('kisanSewaUser', JSON.stringify(data));
      } catch (error) {
        console.error("Failed to toggle availability", error);
        // Revert UI if it fails
        setIsAvailable(!newStatus);
      }
    }
  };

  const activeOption = AVATAR_OPTIONS.find(a => a.id === (user?.avatar || 'default')) || AVATAR_OPTIONS[0];
  const ActiveIcon = activeOption.icon;

  return (
    <div className="dashboard-page">
      <div className="dashboard-container-full">
        <div className="dashboard-header-flex">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '50%', flexShrink: 0,
              background: activeOption.bgColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: activeOption.color, boxShadow: `0 4px 10px ${activeOption.bgColor}`
            }}>
              <ActiveIcon size={30} strokeWidth={2.5} />
            </div>
            <div>
              <h2>Welcome, {user?.name}</h2>
              <p>Manage your labour profile and availability</p>
              <span className="location-badge" style={{display:'inline-block', marginTop:'0.5rem', padding:'0.25rem 0.75rem', background:'#E3F2FD', color:'#1976D2', borderRadius:'15px', fontSize:'0.9rem', fontWeight:'600'}}>
                📍 {user?.location?.city || 'Location Not Set'}
              </span>
            </div>
          </div>
          {!isEditing && (
            <button className="btn-secondary btn-edit" onClick={() => setIsEditing(true)}>
              ✏️ Edit Profile
            </button>
          )}
        </div>

        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        {isEditing ? (
          <form className="dashboard-grid" onSubmit={handleSave}>
            <div className="form-card">
              <h3>Profile Details</h3>
              <div className="form-group">
                <label>Daily Wage (₹ per day)</label>
                <input 
                  type="number" 
                  placeholder="e.g., 500"
                  value={dailyWage}
                  onChange={(e) => setDailyWage(e.target.value)}
                  required
                  min="0"
                />
              </div>
            </div>

            <div className="form-card">
              <h3>Select Your Profile Icon</h3>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                {AVATAR_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedAvatar === opt.id;
                  return (
                    <div 
                      key={opt.id}
                      onClick={() => setSelectedAvatar(opt.id)}
                      style={{
                        padding: '1rem',
                        borderRadius: '12px',
                        border: isSelected ? opt.borderActive : '1px solid #E5E7EB',
                        backgroundColor: isSelected ? opt.bgActive : '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                        width: '110px',
                        transition: 'all 0.2s',
                        boxShadow: isSelected ? `0 4px 12px ${opt.bgColor}` : 'none'
                      }}
                    >
                      <Icon size={28} color={isSelected ? opt.color : '#6B7280'} />
                      <span style={{ fontSize: '0.75rem', fontWeight: isSelected ? '700' : '400', color: isSelected ? opt.color : '#6B7280', textAlign: 'center' }}>
                        {opt.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="form-card">
              <h3>Work Status</h3>
              <div className="toggle-group">
                <label className="toggle-label">
                  <span>Available for work?</span>
                  <div className="switch">
                    <input 
                      type="checkbox" 
                      checked={isAvailable}
                      onChange={(e) => handleToggleAvailability(e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </div>
                </label>
                <p className="help-text" style={{marginTop:'1rem'}}>
                  {isAvailable 
                    ? "✅ Farmers can see your profile and contact you." 
                    : "⏸️ Your profile is hidden from farmers right now."}
                </p>
              </div>
              
              <button type="submit" className="btn-primary btn-save" disabled={loading}>
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
              {user?.dailyWage && (
                <button type="button" className="btn-cancel" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className="dashboard-grid">

            <div className="stat-card">
              <div className="stat-icon wage-icon">₹</div>
              <div className="stat-content">
                <h4>Daily Wage</h4>
                <p className="stat-value">₹ {user?.dailyWage || '0'}</p>
                <span className="stat-label">Per Day</span>
              </div>
            </div>

            <div className="stat-card availability-card">
               <div className="stat-content">
                <h4>Work Status</h4>
                <div className="status-badge" style={{ backgroundColor: isAvailable ? '#E8F5E9' : '#FEE2E2', color: isAvailable ? '#2E7D32' : '#B91C1C' }}>
                  {isAvailable ? '🟢 Actively Looking for Work' : '⏸️ Not Available'}
                </div>
                
                <div className="toggle-group" style={{marginTop: '1.5rem', borderTop: '1px solid #eee', paddingTop: '1rem'}}>
                  <label className="toggle-label">
                    <span style={{fontSize: '0.95rem'}}>Change Status Instantly:</span>
                    <div className="switch">
                      <input 
                        type="checkbox" 
                        checked={isAvailable}
                        onChange={(e) => handleToggleAvailability(e.target.checked)}
                      />
                      <span className="slider round"></span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LaborDashboard;
