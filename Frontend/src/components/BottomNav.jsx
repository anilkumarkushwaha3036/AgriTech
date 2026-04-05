import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Tractor, Users, User } from 'lucide-react';
import '../assets/scss/layout/_bottomnav.scss';

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: <Home /> },
    { name: 'Tools', path: '/tools', icon: <Tractor /> },
    { name: 'Labor', path: '/labor', icon: <Users /> },
    { name: 'Profile', path: '/login', icon: <User /> }
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item) => (
        <Link 
          key={item.name} 
          to={item.path} 
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          {item.icon}
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNav;
