import React, { useState } from 'react';
import { 
  Wrench, 
  CreditCard, 
  Star, 
  Zap, 
  Clock, 
  ShieldCheck, 
  Check, 
  Calculator, 
  ArrowRight,
  Headphones
} from 'lucide-react';

export function ServicesPage({ onLaunchDashboard }) {
  const [selectedService, setSelectedService] = useState('technical');
  const [estimatedQueueLength, setEstimatedQueueLength] = useState(5);

  // SLA calculations based on inputs
  const serviceSLAs = {
    technical: { title: 'Technical Hardware & Software Repair', avgPerCustomer: 12, maxSla: 20 },
    billing: { title: 'Account & Payment Processing Desk', avgPerCustomer: 5, maxSla: 10 },
    vip: { title: 'VIP Expedited Enterprise Service Desk', avgPerCustomer: 4, maxSla: 8 },
    express: { title: 'Express Pickup & Return Counter', avgPerCustomer: 3, maxSla: 6 },
  };

  const currentConfig = serviceSLAs[selectedService];
  const estimatedWait = estimatedQueueLength * currentConfig.avgPerCustomer;

  return (
    <div className="page-container services-page">
      {/* Header */}
      <div className="services-hero">
        <div className="hero-badge">
          <Zap size={14} />
          <span>Enterprise Service Catalog & Guarantees</span>
        </div>
        <h1>Our Service Desks & Response SLAs</h1>
        <p>
          Discover our specialized customer desk channels, transparent service SLAs, and calculate 
          your estimated wait time in real-time.
        </p>
      </div>

      {/* Interactive SLA Wait Estimator Tool */}
      <div className="sla-calculator-card">
        <div className="calculator-header">
          <div className="calc-icon-box">
            <Calculator size={24} />
          </div>
          <div>
            <h2>Interactive Wait-Time SLA Estimator</h2>
            <p>Select a desk category and current queue length to calculate estimated wait times.</p>
          </div>
        </div>

        <div className="calculator-grid">
          <div className="calc-controls">
            <div className="form-group">
              <label>Select Service Department:</label>
              <select 
                value={selectedService} 
                onChange={(e) => setSelectedService(e.target.value)}
                className="input-select"
              >
                <option value="technical">Technical Repair & Support Desk</option>
                <option value="billing">Account & Billing Counter</option>
                <option value="vip">VIP Enterprise Desk</option>
                <option value="express">Express Pickup Counter</option>
              </select>
            </div>

            <div className="form-group">
              <label>Estimated Customers Ahead ({estimatedQueueLength}):</label>
              <input 
                type="range" 
                min="1" 
                max="25" 
                value={estimatedQueueLength}
                onChange={(e) => setEstimatedQueueLength(parseInt(e.target.value))}
                className="range-slider"
              />
              <div className="range-labels">
                <span>1 customer</span>
                <span>15 customers</span>
                <span>25 customers</span>
              </div>
            </div>
          </div>

          <div className="calc-results-card">
            <div className="result-stat">
              <span className="stat-label">Estimated Turn Wait Time</span>
              <span className="stat-value text-primary">~{estimatedWait} mins</span>
            </div>
            
            <div className="result-divider"></div>

            <div className="result-detail-row">
              <Clock size={16} />
              <span>Average Handling Time: <strong>{currentConfig.avgPerCustomer} mins/customer</strong></span>
            </div>

            <div className="result-detail-row">
              <ShieldCheck size={16} style={{ color: 'var(--success)' }} />
              <span>SLA Target Commitment: <strong>Under {estimatedWait + currentConfig.maxSla} mins</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Service Catalog Cards */}
      <div className="services-catalog-section">
        <h2 className="section-title">Specialized Counter Services</h2>
        <div className="services-grid">
          
          <div className="service-card">
            <div className="service-card-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
              <Wrench size={26} />
            </div>
            <h3>Hardware & Repair Desk</h3>
            <p>Diagnostic evaluation, component replacements, warranty processing, and device check-in.</p>
            <ul className="service-features">
              <li><Check size={14} /> Full diagnostic ticket generation</li>
              <li><Check size={14} /> Real-time status SMS updates</li>
              <li><Check size={14} /> Certified tech technicians</li>
            </ul>
          </div>

          <div className="service-card">
            <div className="service-card-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
              <CreditCard size={26} />
            </div>
            <h3>Account & Payment Desk</h3>
            <p>Billing queries, invoice settlements, refund handling, and plan subscriptions.</p>
            <ul className="service-features">
              <li><Check size={14} /> Rapid 5-minute transaction SLA</li>
              <li><Check size={14} /> Instant digital receipts</li>
              <li><Check size={14} /> Multi-currency support</li>
            </ul>
          </div>

          <div className="service-card">
            <div className="service-card-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
              <Star size={26} />
            </div>
            <h3>VIP Enterprise Desk</h3>
            <p>Dedicated priority counter for enterprise contract clients and VIP pass holders.</p>
            <ul className="service-features">
              <li><Check size={14} /> Zero-wait priority queue jump</li>
              <li><Check size={14} /> Dedicated senior concierge desk</li>
              <li><Check size={14} /> Private lounge access</li>
            </ul>
          </div>

          <div className="service-card">
            <div className="service-card-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
              <Headphones size={26} />
            </div>
            <h3>General Support & Consultation</h3>
            <p>Customer inquiries, general assistance, advisory consultations, and feedback collection.</p>
            <ul className="service-features">
              <li><Check size={14} /> Multi-language assistance</li>
              <li><Check size={14} /> Virtual ticket booking</li>
              <li><Check size={14} /> SLA feedback tracking</li>
            </ul>
          </div>

        </div>
      </div>

      {/* CTA Box */}
      <div className="services-cta-banner">
        <div>
          <h2>Ready to test our live queue board?</h2>
          <p>Experience zero-latency ticket movement across Waiting, Serving, and Completed lanes.</p>
        </div>
        <button className="btn btn-primary btn-hero" onClick={onLaunchDashboard}>
          <span>Launch Desk Dashboard</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
