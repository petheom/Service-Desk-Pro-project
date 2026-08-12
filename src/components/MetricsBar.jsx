import React from 'react';
import { Clock, UserCheck, CheckCircle2, Users } from 'lucide-react';

export function MetricsBar({ counters }) {
  const { total, waiting, serving, completed, avgWaitMinutes } = counters;

  return (
    <div className="metrics-grid">
      {/* Waiting Card */}
      <div className="metric-card waiting">
        <div className="metric-info">
          <p>Waiting Queue</p>
          <div className="metric-value">{waiting}</div>
          <div className="metric-sub">
            {avgWaitMinutes > 0 ? `~${avgWaitMinutes} min avg wait` : 'No customers waiting'}
          </div>
        </div>
        <div className="metric-icon-wrapper">
          <Clock size={26} />
        </div>
      </div>

      {/* Serving Card */}
      <div className="metric-card serving">
        <div className="metric-info">
          <p>Currently Serving</p>
          <div className="metric-value">{serving}</div>
          <div className="metric-sub">Active at service counters</div>
        </div>
        <div className="metric-icon-wrapper">
          <UserCheck size={26} />
        </div>
      </div>

      {/* Completed Card */}
      <div className="metric-card completed">
        <div className="metric-info">
          <p>Completed</p>
          <div className="metric-value">{completed}</div>
          <div className="metric-sub">
            {total > 0 ? `${Math.round((completed / total) * 100)}% completion rate` : '0 completed today'}
          </div>
        </div>
        <div className="metric-icon-wrapper">
          <CheckCircle2 size={26} />
        </div>
      </div>

      {/* Total Card */}
      <div className="metric-card total">
        <div className="metric-info">
          <p>Total Registered</p>
          <div className="metric-value">{total}</div>
          <div className="metric-sub">Total records today</div>
        </div>
        <div className="metric-icon-wrapper">
          <Users size={26} />
        </div>
      </div>
    </div>
  );
}
