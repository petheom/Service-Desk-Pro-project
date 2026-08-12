import React, { useState, useEffect } from 'react';
import { Users, Plus, RefreshCw, Clock, Volume2, VolumeX, Sparkles } from 'lucide-react';

export function Header({ onOpenAddModal, onResetDemo, rawCustomersCount }) {
  const [time, setTime] = useState(new Date());
  const [audioEnabled, setAudioEnabled] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const formattedDate = time.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="app-header">
      <div className="brand-section">
        <div className="brand-icon">
          <Users size={24} />
        </div>
        <div className="brand-text">
          <h1>
            Q-Flow Hub
            <span className="brand-badge">Service Desk</span>
          </h1>
          <p>Real-Time Customer Queue & Service Center</p>
        </div>
      </div>

      <div className="header-actions">
        <div className="time-pill">
          <div className="live-dot" />
          <Clock size={14} />
          <span>{formattedDate} • {formattedTime}</span>
        </div>

        <button 
          className="btn btn-secondary"
          onClick={onResetDemo}
          title="Clear all queue items"
        >
          <RefreshCw size={16} />
          <span>Clear Queue</span>
        </button>



        <button 
          className="btn btn-primary"
          onClick={onOpenAddModal}
        >
          <Plus size={18} />
          <span>Add New Customer</span>
        </button>
      </div>
    </header>
  );
}
