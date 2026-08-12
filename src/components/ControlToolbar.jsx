import React from 'react';
import { Search, Filter, LayoutGrid, ListFilter, X } from 'lucide-react';
import { SERVICE_TYPES, PRIORITIES } from '../types/queue';

export function ControlToolbar({
  searchQuery,
  setSearchQuery,
  selectedService,
  setSelectedService,
  selectedPriority,
  setSelectedPriority,
  viewMode,
  setViewMode,
  onClearFilters
}) {
  const hasActiveFilters = searchQuery !== '' || selectedService !== 'all' || selectedPriority !== 'all';

  return (
    <div className="toolbar">
      {/* Search Input */}
      <div className="search-box">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          className="search-input"
          placeholder="Search by customer name or token number (e.g. T-101)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button 
            className="modal-close" 
            style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)' }}
            onClick={() => setSearchQuery('')}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filter Group */}
      <div className="filter-group">
        {/* Service Type Filter */}
        <select
          className="select-input"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="all">All Service Types</option>
          {SERVICE_TYPES.map(st => (
            <option key={st.id} value={st.id}>
              {st.name}
            </option>
          ))}
        </select>

        {/* Priority Filter */}
        <select
          className="select-input"
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="vip">VIP Priority</option>
          <option value="high">High Priority</option>
          <option value="normal">Standard Priority</option>
        </select>

        {hasActiveFilters && (
          <button className="btn btn-secondary" onClick={onClearFilters} style={{ padding: '0.65rem 0.85rem' }}>
            <X size={14} />
            <span>Clear</span>
          </button>
        )}

        {/* View Mode Toggle */}
        <div className="view-toggle">
          <button
            className={`toggle-btn ${viewMode === 'board' ? 'active' : ''}`}
            onClick={() => setViewMode('board')}
            title="Kanban Board View"
          >
            <LayoutGrid size={15} />
            <span>Board</span>
          </button>
          <button
            className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            title="List Table View"
          >
            <ListFilter size={15} />
            <span>List</span>
          </button>
        </div>
      </div>
    </div>
  );
}
