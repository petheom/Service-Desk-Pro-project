import { useState, useEffect, useCallback, useMemo } from 'react';
import { INITIAL_MOCK_CUSTOMERS, STATUSES } from '../types/queue';

const STORAGE_KEY = 'service_queue_dashboard_customers_v1';
const TOKEN_COUNTER_KEY = 'service_queue_token_counter_v1';

export function useQueue() {
  // 1. Initialize customer list from localStorage
  const [customers, setCustomers] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Failed to load customers from localStorage:', err);
    }
    return [];
  });

  // 2. Token counter tracker
  const [tokenCounter, setTokenCounter] = useState(() => {
    try {
      const stored = localStorage.getItem(TOKEN_COUNTER_KEY);
      if (stored) return parseInt(stored, 10);
    } catch (err) {
      console.error('Failed to load token counter:', err);
    }
    return 101;
  });

  // 3. Ticker timestamp for live real-time wait clocks
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
    } catch (err) {
      console.error('Failed to save customers to localStorage:', err);
    }
  }, [customers]);

  useEffect(() => {
    try {
      localStorage.setItem(TOKEN_COUNTER_KEY, tokenCounter.toString());
    } catch (err) {
      console.error('Failed to save token counter to localStorage:', err);
    }
  }, [tokenCounter]);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [viewMode, setViewMode] = useState('board'); // 'board' or 'list'

  // Actions
  const addCustomer = useCallback(({ name, serviceType, priority = 'normal', notes = '' }) => {
    const newTokenNumber = `T-${tokenCounter}`;
    const newCustomer = {
      id: `cust-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      tokenNumber: newTokenNumber,
      name: name.trim(),
      serviceType,
      priority,
      status: STATUSES.WAITING,
      createdAt: Date.now(),
      servingStartedAt: null,
      completedAt: null,
      counterNumber: null,
      notes: notes.trim()
    };

    setCustomers(prev => [newCustomer, ...prev]);
    setTokenCounter(prev => prev + 1);
    return newCustomer;
  }, [tokenCounter]);

  const moveCustomer = useCallback((id, nextStatus, assignedCounter = null) => {
    setCustomers(prev => prev.map(cust => {
      if (cust.id !== id) return cust;

      const updated = { ...cust, status: nextStatus };
      const currentTime = Date.now();

      if (nextStatus === STATUSES.SERVING) {
        if (!updated.servingStartedAt) {
          updated.servingStartedAt = currentTime;
        }
        if (assignedCounter) {
          updated.counterNumber = assignedCounter;
        } else if (!updated.counterNumber) {
          // Assign random desk counter if not set
          const counterNum = Math.floor(Math.random() * 3) + 1;
          updated.counterNumber = `Counter 0${counterNum}`;
        }
      } else if (nextStatus === STATUSES.COMPLETED) {
        if (!updated.servingStartedAt) {
          updated.servingStartedAt = currentTime;
        }
        updated.completedAt = currentTime;
      } else if (nextStatus === STATUSES.WAITING) {
        // Reset serving/completed if pushed back to waiting
        updated.servingStartedAt = null;
        updated.completedAt = null;
      }

      return updated;
    }));
  }, []);

  const removeCustomer = useCallback((id) => {
    setCustomers(prev => prev.filter(cust => cust.id !== id));
  }, []);

  const resetDemoData = useCallback(() => {
    setCustomers([]);
    setTokenCounter(101);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    localStorage.setItem(TOKEN_COUNTER_KEY, '101');
  }, []);

  const clearAll = useCallback(() => {
    setCustomers([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Filtered customer list computation
  const filteredCustomers = useMemo(() => {
    return customers.filter(cust => {
      // 1. Search Query (matches name or token number)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        cust.name.toLowerCase().includes(q) || 
        cust.tokenNumber.toLowerCase().includes(q);

      // 2. Service Filter
      const matchesService = selectedService === 'all' || cust.serviceType === selectedService;

      // 3. Priority Filter
      const matchesPriority = selectedPriority === 'all' || cust.priority === selectedPriority;

      return matchesSearch && matchesService && matchesPriority;
    });
  }, [customers, searchQuery, selectedService, selectedPriority]);

  // Status Counters computation
  const counters = useMemo(() => {
    const total = customers.length;
    const waiting = customers.filter(c => c.status === STATUSES.WAITING).length;
    const serving = customers.filter(c => c.status === STATUSES.SERVING).length;
    const completed = customers.filter(c => c.status === STATUSES.COMPLETED).length;

    // Calculate average wait time for waiting customers
    const totalWaitMs = customers
      .filter(c => c.status === STATUSES.WAITING)
      .reduce((acc, c) => acc + (now - c.createdAt), 0);
    const avgWaitMinutes = waiting > 0 ? Math.round((totalWaitMs / waiting) / 60000) : 0;

    return { total, waiting, serving, completed, avgWaitMinutes };
  }, [customers, now]);

  return {
    customers: filteredCustomers,
    rawCustomers: customers,
    counters,
    now,
    searchQuery,
    setSearchQuery,
    selectedService,
    setSelectedService,
    selectedPriority,
    setSelectedPriority,
    viewMode,
    setViewMode,
    addCustomer,
    moveCustomer,
    removeCustomer,
    resetDemoData,
    clearAll
  };
}
