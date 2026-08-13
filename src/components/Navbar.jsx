import React from 'react';
import { Users, Home, Info, Phone, Monitor, Briefcase, LayoutDashboard, Sparkles } from 'lucide-react';

export function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="top-navbar">
      {/* Brand / Logo */}
      <div 
        className="nav-brand" 
        onClick={() => setActiveTab('home')} 
        title="Q-Flow Service Portal"
        style={{ cursor: 'pointer' }}
      >
        <div className="brand-icon">
          <Users size={22} />
        </div>
        <div className="brand-text">
          <h1>Q-Flow</h1>
          <span className="brand-sub-badge">PRO SYSTEM</span>
        </div>
      </div>

      {/* Primary Nav Links */}
      <div className="nav-links">
        <button
          className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <Home size={16} />
          <span>Home</span>
        </button>

        <button
          className={`nav-link ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          <Briefcase size={16} />
          <span>Services & SLAs</span>
        </button>

        <button
          className={`nav-link ${activeTab === 'kiosk' ? 'active' : ''}`}
          onClick={() => setActiveTab('kiosk')}
        >
          <Monitor size={16} />
          <span>Lobby Tracker</span>
          <span className="live-nav-badge">LIVE</span>
        </button>

        <button
          className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <Info size={16} />
          <span>About</span>
        </button>

        <button
          className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          <Phone size={16} />
          <span>Contact</span>
        </button>
      </div>

      {/* CTA Button to Operator Desk */}
      <div className="nav-cta-container">
        <button
          className={`btn btn-primary nav-cta-btn ${activeTab === 'dashboard' ? 'active-cta' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard size={16} />
          <span>Operator Desk</span>
        </button>
      </div>
    </nav>
  );
}
