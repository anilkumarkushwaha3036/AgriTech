import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, PlusCircle, Pickaxe, Sprout, Droplet, Scissors, Leaf, User as DefaultUser } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import '../assets/scss/layout/_marketplace.scss';

const AVATAR_MAP = {
  default: { icon: DefaultUser, color: '#4B5563', bgColor: 'rgba(75, 85, 99, 0.1)', shadowColor: 'rgba(75, 85, 99, 0.08)' },
  sower: { icon: Sprout, color: '#10B981', bgColor: 'rgba(16, 185, 129, 0.1)', shadowColor: 'rgba(16, 185, 129, 0.08)' },
  irrigator: { icon: Droplet, color: '#3B82F6', bgColor: 'rgba(59, 130, 246, 0.1)', shadowColor: 'rgba(59, 130, 246, 0.08)' },
  digger: { icon: Pickaxe, color: '#8B5CF6', bgColor: 'rgba(139, 92, 246, 0.1)', shadowColor: 'rgba(139, 92, 246, 0.08)' },
  pruner: { icon: Scissors, color: '#EF4444', bgColor: 'rgba(239, 68, 68, 0.1)', shadowColor: 'rgba(239, 68, 68, 0.08)' },
  plantation: { icon: Leaf, color: '#F57F17', bgColor: 'rgba(245, 127, 23, 0.1)', shadowColor: 'rgba(245, 127, 23, 0.08)' },
};

const Labor = () => {
  const [laborList, setLaborList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLabor, setSelectedLabor] = useState(null);

  useEffect(() => {
    const fetchLabor = async () => {
      try {
        const { data } = await axios.get('/api/labor');
        setLaborList(data);
      } catch (error) {
        console.error("Error fetching labor:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLabor();
  }, []);

  return (
    <div className="marketplace-page container">

      {loading ? (
        <div className="equipment-grid">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="skeleton-card" style={{padding: '1.5rem', height: 'auto'}}>
              <div style={{display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.5rem'}}>
                <div className="skeleton" style={{width:'50px', height:'50px', borderRadius:'50%'}}></div>
                <div style={{flex:1}}>
                  <div className="skeleton" style={{height:'18px', width:'60%', marginBottom:'8px'}}></div>
                  <div className="skeleton" style={{height:'14px', width:'40%'}}></div>
                </div>
              </div>
              <div className="skeleton" style={{height:'16px', width:'80%', marginBottom:'12px'}}></div>
              <div className="skeleton" style={{height:'14px', width:'50%', marginBottom:'20px'}}></div>
              <div className="skeleton" style={{height:'40px', width:'100%', borderRadius:'8px'}}></div>
            </div>
          ))}
        </div>
      ) : laborList.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
          No laborers currently registered.
        </div>
      ) : (
        <div className="equipment-grid">
          {laborList.map((laborer) => (
            <div key={laborer._id} className="laborer-card">
              <div className="laborer-header">
                {(() => {
                  const avConfig = AVATAR_MAP[laborer.avatar] || AVATAR_MAP.default;
                  const Icon = avConfig.icon;
                  return (
                    <div className="laborer-avatar" style={{
                      background: avConfig.bgColor,
                      color: avConfig.color,
                      boxShadow: `0 4px 10px ${avConfig.shadowColor}`
                    }}>
                      <Icon size={24} strokeWidth={2.5} />
                    </div>
                  );
                })()}
                <div className="laborer-title-area">
                  <h3>{laborer.name}</h3>
                  <span className="category-badge">Available Laborer</span>
                </div>
              </div>
              
              <div className="laborer-content">
                <div className="price-tag">
                  <span className="label">Expected Wage</span>
                  <span className="value">₹{laborer.dailyWage || 500} / day</span>
                </div>
                
                <div className="location-info">
                  <span>📍 Location: {laborer.location?.city || 'Local Area'}</span>
                </div>
                
                <button className="btn-primary book-btn" onClick={() => setSelectedLabor(laborer)}>
                  Book Laborer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {selectedLabor && (
        <BookingModal equipment={selectedLabor} onClose={() => setSelectedLabor(null)} />
      )}
    </div>
  );
};

export default Labor;
