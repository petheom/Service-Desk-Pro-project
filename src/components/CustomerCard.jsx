import React from 'react';
import { 
  Clock, 
  Trash2, 
  Printer, 
  ArrowRight, 
  CheckCircle2, 
  Wrench, 
  Laptop, 
  CreditCard, 
  MessageSquare, 
  RotateCcw, 
  Zap,
  UserCheck
} from 'lucide-react';
import { SERVICE_TYPES, PRIORITIES, STATUS_CONFIG } from '../types/queue';
import { formatElapsedTime, getCustomerWaitDuration, getCustomerServingDuration, formatTimeHHMM } from '../utils/timeUtils';

const ICON_MAP = {
  Wrench,
  Laptop,
  CreditCard,
  MessageSquare,
  RotateCcw,
  Zap
};

export function CustomerCard({ customer, now, onMove, onRemove, onPrintTicket }) {
  const service = SERVICE_TYPES.find(s => s.id === customer.serviceType) || SERVICE_TYPES[0];
  const priority = PRIORITIES[customer.priority?.toUpperCase()] || PRIORITIES.NORMAL;
  const statusCfg = STATUS_CONFIG[customer.status];

  const IconComponent = ICON_MAP[service.icon] || Wrench;

  // Calculate live elapsed durations
  const waitMs = getCustomerWaitDuration(customer, now);
  const servingMs = getCustomerServingDuration(customer, now);

  const formattedWaitTime = formatElapsedTime(waitMs);
  const formattedServingTime = formatElapsedTime(servingMs);

  return (
    <div className="customer-card">
      {/* Top Header: Token & Priority */}
      <div className="card-top">
        <span className="token-badge">{customer.tokenNumber}</span>
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
      </div>

      {/* Customer Info & Service Tag */}
      <div className="customer-info">
        <h3>{customer.name}</h3>
        <div 
          className="service-tag"
          style={{ 
            color: service.color, 
            backgroundColor: `${service.color}15`,
            border: `1px solid ${service.color}30`
          }}
        >
          <IconComponent size={13} />
          <span>{service.name}</span>
        </div>
      </div>

      {/* Dynamic Wait / Serving Time Row */}
      <div className="time-row">
        {customer.status === 'waiting' && (
          <>
            <span className="time-label">
              <Clock size={14} />
              <span>Waiting Time:</span>
            </span>
            <span className="time-counter waiting-ticker">{formattedWaitTime}</span>
          </>
        )}

        {customer.status === 'serving' && (
          <>
            <span className="time-label">
              <UserCheck size={14} />
              <span>In Service ({customer.counterNumber || 'Counter'}):</span>
            </span>
            <span className="time-counter serving-ticker">{formattedServingTime}</span>
          </>
        )}

        {customer.status === 'completed' && (
          <>
            <span className="time-label">
              <CheckCircle2 size={14} />
              <span>Served at {formatTimeHHMM(customer.completedAt)}:</span>
            </span>
            <span className="time-counter completed-ticker">{formattedServingTime}</span>
          </>
        )}
      </div>

      {/* Notes if any */}
      {customer.notes && (
        <p className="card-notes">"{customer.notes}"</p>
      )}

      {/* Action Buttons */}
      <div className="card-actions">
        {statusCfg.nextStatus && (
          <button
            className={`btn ${customer.status === 'waiting' ? 'btn-primary' : 'btn-primary'}`}
            style={{ 
              backgroundColor: customer.status === 'waiting' ? 'var(--primary)' : 'var(--warning)',
              borderColor: customer.status === 'waiting' ? 'var(--primary)' : 'var(--warning)'
            }}
            onClick={() => onMove(customer.id, statusCfg.nextStatus)}
          >
            <span>{statusCfg.actionText}</span>
            <ArrowRight size={15} />
          </button>
        )}

        <button
          className="btn btn-secondary btn-icon"
          onClick={() => onPrintTicket(customer)}
          title="Print Customer Ticket"
        >
          <Printer size={16} />
        </button>

        <button
          className="btn btn-danger btn-icon"
          onClick={() => onRemove(customer.id)}
          title="Remove Customer"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
