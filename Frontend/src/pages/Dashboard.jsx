import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LaborDashboard from './LaborDashboard';
import ProviderDashboard from './ProviderDashboard';
import FarmerDashboard from './FarmerDashboard';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  switch (user.role) {
    case 'laborer':
      return <LaborDashboard />;
    case 'farmer':
      return <FarmerDashboard />;
    case 'service_provider':
      return <ProviderDashboard />;
    default:
      return <Navigate to="/" />;
  }
};

export default Dashboard;
