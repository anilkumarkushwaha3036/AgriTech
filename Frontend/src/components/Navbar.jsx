import React from 'react';
import { Link } from 'react-router-dom';
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
        <div className="navbar-links">
          <Link to="/tools">Find Tools</Link>
          <Link to="/labor">Hire Labor</Link>
          <Link to="/login" className="btn-primary">
            <User size={18} /> Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
