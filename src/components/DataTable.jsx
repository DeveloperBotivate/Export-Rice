import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DragScrollTable from './DragScrollTable';
import { Button } from './ui/Button';
import { Select } from './ui/Input';

/**
 * DataTable Component
 * Standardized table with Desktop Table View and Mobile Card View.
 * Includes integrated pagination footer.
 */
const DataTable = ({ 
  columns, // New: optional schema-based columns [{ header, accessor, cell, className }]
  headers: propHeaders, 
  data, 
  renderRow: propRenderRow, 
  renderCard: propRenderCard,
  minWidth = "1000px",
  // Pagination Props
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  totalResults,
  itemsPerPageOptions = [10, 15, 20, 50, 100]
}) => {
  // If columns are provided, auto-generate headers, renderRow, and renderCard
  const headers = columns ? columns.map(c => ({ label: c.header, className: c.className || '' })) : propHeaders;
  
  const renderRow = columns ? (row, index) => (
    <tr key={index} className="hover:bg-slate-50 transition-colors">
      {columns.map((col, cIdx) => (
        <td key={cIdx} className="px-4 py-3 text-sm text-slate-700 whitespace-nowrap text-center">
          {col.cell ? col.cell(row, index) : row[col.accessor]}
        </td>
      ))}
    </tr>
  ) : propRenderRow;

  const renderCard = columns ? (row, index) => (
    <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-2">
      {columns.map((col, cIdx) => (
        <div key={cIdx} className="flex justify-between items-start border-b border-slate-50 last:border-0 pb-2 last:pb-0">
          <span className="text-xs font-medium text-slate-500 uppercase">{col.header}</span>
          <span className="text-sm text-slate-800 text-right font-medium">
            {col.cell ? col.cell(row, index) : row[col.accessor]}
          </span>
        </div>
      ))}
    </div>
  ) : propRenderCard;
  return (
    <div className="flex flex-col h-full min-h-0 bg-white w-full">
      {/* Mobile Card View (Hidden on Desktop) */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 overflow-y-auto flex-1 bg-slate-50/50 scrollbar-hide content-start">
        {data.length > 0 && (
          data.map((item, index) => renderCard(item, index))
        )}
      </div>

      {/* Desktop Table View (Hidden on Mobile) */}
      <div className="hidden md:flex flex-col flex-1 min-h-0 overflow-hidden">
        <DragScrollTable className="w-full flex-1 min-h-0">
          <table className={`w-full relative border-collapse ${minWidth}`}>
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10 shadow-sm">
              <tr>
                {headers.map((header, index) => {
                  const label = typeof header === 'object' ? header.label : header;
                  const customClass = typeof header === 'object' ? header.className : '';
                  return (
                    <th 
                      key={index} 
                      className={`px-4 py-3 text-center text-sm font-semibold text-gray-900 whitespace-nowrap uppercase tracking-wider ${customClass}`}
                    >
                      {label}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data.length > 0 && (
                data.map((item, index) => {
                  const row = renderRow(item, index);
                  if (!row || !item || !item.orderType) return row;
                  
                  const isUrgent = item.orderType.trim().toLowerCase() === 'urgent order';
                  const isStock = item.orderType.trim().toLowerCase() === 'stock order';
                  
                  let customClass = '';
                  if (isUrgent) {
                    customClass = 'order-row-urgent';
                  } else if (isStock) {
                    customClass = 'order-row-stock';
                  }
                  
                  if (customClass) {
                    return React.cloneElement(row, {
                      className: `${row.props.className || ''} ${customClass}`
                    });
                  }
                  return row;
                })
              )}
            </tbody>
          </table>
        </DragScrollTable>
      </div>

      {/* Footer - Unified for both views */}
      <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 flex items-center justify-between gap-4 rounded-b-lg">
        {/* Left Side: Row Dropdown */}
        <div className="flex items-center gap-2">
          <Select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="w-auto h-8 py-1"
          >
            {itemsPerPageOptions.map(val => (
              <option key={val} value={val}>{val}</option>
            ))}
          </Select>
          <span className="text-[10px] md:text-sm text-gray-500 whitespace-nowrap font-medium hidden sm:inline">
            {totalResults > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0}-{Math.min(currentPage * itemsPerPage, totalResults)} of {totalResults}
          </span>
        </div>

        {/* Right Side: Pagination Controls */}
        <div className="flex items-center gap-2 md:gap-4 text-gray-700">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="h-8 w-8 text-amber-600"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
          </Button>
          <div className="flex items-center text-xs md:text-sm font-semibold text-gray-600">
            {currentPage} / {totalPages || 1}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="h-8 w-8 text-amber-600"
          >
            <ChevronRight size={16} strokeWidth={2.5} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
