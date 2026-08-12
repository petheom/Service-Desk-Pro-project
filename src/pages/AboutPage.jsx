import React from 'react';
import { Info, CheckCircle, Award, Users, Cpu } from 'lucide-react';

export function AboutPage({ onLaunchDashboard }) {
  return (
    <div className="page-container content-page">
      <div className="page-header">
        <div className="brand-icon">
          <Info size={24} />
        </div>
        <div>
          <h1>About Q-Flow Service System</h1>
          <p>Designed for shops, repair hubs, customer support desks, and service centers.</p>
        </div>
      </div>

      <div className="about-content-grid">
        <div className="about-card">
          <h2>Mission & Vision</h2>
          <p>
            Q-Flow is engineered to deliver a seamless service desk experience. It eliminates physical line crowding, 
            gives clear visibility to queue operators, and ensures zero lost customer records.
          </p>
        </div>

        <div className="about-card">
          <h2>Key Capabilities</h2>
          <ul className="about-list">
            <li><CheckCircle size={16} style={{ color: '#10b981' }} /> Instant customer token generation with custom priorities.</li>
            <li><CheckCircle size={16} style={{ color: '#10b981' }} /> 1-click status transitions (Waiting → Serving → Completed).</li>
            <li><CheckCircle size={16} style={{ color: '#10b981' }} /> Fast search by token number or customer name.</li>
            <li><CheckCircle size={16} style={{ color: '#10b981' }} /> Local Storage sync for reliable persistence on browser refresh.</li>
            <li><CheckCircle size={16} style={{ color: '#10b981' }} /> Responsive design for desktop, tablet, and mobile kiosks.</li>
          </ul>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button className="btn btn-primary btn-hero" onClick={onLaunchDashboard}>
          <span>Open Dashboard Now</span>
        </button>
      </div>
    </div>
  );
}
