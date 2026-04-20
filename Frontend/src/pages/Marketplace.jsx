import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { User, PlusCircle } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import '../assets/scss/layout/_marketplace.scss';

const Marketplace = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEq, setSelectedEq] = useState(null);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const { data } = await axios.get('/api/equipment');
        setEquipmentList(data);
      } catch (error) {
        console.error("Error fetching equipment:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEquipment();
  }, []);

  return (
    <div className="marketplace-page container">
      <div className="marketplace-header">
        <div>
          <h1>Available Machinery</h1>
          <p>Find and rent tools from farmers near you.</p>
        </div>
        <Link to="/add-equipment" className="btn-primary">
          <PlusCircle size={20} /> List Your Tool
        </Link>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading tools...</div>
      ) : equipmentList.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
          No tools listed yet. Be the first to list yours!
        </div>
      ) : (
        <div className="equipment-grid">
          {equipmentList.map((eq) => (
            <div key={eq._id} className="equipment-card">
              <div className="eq-img-wrapper">
                {eq.images && eq.images.length > 0 ? (
                  <img src={`${eq.images[0]}`} alt={eq.name} />
                ) : (
                  <div>No Image Provided</div>
                )}
              </div>
              <div className="eq-content">
                <div className="eq-header">
                  <h3>{eq.name}</h3>
                  <span className="category-badge">{eq.category}</span>
                </div>
                <div className="price">₹{eq.pricePerDay} / day</div>
                
                <div className="owner-info">
                  <User size={16} /> <span>{eq.owner?.name || 'Unknown User'}</span>
                </div>
                
                <button className="btn-primary" onClick={() => setSelectedEq(eq)}>Book Now</button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {selectedEq && (
        <BookingModal equipment={selectedEq} onClose={() => setSelectedEq(null)} />
      )}
    </div>
  );
};

export default Marketplace;
