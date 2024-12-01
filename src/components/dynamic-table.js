import React, { useState } from 'react';
import TableHeader from './table-header';
import TableBody from './table-body';
import '../css/table-styles.css';

const columnDefs = [
  { key: 'age', label: 'Age', filter: '' },
  { key: 'policy', label: 'Policy Number', filter: '' },
  { key: 'benefits', label: 'Benefits', filter: '' },
  { key: 'guaranteed', label: 'Guaranteed', filter: '' },
  { key: 'nonGuaranteed', label: 'Non Guaranteed', filter: '' },
  { key: 'newBenefit', label: 'New Benefits', filter: '', type: 'number' },
  { key: 'randomBenefits', label: 'Random Benefits', filter: '' },
];

const objectData = [
  { age: 20, policy: 'Policy A', benefits: 'Benefit A', guaranteed: 'Yes', nonGuaranteed: 'No', newBenefit: 540 },
  { age: 25, policy: 'Policy A', benefits: 'Benefit A', guaranteed: 'Yes', nonGuaranteed: 'No' },
  { age: 35, policy: 'Policy A', benefits: 'Benefit A', guaranteed: 'Yes', nonGuaranteed: 'No', newBenefit: 240 },
  { age: 22, policy: 'Policy A', benefits: 'Benefit A', guaranteed: 'Yes', nonGuaranteed: 'No' },
  { age: 30, policy: 'Policy B', benefits: 'Benefit B', guaranteed: 'No', nonGuaranteed: 'Yes' },
];

const DynamicTable = () => {
  const [data, setData] = useState(objectData);
  const [filters, setFilters] = useState(
    columnDefs.reduce((acc, col) => {
      acc[col.key] = col.filter;
      return acc;
    }, {})
  );
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleFilterChange = (e, columnKey) => {
    const newFilters = { ...filters, [columnKey]: e.target.value };
    setFilters(newFilters);
  };

  const filteredData = data.filter((row) =>
    columnDefs.every((col) => {
      const filterValue = filters[col.key];
      if (filterValue === '') return true;
      return row[col.key]?.toString().toLowerCase().includes(filterValue.toLowerCase());
    })
  );

  const handleSort = (columnKey) => {
    let direction = 'asc';
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: columnKey, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      let aValue = a[columnKey];
      let bValue = b[columnKey];

      if (columnDefs.find(col => col.key === columnKey)?.type === 'number') {
        aValue = (aValue === undefined || aValue === null || aValue === '') ? 0 : Number(aValue);
        bValue = (bValue === undefined || bValue === null || bValue === '') ? 0 : Number(bValue);
      }

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
  };

  return (
    <div>
      <table border="1">
        <TableHeader 
          columnDefs={columnDefs}
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleSort={handleSort}
          sortConfig={sortConfig}
        />
        <TableBody
          filteredData={filteredData}
          columnDefs={columnDefs}
        />
      </table>
    </div>
  );
};

export default DynamicTable;
