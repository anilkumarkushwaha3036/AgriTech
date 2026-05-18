import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import '../assets/scss/layout/_bookingmodal.scss';

const BookingModal = ({ equipment, onClose }) => {
  const { user } = useContext(AuthContext);
  const [duration, setDuration] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [loading, setLoading] = useState(false);

  const isHourly = equipment.pricePerHour > 0;
  const rate = equipment.pricePerHour || equipment.pricePerDay || equipment.dailyWage || 500;
  const unit = isHourly ? 'hours' : 'days';
  const totalAmount = rate * duration;

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
        provider: equipment.owner?._id || equipment._id, // if it's a labourer, the item is the user
        itemType: equipment.category ? 'Equipment' : 'User',
        itemId: equipment._id,
        startDate: new Date(),
        endDate: new Date(new Date().setHours(new Date().getHours() + parseInt(duration))),
        totalAmount,
        paymentStatus: paymentMethod === 'cash' ? 'pending' : 'pending' // will update to paid if online succeeds
      };
      const { data: newBooking } = await axios.post('/api/bookings', bookingData, config);

      if (paymentMethod === 'cash') {
        alert('Booking Confirmed! You can pay after the work is done.');
        onClose();
        return;
      }

      // 2. Generate Razorpay Order
      const { data: orderData } = await axios.post('/api/payment/order', {
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
            await axios.post('/api/payment/verify', {
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
          contact: user.phone,
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
        <p>Rental Price: ₹{rate} / {unit.slice(0, -1)}</p>
        
        <div className="form-group" style={{marginTop:'1.5rem'}}>
          <label style={{display:'block', marginBottom:'0.5rem', fontWeight:'500'}}>How many {unit} do you need?</label>
          <input 
            type="number" 
            min="1" 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)} 
            style={{ width: '100%', padding: '0.75rem', borderRadius:'8px', border:'1px solid #ccc', fontSize:'1rem' }}
          />
        </div>

        <div className="form-group" style={{marginTop:'1.5rem'}}>
          <label style={{display:'block', marginBottom:'0.5rem', fontWeight:'500'}}>Payment Method</label>
          <div style={{display: 'flex', gap: '1rem'}}>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
              <input type="radio" name="payment" value="online" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} />
              <span>💳 Pay Online (Razorpay)</span>
            </label>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer'}}>
              <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} />
              <span>💵 Pay After Work</span>
            </label>
          </div>
        </div>

        <div className="total-box" style={{marginTop:'1.5rem'}}>
          <h4>Total Amount</h4>
          <span className="amount">₹{totalAmount}</span>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
          <button className="btn-primary" onClick={handlePayment} disabled={loading}>
            {loading ? 'Processing...' : paymentMethod === 'online' ? `Pay ₹${totalAmount}` : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
