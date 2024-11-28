import React, { useState } from 'react';

const columnDefs = [
  { key: 'age', label: 'Age', filter: '' },
  { key: 'policy', label: 'Policy Number', filter: '' },
  { key: 'benefits', label: 'Benefits', filter: '' },
  { key: 'guaranteed', label: 'Guaranteed', filter: '' },
  { key: 'nonGuaranteed', label: 'Non Guaranteed', filter: '' },
  { key: 'newBenefit', label: 'New Benefits', filter: '' },
  { key: 'randomBenefits', label: 'Random Benefits', filter: '' },
];

const checkValueNewBenefit = (value) => {
  return value === null || value === undefined || value === '' ? 0 : Number(value);
};

const objectData = [
  { age: 20, policy: 'Policy A', benefits: 'Benefit A', guaranteed: 'Yes', nonGuaranteed: 'No', newBenefit: 540 },
  { age: 25, policy: 'Policy A', benefits: 'Benefit A', guaranteed: 'Yes', nonGuaranteed: 'No' },
  { age: 35, policy: 'Policy A', benefits: 'Benefit A', guaranteed: 'Yes', nonGuaranteed: 'No', newBenefit: 240 },
  { age: 22, policy: 'Policy A', benefits: 'Benefit A', guaranteed: 'Yes', nonGuaranteed: 'No' },
  { age: 30, policy: 'Policy B', benefits: 'Benefit B', guaranteed: 'No', nonGuaranteed: 'Yes' },
].map((row) => ({
  ...row,
  newBenefit: checkValueNewBenefit(row.newBenefit),
}));

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
      if (a[columnKey] < b[columnKey]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[columnKey] > b[columnKey]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
  };

  return (
    <div>
      <table border="1">
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
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              {columnDefs.map((col, idx) => (
                <td key={idx}>
                {row[col.key] === 0 && col.key === 'newBenefit' ? '-' : row[col.key] !== undefined ? row[col.key] : '-'}
              </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
