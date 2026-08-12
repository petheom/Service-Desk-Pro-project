import React, { useState } from 'react';
import { X, LogIn, Lock, User, ShieldCheck } from 'lucide-react';

export function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('operator');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg(`Logged in successfully as ${role.toUpperCase()}!`);
    setTimeout(() => {
      onLoginSuccess({ username: username || 'Operator', role });
      onClose();
      setSuccessMsg('');
    }, 1000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 420 }}>
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
              <LogIn size={20} />
            </div>
            <h2>Staff Portal Login</h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {successMsg && (
              <div style={{ 
                padding: '0.75rem', 
                borderRadius: '8px', 
                background: 'rgba(16, 185, 129, 0.15)', 
                color: '#34d399', 
                border: '1px solid rgba(16, 185, 129, 0.3)',
                fontSize: '0.875rem',
                textAlign: 'center'
              }}>
                {successMsg}
              </div>
            )}

            <div className="form-group">
              <label>Staff Role</label>
              <select className="form-control" value={role} onChange={e => setRole(e.target.value)}>
                <option value="operator">Desk Operator</option>
                <option value="manager">Service Desk Manager</option>
                <option value="admin">System Administrator</option>
              </select>
            </div>

            <div className="form-group">
              <label>Username / Staff ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. operator_01"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <ShieldCheck size={16} />
              <span>Sign In</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
