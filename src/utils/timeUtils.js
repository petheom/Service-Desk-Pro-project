/**
 * Formats elapsed milliseconds or seconds into MM:SS or Xh Ym Zs format.
 */
export function formatElapsedTime(ms) {
  if (ms < 0) ms = 0;
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  
  const formattedMins = String(minutes).padStart(2, '0');
  const formattedSecs = String(seconds).padStart(2, '0');
  return `${formattedMins}:${formattedSecs}`;
}

/**
 * Calculates current wait duration based on status and timestamps.
 */
export function getCustomerWaitDuration(customer, nowTimestamp = Date.now()) {
  if (!customer) return 0;

  if (customer.status === 'waiting') {
    return Math.max(0, nowTimestamp - customer.createdAt);
  }

  if (customer.status === 'serving') {
    // Total wait time until served
    return Math.max(0, (customer.servingStartedAt || nowTimestamp) - customer.createdAt);
  }

  if (customer.status === 'completed') {
    return Math.max(0, (customer.servingStartedAt || customer.completedAt || nowTimestamp) - customer.createdAt);
  }

  return 0;
}

/**
 * Calculates time actively spent in service.
 */
export function getCustomerServingDuration(customer, nowTimestamp = Date.now()) {
  if (!customer || !customer.servingStartedAt) return 0;

  if (customer.status === 'serving') {
    return Math.max(0, nowTimestamp - customer.servingStartedAt);
  }

  if (customer.status === 'completed') {
    return Math.max(0, (customer.completedAt || nowTimestamp) - customer.servingStartedAt);
  }

  return 0;
}

/**
 * Formats timestamp into localized HH:MM AM/PM string.
 */
export function formatTimeHHMM(timestamp) {
  if (!timestamp) return '--:--';
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
