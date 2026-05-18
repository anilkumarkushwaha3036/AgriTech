import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Tractor, User } from 'lucide-react';
import '../assets/scss/layout/_navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo">
          <Tractor size={32} color="#2E7D32" />
          <span>AgriTech</span>
        </Link>
        <div className="navbar-menu">
          <Link to="/">Home</Link>
          <NavLink to="/machinery" className={({ isActive }) => isActive ? 'nav-active' : ''}>Machinery</NavLink>
          <NavLink to="/tools" className={({ isActive }) => isActive ? 'nav-active' : ''}>Tools</NavLink>
          <NavLink to="/labor" className={({ isActive }) => isActive ? 'nav-active' : ''}>Labour</NavLink>
        </div>
        <div className="navbar-actions">
          <Link to="/login" className="btn-login">
            <User size={18} /> Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
