import React from 'react';

const TableBody = ({ filteredData, columnDefs }) => {
  return (
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
  );
};

export default TableBody;
