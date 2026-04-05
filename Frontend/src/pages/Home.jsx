import React from 'react';
import { Search, Tractor, Users, Link as LinkIcon } from 'lucide-react';
import '../assets/scss/layout/_home.scss';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Welcome to <span className="highlight">AgriTech</span></h1>
          <p>Rent tractors, hire labor, and maximize your farm's productivity today.</p>
          
          <div className="search-bar">
            <Search color="#6B7280" />
            <input type="text" placeholder="Search for Harvesters, Tractors..." />
            <button className="btn-primary">Search</button>
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="services container">
        <h2>Quick Services</h2>
        <div className="service-grid">
          <div className="service-card">
            <div className="icon-wrap bg-green">
              <Tractor size={40} color="#2E7D32" />
            </div>
            <h3>Rent Machinery</h3>
            <p>Book tractors & harvesters on demand</p>
          </div>
          
          <div className="service-card">
            <div className="icon-wrap bg-gold">
              <Users size={40} color="#F57F17" />
            </div>
            <h3>Hire Labor</h3>
            <p>Find skilled hands for your next harvest</p>
          </div>

          <div className="service-card">
            <div className="icon-wrap bg-blue">
              <LinkIcon size={40} color="#1D4ED8" />
            </div>
            <h3>List Equipment</h3>
            <p>Earn money renting out your idle tools</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
