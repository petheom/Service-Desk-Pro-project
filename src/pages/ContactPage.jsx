import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="page-container content-page">
      <div className="page-header">
        <div className="brand-icon">
          <Phone size={24} />
        </div>
        <div>
          <h1>Contact Service Center</h1>
          <p>Direct contact channels for our service desk and customer support team.</p>
        </div>
      </div>

      <div className="contact-grid" style={{ gridTemplateColumns: '1fr' }}>
        {/* Info Card */}
        <div className="contact-info-card" style={{ maxWidth: 800, margin: '0 auto', width: '100%' }}>
          <h2>Service Center Direct Info</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div className="info-item">
              <MapPin size={22} className="info-icon" />
              <div>
                <strong>Shop Address</strong>
                <p>124 Service Plaza, Suite 400, Tech City</p>
              </div>
            </div>

            <div className="info-item">
              <Phone size={22} className="info-icon" />
              <div>
                <strong>Phone Support</strong>
                <p>+1 (800) 555-QFLOW</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>+1 (800) 555-7378</p>
              </div>
            </div>

            <div className="info-item">
              <Mail size={22} className="info-icon" />
              <div>
                <strong>Email Desk</strong>
                <p>support@qflow-service.com</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>desk@qflow-service.com</p>
              </div>
            </div>

            <div className="info-item">
              <Clock size={22} className="info-icon" />
              <div>
                <strong>Operating Hours</strong>
                <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
