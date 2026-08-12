import React, { useState } from 'react';
import { X, UserPlus, Sparkles } from 'lucide-react';
import { SERVICE_TYPES } from '../types/queue';

export function AddCustomerModal({ isOpen, onClose, onAddCustomer }) {
  const [name, setName] = useState('');
  const [serviceType, setServiceType] = useState(SERVICE_TYPES[0].id);
  const [priority, setPriority] = useState('normal');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter customer name.');
      return;
    }

    onAddCustomer({
      name: name.trim(),
      serviceType,
      priority,
      notes: notes.trim()
    });

    // Reset form
    setName('');
    setServiceType(SERVICE_TYPES[0].id);
    setPriority('normal');
    setNotes('');
    setError('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div 
              style={{ 
                width: 36, 
                height: 36, 
                borderRadius: '8px', 
                background: 'rgba(59, 130, 246, 0.15)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--primary)'
              }}
            >
              <UserPlus size={20} />
            </div>
            <h2>Register New Customer</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div style={{ 
                padding: '0.75rem', 
                borderRadius: '8px', 
                background: 'rgba(239, 68, 68, 0.15)', 
                color: '#f87171', 
                border: '1px solid rgba(239, 68, 68, 0.3)',
                fontSize: '0.85rem'
              }}>
                {error}
              </div>
            )}

            {/* Customer Name */}
            <div className="form-group">
              <label htmlFor="customer-name">Customer Name *</label>
              <input
                id="customer-name"
                type="text"
                className="form-control"
                placeholder="e.g. John Doe"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                autoFocus
              />
            </div>

            {/* Service Type */}
            <div className="form-group">
              <label htmlFor="service-type">Service Required *</label>
              <select
                id="service-type"
                className="form-control"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
              >
                {SERVICE_TYPES.map(st => (
                  <option key={st.id} value={st.id}>
                    {st.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority Level */}
            <div className="form-group">
              <label htmlFor="priority-level">Priority Level</label>
              <select
                id="priority-level"
                className="form-control"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="normal">Standard Priority</option>
                <option value="high">High Priority</option>
                <option value="vip">⭐ VIP Customer</option>
              </select>
            </div>

            {/* Notes / Description */}
            <div className="form-group">
              <label htmlFor="notes">Notes / Special Instructions (Optional)</label>
              <input
                id="notes"
                type="text"
                className="form-control"
                placeholder="e.g. Laptop battery replacement"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Sparkles size={16} />
              <span>Issue Queue Token</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
