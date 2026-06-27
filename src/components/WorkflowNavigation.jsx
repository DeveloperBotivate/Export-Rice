import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';

export const WorkflowNavigation = ({ prevLink, prevLabel, nextLink, nextLabel, onSave }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex-1 w-full sm:w-auto">
        {prevLink && (
          <button 
            onClick={() => navigate(prevLink)}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={18} />
            Prev: {prevLabel}
          </button>
        )}
      </div>
      
      {onSave && (
        <button 
          onClick={onSave}
          className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-sm w-full sm:w-auto justify-center"
        >
          <Save size={18} />
          Save & Commit
        </button>
      )}

      <div className="flex-1 w-full sm:w-auto flex justify-end">
        {nextLink && (
          <button 
            onClick={() => navigate(nextLink)}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm w-full sm:w-auto justify-center"
          >
            Next: {nextLabel}
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
};
