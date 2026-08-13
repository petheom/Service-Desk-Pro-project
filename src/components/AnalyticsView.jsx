import React from 'react';
import { TrendingUp, Clock, CheckCircle2, AlertTriangle, Activity } from 'lucide-react';
import { SERVICE_TYPES } from '../types/queue';

export function AnalyticsView({ customers = [], counters = { waiting: 0, serving: 0, completed: 0 } }) {
  const total = customers.length;
  const waiting = counters.waiting;
  const serving = counters.serving;
  const completed = counters.completed;

  // Completion rate percentage
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Breakdown by priority (VIP, HIGH, NORMAL)
  const vipCount = customers.filter(c => c.priority === 'vip').length;
  const highPriorityCount = customers.filter(c => c.priority === 'high' || c.priority === 'vip').length;
  const medPriorityCount = customers.filter(c => c.priority === 'normal' || !c.priority).length;
  const lowPriorityCount = customers.filter(c => c.priority === 'low').length;

  // Breakdown by service department name
  const serviceCounts = customers.reduce((acc, c) => {
    const foundService = SERVICE_TYPES.find(s => s.id === c.serviceType);
    const name = foundService ? foundService.name : c.serviceType || 'General Service';
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  const serviceKeys = Object.keys(serviceCounts);

  return (
    <div className="analytics-view-container">
      <div className="analytics-header">
        <div className="analytics-title">
          <Activity size={22} className="text-primary" />
          <div>
            <h2>Service Desk Operational Analytics</h2>
            <p>Real-time telemetry and throughput metrics across all counters.</p>
          </div>
        </div>
        <div className="analytics-badge">
          <span className="live-dot"></span>
          <span>LIVE METRICS</span>
        </div>
      </div>

      {/* Stats KPI Row */}
      <div className="analytics-kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
            <TrendingUp size={22} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Completion Velocity</span>
            <span className="kpi-value">{completionRate}%</span>
            <span className="kpi-sub">{completed} of {total} tickets done</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
            <Clock size={22} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Avg Wait Estimate</span>
            <span className="kpi-value">~{waiting * 4} mins</span>
            <span className="kpi-sub">Based on current queue depth</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
            <CheckCircle2 size={22} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Active Serving Rate</span>
            <span className="kpi-value">{serving} counters</span>
            <span className="kpi-sub">Out of 4 counters active</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
            <AlertTriangle size={22} />
          </div>
          <div className="kpi-info">
            <span className="kpi-label">Priority Load</span>
            <span className="kpi-value">{highPriorityCount} tickets</span>
            <span className="kpi-sub">VIP & High Priority Queue</span>
          </div>
        </div>
      </div>

      {/* Detailed Telemetry Breakdown Grids */}
      <div className="analytics-details-grid">
        {/* Priority Breakdown Bar Chart Visual */}
        <div className="analytics-card">
          <h3>Queue Load by Priority</h3>
          <div className="priority-bars">
            <div className="bar-group">
              <div className="bar-label-row">
                <span className="priority-tag priority-high">HIGH / VIP ({vipCount} VIP)</span>
                <span>{highPriorityCount} tickets ({total > 0 ? Math.round((highPriorityCount / total) * 100) : 0}%)</span>
              </div>
              <div className="bar-track">
                <div 
                  className="bar-fill high-fill" 
                  style={{ width: `${total > 0 ? (highPriorityCount / total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            <div className="bar-group">
              <div className="bar-label-row">
                <span className="priority-tag priority-medium">STANDARD</span>
                <span>{medPriorityCount} tickets ({total > 0 ? Math.round((medPriorityCount / total) * 100) : 0}%)</span>
              </div>
              <div className="bar-track">
                <div 
                  className="bar-fill med-fill" 
                  style={{ width: `${total > 0 ? (medPriorityCount / total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            {lowPriorityCount > 0 && (
              <div className="bar-group">
                <div className="bar-label-row">
                  <span className="priority-tag priority-low">LOW</span>
                  <span>{lowPriorityCount} tickets ({total > 0 ? Math.round((lowPriorityCount / total) * 100) : 0}%)</span>
                </div>
                <div className="bar-track">
                  <div 
                    className="bar-fill low-fill" 
                    style={{ width: `${total > 0 ? (lowPriorityCount / total) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Service Department Load */}
        <div className="analytics-card">
          <h3>Service Department Distribution</h3>
          <div className="department-list">
            {serviceKeys.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No ticket distribution data available.</p>
            ) : (
              serviceKeys.map(s => {
                const count = serviceCounts[s];
                const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={s} className="dept-item">
                    <div className="dept-info">
                      <span className="dept-name">{s}</span>
                      <span className="dept-count">{count} tickets ({pct}%)</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill dept-fill" style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
