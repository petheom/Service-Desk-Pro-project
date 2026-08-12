import React from 'react';
import { SERVICE_TYPES, STATUS_CONFIG, PRIORITIES } from '../types/queue';
import { formatElapsedTime, getCustomerWaitDuration, getCustomerServingDuration, formatTimeHHMM } from '../utils/timeUtils';
import { ArrowRight, Trash2, Printer } from 'lucide-react';

export function QueueTable({ customers, now, onMove, onRemove, onPrintTicket }) {
  if (customers.length === 0) {
    return (
      <div className="table-container" style={{ padding: '3rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>No customer records found matching search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="queue-table">
        <thead>
          <tr>
            <th>Token</th>
            <th>Customer Name</th>
            <th>Service Type</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Wait / Service Duration</th>
            <th>Created At</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => {
            const service = SERVICE_TYPES.find(s => s.id === customer.serviceType) || SERVICE_TYPES[0];
            const priority = PRIORITIES[customer.priority?.toUpperCase()] || PRIORITIES.NORMAL;
            const statusCfg = STATUS_CONFIG[customer.status];

            const waitMs = getCustomerWaitDuration(customer, now);
            const servingMs = getCustomerServingDuration(customer, now);
            
            const displayTime = customer.status === 'waiting'
              ? formatElapsedTime(waitMs)
              : formatElapsedTime(servingMs);

            return (
              <tr key={customer.id}>
                <td>
                  <span className="token-badge">{customer.tokenNumber}</span>
                </td>
                <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                  {customer.name}
                  {customer.notes && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                      {customer.notes}
                    </div>
                  )}
                </td>
                <td>
                  <span 
                    className="service-tag"
                    style={{ 
                      color: service.color, 
                      backgroundColor: `${service.color}15`,
                      border: `1px solid ${service.color}30`
                    }}
                  >
                    {service.name}
                  </span>
                </td>
                <td>
                  <span 
                    className="priority-badge"
                    style={{ 
                      color: priority.color, 
                      backgroundColor: priority.bg, 
                      borderColor: priority.border,
                      border: `1px solid ${priority.border}`
                    }}
                  >
                    {priority.label}
                  </span>
                </td>
                <td>
                  <span 
                    className="count-badge"
                    style={{ 
                      color: statusCfg.color,
                      borderColor: statusCfg.borderColor,
                      background: statusCfg.lightBg
                    }}
                  >
                    {statusCfg.label}
                  </span>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  {displayTime}
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  {formatTimeHHMM(customer.createdAt)}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end' }}>
                    {statusCfg.nextStatus && (
                      <button
                        className="btn btn-secondary"
                        style={{ padding: '0.4rem 0.65rem', fontSize: '0.775rem' }}
                        onClick={() => onMove(customer.id, statusCfg.nextStatus)}
                      >
                        <span>{statusCfg.actionText}</span>
                        <ArrowRight size={13} />
                      </button>
                    )}
                    <button
                      className="btn btn-secondary btn-icon"
                      style={{ padding: '0.4rem' }}
                      onClick={() => onPrintTicket(customer)}
                      title="Print Ticket"
                    >
                      <Printer size={14} />
                    </button>
                    <button
                      className="btn btn-danger btn-icon"
                      style={{ padding: '0.4rem' }}
                      onClick={() => onRemove(customer.id)}
                      title="Remove Customer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
