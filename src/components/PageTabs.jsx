import React from 'react';
import { Clock, History } from 'lucide-react';

export const PageTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-slate-200 mb-6">
      <button
        onClick={() => setActiveTab('pending')}
        className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
          activeTab === 'pending'
            ? 'border-primary text-primary'
            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
        }`}
      >
        <Clock size={16} />
        Pending Action
      </button>
      <button
        onClick={() => setActiveTab('history')}
        className={`flex items-center gap-2 px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
          activeTab === 'history'
            ? 'border-primary text-primary'
            : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
        }`}
      >
        <History size={16} />
        History / Completed
      </button>
    </div>
  );
};
