import React from 'react';
import { CustomerCard } from './CustomerCard';
import { STATUSES, STATUS_CONFIG } from '../types/queue';
import { Clock, UserCheck, CheckCircle2, Inbox } from 'lucide-react';

export function QueueBoard({ customers, now, onMove, onRemove, onPrintTicket }) {
  const lanes = [
    { id: STATUSES.WAITING, icon: Clock },
    { id: STATUSES.SERVING, icon: UserCheck },
    { id: STATUSES.COMPLETED, icon: CheckCircle2 }
  ];

  return (
    <div className="queue-board">
      {lanes.map(lane => {
        const statusCfg = STATUS_CONFIG[lane.id];
        const IconComponent = lane.icon;
        const laneCustomers = customers.filter(c => c.status === lane.id);

        return (
          <div key={lane.id} className="queue-column">
            {/* Column Header */}
            <div className="column-header">
              <div className="column-title-group">
                <div 
                  className="status-indicator-dot" 
                  style={{ backgroundColor: statusCfg.color, boxShadow: `0 0 10px ${statusCfg.color}` }}
                />
                <h2>{statusCfg.label}</h2>
              </div>
              <span className="count-badge">
                {laneCustomers.length}
              </span>
            </div>

            {/* Column Content */}
            <div className="column-content">
              {laneCustomers.length > 0 ? (
                laneCustomers.map(customer => (
                  <CustomerCard
                    key={customer.id}
                    customer={customer}
                    now={now}
                    onMove={onMove}
                    onRemove={onRemove}
                    onPrintTicket={onPrintTicket}
                  />
                ))
              ) : (
                <div className="empty-state">
                  <Inbox className="empty-state-icon" />
                  <p>No customers in {statusCfg.label.toLowerCase()} queue</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
