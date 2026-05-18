import React from 'react';
import { Search, Tractor, Users, PenTool, ArrowRight, ShieldCheck, Clock, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../assets/scss/layout/_home.scss';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <span className="hero-badge">🌿 Empowering Indian Farmers</span>
          <h1>Welcome to <span className="highlight">AgriTech</span></h1>
          <p>Rent heavy machinery, hire skilled labor, and share your farming tools seamlessly to maximize your yield.</p>
          
          <div className="search-bar">
            <Search color="#6B7280" />
            <input type="text" placeholder="Search for Harvesters, Tractors, or Labour..." />
            <Link to="/machinery" className="btn-primary" style={{textDecoration:'none', display:'flex', alignItems:'center', justifyContent:'center'}}>Search</Link>
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="services container">
        <div className="section-header">
          <h2>Our Core Services</h2>
          <p>Everything you need for a successful farming season in one place.</p>
        </div>
        <div className="service-grid">
          <Link to="/machinery" className="service-card link-card">
            <div className="icon-wrap bg-green">
              <Tractor size={40} color="#2E7D32" />
            </div>
            <h3>Heavy Machinery</h3>
            <p>Book tractors & harvesters on an hourly basis.</p>
            <span className="card-action">Explore <ArrowRight size={16} /></span>
          </Link>
          
          <Link to="/tools" className="service-card link-card">
            <div className="icon-wrap bg-blue">
              <PenTool size={40} color="#1D4ED8" />
            </div>
            <h3>Farm Tools</h3>
            <p>Rent water pumps, pipes, and small equipment daily.</p>
            <span className="card-action">Explore <ArrowRight size={16} /></span>
          </Link>

          <Link to="/labor" className="service-card link-card">
            <div className="icon-wrap bg-gold">
              <Users size={40} color="#F57F17" />
            </div>
            <h3>Hire Labor</h3>
            <p>Find skilled hands instantly for your farm work.</p>
            <span className="card-action">Explore <ArrowRight size={16} /></span>
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose AgriTech?</h2>
            <p>We bridge the gap between technology and traditional farming.</p>
          </div>
          <div className="features-grid">
            <div className="feature-item feat-blue">
              <ShieldCheck size={48} color="#1D4ED8" />
              <h4>Verified Users</h4>
              <p>All service providers and laborers are verified to ensure maximum trust and safety.</p>
            </div>
            <div className="feature-item feat-green">
              <Clock size={48} color="#2E7D32" />
              <h4>Save Time</h4>
              <p>No more searching village to village. Find what you need with just a few taps.</p>
            </div>
            <div className="feature-item feat-gold">
              <Coins size={48} color="#F57F17" />
              <h4>Extra Income</h4>
              <p>List your idle farming tools or machinery and earn extra money directly.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
