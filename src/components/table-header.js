import React from 'react';

const TableHeader = ({ columnDefs, filters, handleFilterChange, handleSort, sortConfig }) => {
  return (
    <thead>
      <tr>
        {columnDefs.map((col, index) => (
          <th key={col.key}>
            {col.label}
            <br />
            <input
              type="text"
              value={filters[col.key] || ''}
              onChange={(e) => handleFilterChange(e, col.key)}
              placeholder={`Filter ${col.label}`}
            />
            {(col.key === 'age' || col.key === 'newBenefit') && (
              <button onClick={() => handleSort(col.key)}>
                {sortConfig.key === col.key
                  ? sortConfig.direction === 'asc'
                    ? '↑'
                    : '↓'
                  : '↕'}
              </button>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
