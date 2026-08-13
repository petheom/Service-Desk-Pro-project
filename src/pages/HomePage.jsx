import React from 'react';
import { ArrowRight, Clock, Users, ShieldCheck, Zap, Ticket, Sparkles, Monitor, Briefcase, LayoutDashboard } from 'lucide-react';

export function HomePage({ onNavigate, counters = { waiting: 0, serving: 0, completed: 0 } }) {
  return (
    <div className="page-container home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <Sparkles size={14} />
          <span>Professional Service Desk & Queue Suite</span>
        </div>
        <h1 className="hero-title">
          Streamline Counter Service & <br />
          <span className="hero-gradient-text">Eliminate Waiting Frustration</span>
        </h1>
        <p className="hero-description">
          Empower your service counters with real-time queue tracking, public lobby TV displays, 
          self-service customer ticket tracking, and automated SLA timers.
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary btn-hero" onClick={() => onNavigate('dashboard')}>
            <LayoutDashboard size={18} />
            <span>Launch Operator Desk</span>
            <ArrowRight size={18} />
          </button>
          
          <button className="btn btn-secondary btn-hero" onClick={() => onNavigate('kiosk')}>
            <Monitor size={18} />
            <span>Open Public Lobby Tracker</span>
          </button>
        </div>
      </section>

      {/* Live Operational Counters Teaser */}
      <div className="home-stats-banner">
        <div className="stat-pill">
          <div className="stat-number">{counters.waiting}</div>
          <div className="stat-label">Currently Waiting</div>
        </div>

        <div className="stat-pill">
          <div className="stat-number text-warning">{counters.serving}</div>
          <div className="stat-label">Now Serving</div>
        </div>

        <div className="stat-pill">
          <div className="stat-number text-success">{counters.completed}</div>
          <div className="stat-label">Completed Today</div>
        </div>
      </div>

      {/* Portal Cards Grid (3 Websites in 1 Suite) */}
      <section className="portal-showcase-section">
        <h2 className="section-title">Explore Our Integrated 3-Portal Ecosystem</h2>
        
        <div className="portals-grid">
          
          {/* Card 1: Operator Desk */}
          <div className="portal-card" onClick={() => onNavigate('dashboard')}>
            <div className="portal-card-badge">Desk Staff View</div>
            <div className="portal-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
              <LayoutDashboard size={28} />
            </div>
            <h3>Operator Queue Management</h3>
            <p>Full Kanban & table view for staff to call next customers, transfer counters, print tickets, and complete service.</p>
            <div className="portal-link">
              <span>Open Operator Desk</span>
              <ArrowRight size={16} />
            </div>
          </div>

          {/* Card 2: Public Lobby Tracker */}
          <div className="portal-card" onClick={() => onNavigate('kiosk')}>
            <div className="portal-card-badge highlight">Customer Public View</div>
            <div className="portal-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
              <Monitor size={28} />
            </div>
            <h3>Public Lobby & Ticket Kiosk</h3>
            <p>HD TV board for lobby display screen + self-service ticket tracker for customers to check their turn position live.</p>
            <div className="portal-link">
              <span>Launch Lobby Tracker</span>
              <ArrowRight size={16} />
            </div>
          </div>

          {/* Card 3: Services & SLA Pricing */}
          <div className="portal-card" onClick={() => onNavigate('services')}>
            <div className="portal-card-badge">Enterprise Catalog</div>
            <div className="portal-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
              <Briefcase size={28} />
            </div>
            <h3>Services & Wait SLA Calculator</h3>
            <p>Comprehensive catalog of hardware, billing, and VIP service desks with an interactive SLA response calculator.</p>
            <div className="portal-link">
              <span>Explore Services & SLAs</span>
              <ArrowRight size={16} />
            </div>
          </div>

        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="features-section">
        <h2 className="section-title">Built for Enterprise Reliability</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-box" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
              <Clock size={24} />
            </div>
            <h3>Real-Time Wait Counters</h3>
            <p>Track waiting and serving times down to the second so staff can prioritize long-waiting customers.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
              <Users size={24} />
            </div>
            <h3>3-Lane Status Management</h3>
            <p>Organize customers smoothly across Waiting, Serving, and Completed lanes with one-click status transitions.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
              <Ticket size={24} />
            </div>
            <h3>Printable Service Tickets</h3>
            <p>Generate clean, printable token tickets with token IDs (<code>T-101</code>) to hand out to waiting customers.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
              <ShieldCheck size={24} />
            </div>
            <h3>Persistent Sync</h3>
            <p>Your queue state automatically saves in local storage so refreshing the browser never loses added members.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
