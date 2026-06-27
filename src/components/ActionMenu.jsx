import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Eye, Edit2, ArrowRightCircle, History, Printer, Trash2 } from 'lucide-react';

export const ActionMenu = ({ onMoveStage, id, onView, onEdit, onDelete, onHistory, onPrint }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-400 hover:text-primary hover:bg-slate-50 rounded-full transition-colors"
      >
        <MoreVertical size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 z-50 py-2">
          <div className="px-4 py-2 border-b border-slate-100 mb-1">
            <span className="text-xs font-semibold text-slate-500 uppercase">Actions — {id}</span>
          </div>
          
          <button onClick={() => { setIsOpen(false); onView && onView(id); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
            <Eye size={16} className="text-slate-400"/> View Details
          </button>
          <button onClick={() => { setIsOpen(false); onEdit && onEdit(id); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
            <Edit2 size={16} className="text-slate-400"/> Edit Record
          </button>
          <button onClick={() => { setIsOpen(false); onMoveStage && onMoveStage(id); }} className="w-full text-left px-4 py-2 text-sm text-primary font-medium hover:bg-slate-50 flex items-center gap-2">
            <ArrowRightCircle size={16} className="text-primary"/> Move to Next Stage
          </button>
          <button onClick={() => { setIsOpen(false); onHistory && onHistory(id); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
            <History size={16} className="text-slate-400"/> View Audit Log
          </button>
          <button onClick={() => { setIsOpen(false); onPrint && onPrint(id); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
            <Printer size={16} className="text-slate-400"/> Print PDF
          </button>
          <div className="border-t border-slate-100 mt-1 pt-1">
            <button onClick={() => { setIsOpen(false); onDelete && onDelete(id); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
              <Trash2 size={16} className="text-red-500"/> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
