import React from 'react';
import { Users, Home, Info, Phone } from 'lucide-react';

export function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="top-navbar">
      {/* Brand / Logo (Clicking takes user to Home) */}
      <div 
        className="nav-brand" 
        onClick={() => setActiveTab('home')} 
        title="Go to Home Page"
        style={{ cursor: 'pointer' }}
      >
        <div className="brand-icon">
          <Users size={22} />
        </div>
        <div className="brand-text">
          <h1>Q-Flow</h1>
        </div>
      </div>

      {/* Nav Links (Home, About, Contact) */}
      <div className="nav-links">
        <button
          className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <Home size={16} />
          <span>Home</span>
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
    </nav>
  );
}
