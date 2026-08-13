import React from 'react';
import { X, Printer, CheckCircle } from 'lucide-react';
import { SERVICE_TYPES } from '../types/queue';
import { formatTimeHHMM } from '../utils/timeUtils';

export function TicketModal({ customer, onClose }) {
  if (!customer) return null;

  const service = SERVICE_TYPES.find(s => s.id === customer.serviceType) || SERVICE_TYPES[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay ticket-modal-overlay" onClick={onClose}>
      <div 
        className="ticket-container" 
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative' }}
      >
        <button 
          className="modal-close" 
          onClick={onClose}
          style={{ position: 'absolute', right: '1rem', top: '1rem', color: '#64748b' }}
          aria-label="Close ticket"
        >
          <X size={20} />
        </button>

        <div className="ticket-header">
          <div style={{ display: 'inline-flex', padding: 8, background: '#e0f2fe', borderRadius: '50%', color: '#0284c7', marginBottom: 8 }}>
            <CheckCircle size={24} />
          </div>
          <h2>Service Desk Ticket</h2>
          <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Please keep this ticket with you</p>
        </div>

        <div className="ticket-token">
          {customer.tokenNumber}
        </div>

        <div className="ticket-details">
          <p><strong>Customer:</strong> {customer.name}</p>
          <p><strong>Service:</strong> {service.name}</p>
          <p><strong>Issued At:</strong> {formatTimeHHMM(customer.createdAt)}</p>
        </div>

        <div className="ticket-actions" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button className="btn btn-secondary" onClick={onClose} style={{ color: '#0f172a', borderColor: '#cbd5e1' }}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handlePrint}>
            <Printer size={16} />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
