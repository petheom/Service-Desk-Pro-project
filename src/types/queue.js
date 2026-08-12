export const STATUSES = {
  WAITING: 'waiting',
  SERVING: 'serving',
  COMPLETED: 'completed'
};

export const STATUS_CONFIG = {
  [STATUSES.WAITING]: {
    id: STATUSES.WAITING,
    label: 'Waiting',
    badgeClass: 'badge-waiting',
    color: '#3b82f6', // Indigo / Blue
    lightBg: 'rgba(59, 130, 246, 0.08)',
    borderColor: 'rgba(59, 130, 246, 0.25)',
    actionText: 'Start Serving',
    nextStatus: STATUSES.SERVING
  },
  [STATUSES.SERVING]: {
    id: STATUSES.SERVING,
    label: 'Serving',
    badgeClass: 'badge-serving',
    color: '#f59e0b', // Amber / Orange
    lightBg: 'rgba(245, 158, 11, 0.08)',
    borderColor: 'rgba(245, 158, 11, 0.25)',
    actionText: 'Mark Completed',
    nextStatus: STATUSES.COMPLETED
  },
  [STATUSES.COMPLETED]: {
    id: STATUSES.COMPLETED,
    label: 'Completed',
    badgeClass: 'badge-completed',
    color: '#10b981', // Emerald / Green
    lightBg: 'rgba(16, 185, 129, 0.08)',
    borderColor: 'rgba(16, 185, 129, 0.25)',
    actionText: null,
    nextStatus: null
  }
};

export const SERVICE_TYPES = [
  { id: 'repair', name: 'Hardware Repair', icon: 'Wrench', color: '#ef4444', estMinutes: 25 },
  { id: 'tech_support', name: 'Technical Support', icon: 'Laptop', color: '#8b5cf6', estMinutes: 15 },
  { id: 'billing', name: 'Account & Billing', icon: 'CreditCard', color: '#06b6d4', estMinutes: 10 },
  { id: 'consultation', name: 'Service Consultation', icon: 'MessageSquare', color: '#3b82f6', estMinutes: 20 },
  { id: 'returns', name: 'Warranty & Returns', icon: 'RotateCcw', color: '#f59e0b', estMinutes: 12 },
  { id: 'express', name: 'Express Pickup', icon: 'Zap', color: '#10b981', estMinutes: 5 }
];

export const PRIORITIES = {
  VIP: { id: 'vip', label: 'VIP Priority', color: '#eab308', bg: 'rgba(234, 179, 8, 0.15)', border: '#ca8a04' },
  HIGH: { id: 'high', label: 'High Priority', color: '#f97316', bg: 'rgba(249, 115, 22, 0.15)', border: '#ea580c' },
  NORMAL: { id: 'normal', label: 'Standard', color: '#64748b', bg: 'rgba(100, 116, 139, 0.15)', border: '#475569' }
};

export const INITIAL_MOCK_CUSTOMERS = [];
