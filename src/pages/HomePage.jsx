import React from 'react';
import { ArrowRight, Clock, Users, CheckCircle2, ShieldCheck, Zap, Ticket, Sparkles } from 'lucide-react';

export function HomePage({ onLaunchDashboard, onOpenContact }) {
  return (
    <div className="page-container home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <Sparkles size={14} />
          <span>Smart Queue Management System</span>
        </div>
        <h1 className="hero-title">
          Streamline Customer Service & <br />
          <span className="hero-gradient-text">Eliminate Waiting Frustration</span>
        </h1>
        <p className="hero-description">
          Empower your shop or service desk with real-time queue tracking. Effortlessly manage 
          customer status from Waiting to Serving to Completed with dynamic wait timers and instant search.
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary btn-hero" onClick={onLaunchDashboard}>
            <span>Launch Service Dashboard</span>
            <ArrowRight size={18} />
          </button>
          <button className="btn btn-secondary btn-hero" onClick={onOpenContact}>
            <span>Contact Support Desk</span>
          </button>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="features-section">
        <h2 className="section-title">Everything Needed for Modern Service Desks</h2>
        
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
            <p>Generate clean, printable token tickets with token IDs (`T-101`) to hand out to waiting customers.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-box" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
              <ShieldCheck size={24} />
            </div>
            <h3>Persistent Storage</h3>
            <p>Your queue data automatically saves in local storage so refreshing the browser never loses added members.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
