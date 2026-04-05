import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../assets/scss/layout/_bookingmodal.scss';

const BookingModal = ({ equipment, onClose }) => {
  const { user } = useContext(AuthContext);
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalAmount = equipment.pricePerDay * days;

  const handlePayment = async () => {
    if (!user) {
      alert("Please login or register to book machinery!");
      return;
    }
    setLoading(true);

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      
      // 1. Create Booking record in Database
      const bookingData = {
        provider: equipment.owner._id,
        itemType: 'Equipment',
        itemId: equipment._id,
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + parseInt(days))),
        totalAmount
      };
      const { data: newBooking } = await axios.post('http://localhost:5000/api/bookings', bookingData, config);

      // 2. Generate Razorpay Order
      const { data: orderData } = await axios.post('http://localhost:5000/api/payment/order', {
        amount: totalAmount,
        bookingId: newBooking._id
      }, config);

      // 3. Mount Razorpay Checkout UI
      const options = {
        key: orderData.key_id, 
        amount: orderData.amount,
        currency: orderData.currency,
        name: "AgriTech",
        description: `Booking fee for ${equipment.name}`,
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            // 4. Verify Payment with our Node server
            await axios.post('http://localhost:5000/api/payment/verify', {
              ...response,
              bookingId: newBooking._id
            }, config);
            
            alert('Payment Successful! Machinery Confirmed.');
            onClose();
          } catch(err) {
             alert('Payment verification failed.');
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#2E7D32"
        }
      };

      const razor = new window.Razorpay(options);
      razor.on('payment.failed', function (response){
        alert("Payment failed! Please try again.");
      });
      razor.open();
      
    } catch (error) {
      console.error(error);
      alert("There was an issue processing your booking request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Book {equipment.name}</h3>
        <p>Rental Price: ₹{equipment.pricePerDay} / day</p>
        
        <div className="form-group" style={{marginTop:'1.5rem'}}>
          <label style={{display:'block', marginBottom:'0.5rem', fontWeight:'500'}}>How many days do you need to hire this?</label>
          <input 
            type="number" 
            min="1" 
            value={days} 
            onChange={(e) => setDays(e.target.value)} 
            style={{ width: '100%', padding: '0.75rem', borderRadius:'8px', border:'1px solid #ccc', fontSize:'1rem' }}
          />
        </div>

        <div className="total-box">
          <h4>Total Amount</h4>
          <span className="amount">₹{totalAmount}</span>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
          <button className="btn-primary" onClick={handlePayment} disabled={loading}>
            {loading ? 'Processing...' : `Pay ₹${totalAmount}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
