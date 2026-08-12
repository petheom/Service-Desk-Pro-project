import React, { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { useQueue } from './hooks/useQueue';
import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { MetricsBar } from './components/MetricsBar';
import { ControlToolbar } from './components/ControlToolbar';
import { QueueBoard } from './components/QueueBoard';
import { QueueTable } from './components/QueueTable';
import { AddCustomerModal } from './components/AddCustomerModal';
import { TicketModal } from './components/TicketModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { STATUSES } from './types/queue';

export function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'dashboard' | 'about' | 'contact'

  const {
    customers,
    rawCustomers,
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
  } = useQueue();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTicketCustomer, setSelectedTicketCustomer] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Trigger celebration on completing customer
  const handleMoveCustomer = useCallback((id, nextStatus) => {
    moveCustomer(id, nextStatus);
    if (nextStatus === STATUSES.COMPLETED) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  }, [moveCustomer]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedService('all');
    setSelectedPriority('all');
  };

  const handleConfirmDelete = (id) => {
    setDeleteConfirmId(id);
  };

  const executeDelete = () => {
    if (deleteConfirmId) {
      removeCustomer(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const handleAddAndShowTicket = (customerData) => {
    const newCust = addCustomer(customerData);
    if (newCust) {
      setSelectedTicketCustomer(newCust);
    }
  };

  return (
    <div className="app-container">
      {/* Top Navbar (Home, About, Contact) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Tab Pages Routing */}
      {activeTab === 'home' && (
        <HomePage
          onLaunchDashboard={() => setActiveTab('dashboard')}
          onOpenContact={() => setActiveTab('contact')}
        />
      )}

      {activeTab === 'about' && (
        <AboutPage
          onLaunchDashboard={() => setActiveTab('dashboard')}
        />
      )}

      {activeTab === 'contact' && (
        <ContactPage />
      )}

      {activeTab === 'dashboard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Header Navigation */}
          <Header
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onResetDemo={resetDemoData}
            rawCustomersCount={rawCustomers.length}
          />

          {/* Real-Time Metrics & Counter Bar */}
          <MetricsBar counters={counters} />

          {/* Control Toolbar: Search & Filter */}
          <ControlToolbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
            selectedPriority={selectedPriority}
            setSelectedPriority={setSelectedPriority}
            viewMode={viewMode}
            setViewMode={setViewMode}
            onClearFilters={handleClearFilters}
          />

          {/* Primary Workspace View (Kanban Board vs List Table) */}
          {viewMode === 'board' ? (
            <QueueBoard
              customers={customers}
              now={now}
              onMove={handleMoveCustomer}
              onRemove={handleConfirmDelete}
              onPrintTicket={(cust) => setSelectedTicketCustomer(cust)}
            />
          ) : (
            <QueueTable
              customers={customers}
              now={now}
              onMove={handleMoveCustomer}
              onRemove={handleConfirmDelete}
              onPrintTicket={(cust) => setSelectedTicketCustomer(cust)}
            />
          )}
        </div>
      )}

      {/* Add Customer Modal */}
      <AddCustomerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddCustomer={handleAddAndShowTicket}
      />

      {/* Printable Ticket Modal */}
      {selectedTicketCustomer && (
        <TicketModal
          customer={selectedTicketCustomer}
          onClose={() => setSelectedTicketCustomer(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="modal-overlay" onClick={() => setDeleteConfirmId(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <div className="modal-header">
              <h2>Remove Customer</h2>
            </div>
            <div className="modal-body">
              <p style={{ color: 'var(--text-secondary)' }}>
                Are you sure you want to remove this customer from the queue? This action cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDeleteConfirmId(null)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={executeDelete}>
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
