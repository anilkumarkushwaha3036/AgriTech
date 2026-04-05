import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User as UserIcon } from 'lucide-react';
import '../assets/scss/layout/_marketplace.scss';

const Labor = () => {
  const [laborList, setLaborList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabor = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/labor');
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
      <div className="marketplace-header">
        <div>
          <h1>Hire Agricultural Labor</h1>
          <p>Find skilled hands for your upcoming harvest or farming tasks.</p>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading skilled labor...</div>
      ) : laborList.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
          No laborers currently registered.
        </div>
      ) : (
        <div className="equipment-grid">
          {laborList.map((laborer) => (
            <div key={laborer._id} className="equipment-card">
              <div className="eq-img-wrapper" style={{height:'150px'}}>
                <UserIcon size={60} color="#9CA3AF" />
              </div>
              <div className="eq-content">
                <div className="eq-header">
                  <h3>{laborer.name}</h3>
                  <span className="category-badge">Laborer</span>
                </div>
                <div className="price">Avg Wage Target: ₹{laborer.dailyWage || 500} / day</div>
                
                <div className="owner-info">
                  <span>Location: {laborer.location?.city || 'Local'}</span>
                </div>
                
                <button className="btn-secondary" style={{width:'100%'}} onClick={() => alert('Call ' + laborer.phone + ' to hire.')}>
                  Contact {laborer.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Labor;
