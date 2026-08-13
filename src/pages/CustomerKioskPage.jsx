import React, { useState } from 'react';
import { Search, Clock, Users, Monitor, Ticket, CheckCircle2, AlertCircle, ArrowRight, Volume2 } from 'lucide-react';
import { STATUSES, SERVICE_TYPES, PRIORITIES } from '../types/queue';

export function CustomerKioskPage({ customers = [], now }) {
  const [searchToken, setSearchToken] = useState('');
  const [trackedCustomer, setTrackedCustomer] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Helper to get service name
  const getServiceName = (serviceTypeId) => {
    const s = SERVICE_TYPES.find(item => item.id === serviceTypeId);
    return s ? s.name : serviceTypeId || 'General Desk';
  };

  // Helper to get priority label
  const getPriorityLabel = (priorityKey) => {
    if (!priorityKey) return 'Standard';
    const key = priorityKey.toUpperCase();
    return PRIORITIES[key]?.label || priorityKey.toUpperCase();
  };

  // Group customers by status for TV Board
  const servingList = customers.filter(c => c.status === STATUSES.SERVING);
  const waitingList = customers.filter(c => c.status === STATUSES.WAITING);
  const completedList = customers.filter(c => c.status === STATUSES.COMPLETED).slice(0, 5);

  const handleTrackSearch = (e) => {
    if (e) e.preventDefault();
    setHasSearched(true);
    if (!searchToken.trim()) {
      setTrackedCustomer(null);
      return;
    }

    const query = searchToken.trim().toLowerCase();
    const found = customers.find(c => {
      const token = (c.tokenNumber || '').toLowerCase();
      const name = (c.name || '').toLowerCase();
      return token.includes(query) || name.includes(query);
    });
    setTrackedCustomer(found || null);
  };

  // Calculate position in queue for tracked customer
  const getQueuePosition = (customer) => {
    if (!customer) return null;
    if (customer.status === STATUSES.SERVING) return 'Now Being Served';
    if (customer.status === STATUSES.COMPLETED) return 'Completed';

    const index = waitingList.findIndex(c => c.id === customer.id);
    if (index === -1) return 'N/A';
    return index + 1; // 1-indexed position
  };

  const handleQuickClickToken = (token) => {
    setSearchToken(token);
    setHasSearched(true);
    const query = token.toLowerCase();
    const found = customers.find(c => (c.tokenNumber || '').toLowerCase().includes(query));
    setTrackedCustomer(found || null);
  };

  return (
    <div className="page-container kiosk-page">
      {/* Top Banner / Hero */}
      <div className="kiosk-header">
        <div className="kiosk-badge">
          <Monitor size={14} />
          <span>Public Customer Kiosk & Live Display</span>
        </div>
        <h1>Customer Service Queue Portal</h1>
        <p>
          View live lobby status board or enter your token number below to track your turn in real time.
        </p>
      </div>

      {/* Ticket Tracker Input Section */}
      <div className="tracker-card">
        <div className="tracker-card-header">
          <Ticket size={22} className="tracker-icon" />
          <div>
            <h2>Track My Ticket Status</h2>
            <p>Enter your Ticket Token ID (e.g. <code>T-101</code>) or your registered name</p>
          </div>
        </div>

        <form onSubmit={handleTrackSearch} className="tracker-form">
          <div className="tracker-input-wrapper">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Enter Token ID (e.g. T-101) or Name..."
              value={searchToken}
              onChange={(e) => {
                const val = e.target.value;
                setSearchToken(val);
                if (val.trim()) {
                  const query = val.trim().toLowerCase();
                  const found = customers.find(c => 
                    (c.tokenNumber || '').toLowerCase().includes(query) || 
                    (c.name || '').toLowerCase().includes(query)
                  );
                  setTrackedCustomer(found || null);
                  setHasSearched(true);
                } else {
                  setTrackedCustomer(null);
                  setHasSearched(false);
                }
              }}
              className="tracker-input"
            />
            <button type="submit" className="btn btn-primary btn-track">
              <span>Track Ticket</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>

        {/* Sample tokens hint if customers exist */}
        {customers.length > 0 && !hasSearched && (
          <div style={{ marginTop: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <span>Quick sample tokens in queue:</span>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {customers.slice(0, 4).map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleQuickClickToken(c.tokenNumber)}
                  style={{
                    padding: '2px 8px',
                    background: 'rgba(59, 130, 246, 0.15)',
                    color: 'var(--primary)',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}
                >
                  {c.tokenNumber} ({c.name})
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Result Box */}
        {hasSearched && trackedCustomer && (
          <div className="tracked-result-box found">
            <div className="result-header">
              <div className="token-badge">{trackedCustomer.tokenNumber}</div>
              <div className={`status-pill status-${trackedCustomer.status}`}>
                {trackedCustomer.status.toUpperCase()}
              </div>
            </div>

            <div className="result-body">
              <h3>{trackedCustomer.name}</h3>
              <p className="service-type">
                <strong>Service Desk:</strong> {getServiceName(trackedCustomer.serviceType)}
              </p>

              <div className="result-metrics">
                <div className="metric-box">
                  <span className="metric-label">Queue Position</span>
                  <span className="metric-value">
                    {getQueuePosition(trackedCustomer) === 'Now Being Served' ? (
                      <span className="status-serving-text">Desk #{trackedCustomer.counterNumber || 1}</span>
                    ) : getQueuePosition(trackedCustomer) === 'Completed' ? (
                      <span className="status-completed-text">Finished</span>
                    ) : (
                      `#${getQueuePosition(trackedCustomer)} in line`
                    )}
                  </span>
                </div>

                <div className="metric-box">
                  <span className="metric-label">Assigned Desk</span>
                  <span className="metric-value">Counter #{trackedCustomer.counterNumber || 1}</span>
                </div>

                <div className="metric-box">
                  <span className="metric-label">Priority Level</span>
                  <span className={`priority-tag priority-${trackedCustomer.priority}`}>
                    {getPriorityLabel(trackedCustomer.priority)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {hasSearched && !trackedCustomer && (
          <div className="tracked-result-box not-found">
            <AlertCircle size={24} style={{ color: 'var(--warning)' }} />
            <div>
              <h4>Ticket Not Found</h4>
              <p>No active ticket matches "<strong>{searchToken}</strong>". Please check your ticket token number or ask counter staff.</p>
            </div>
          </div>
        )}
      </div>

      {/* Main Lobby TV Display Screen */}
      <div className="tv-board-section">
        <div className="tv-board-header">
          <div className="tv-header-title">
            <Volume2 size={20} className="tv-icon" />
            <h2>Live Lobby Display Monitor</h2>
          </div>
          <div className="live-indicator">
            <span className="live-dot"></span>
            <span>LIVE SYNC</span>
          </div>
        </div>

        <div className="tv-board-grid">
          {/* NOW SERVING LANE */}
          <div className="tv-column serving-column">
            <div className="tv-column-header">
              <span className="pulse-icon"></span>
              <h3>NOW SERVING</h3>
              <span className="count-pill">{servingList.length}</span>
            </div>

            <div className="tv-cards-container">
              {servingList.length === 0 ? (
                <div className="tv-empty-state">
                  <Clock size={32} />
                  <p>No customer currently at counters</p>
                </div>
              ) : (
                servingList.map(c => (
                  <div key={c.id} className="tv-ticket-card serving-card">
                    <div className="tv-ticket-top">
                      <span className="tv-token-big">{c.tokenNumber}</span>
                      <span className="tv-counter-badge">Counter #{c.counterNumber || 1}</span>
                    </div>
                    <div className="tv-ticket-bottom">
                      <span className="tv-customer-name">{c.name}</span>
                      <span className="tv-service-tag">{getServiceName(c.serviceType)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* NEXT UP / WAITING LANE */}
          <div className="tv-column waiting-column">
            <div className="tv-column-header">
              <Users size={18} />
              <h3>WAITING IN LINE</h3>
              <span className="count-pill">{waitingList.length}</span>
            </div>

            <div className="tv-cards-container">
              {waitingList.length === 0 ? (
                <div className="tv-empty-state">
                  <CheckCircle2 size={32} style={{ color: 'var(--success)' }} />
                  <p>Queue is empty! All clear.</p>
                </div>
              ) : (
                waitingList.map((c, idx) => (
                  <div key={c.id} className="tv-ticket-card waiting-card">
                    <div className="tv-ticket-top">
                      <span className="tv-queue-num">#{idx + 1}</span>
                      <span className="tv-token">{c.tokenNumber}</span>
                    </div>
                    <div className="tv-ticket-bottom">
                      <span className="tv-customer-name">{c.name}</span>
                      <span className="tv-service-tag">{getServiceName(c.serviceType)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RECENTLY COMPLETED */}
          <div className="tv-column completed-column">
            <div className="tv-column-header">
              <CheckCircle2 size={18} />
              <h3>RECENTLY SERVED</h3>
              <span className="count-pill">{completedList.length}</span>
            </div>

            <div className="tv-cards-container">
              {completedList.length === 0 ? (
                <div className="tv-empty-state">
                  <p>No completed tickets yet</p>
                </div>
              ) : (
                completedList.map(c => (
                  <div key={c.id} className="tv-ticket-card completed-card">
                    <span className="tv-token-sm">{c.tokenNumber}</span>
                    <span className="tv-name-sm">{c.name}</span>
                    <span className="tv-done-badge">Completed</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
