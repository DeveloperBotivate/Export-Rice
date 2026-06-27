import React, { useState, useEffect } from 'react';
import { IndianRupee, DollarSign, ArrowUpRight, ArrowDownRight, Search, Filter, AlertCircle } from 'lucide-react';
import { WorkflowNavigation } from '../../components/WorkflowNavigation';
import { PageTabs } from '../../components/PageTabs';
import { ActionMenu } from '../../components/ActionMenu';
import { StageTransitionModal } from '../../components/StageTransitionModal';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';

export const Finance = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const NEXT_STAGES = ['Pending Approval', 'Processing', 'Payment Sent', 'Payment Received', 'Reconciled', 'Completed'];

  useEffect(() => {
    // Generate mock transactions
    const dummyTransactions = Array.from({ length: 15 }).map((_, i) => ({
      id: `TXN-2026-${String(i+1).padStart(4, '0')}`,
      date: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
      type: i % 2 === 0 ? 'Accounts Receivable' : 'Accounts Payable',
      entity: i % 2 === 0 ? `Customer ${i+1}` : `Supplier ${i+1}`,
      amount: i % 2 === 0 ? `₹ ${(100000 + i*50000).toLocaleString()}` : `₹ ${(50000 + i*10000).toLocaleString()}`,
      status: i > 10 ? 'Completed' : (i % 3 === 0 ? 'Pending Approval' : 'Processing'),
    }));
    setTransactions(dummyTransactions);
    setLoading(false);
  }, []);

  const handleMoveStage = (id) => {
    const record = transactions.find(t => t.id === id);
    setSelectedRecord(record);
    setModalOpen(true);
  };

  const handleConfirmTransition = (id, newStage, remarks) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: newStage } : t));
  };

  const pendingTxns = transactions.filter(t => t.status !== 'Completed' && t.status !== 'Reconciled');
  const historyTxns = transactions.filter(t => t.status === 'Completed' || t.status === 'Reconciled');
  const displayTxns = activeTab === 'pending' ? pendingTxns : historyTxns;

  const getDaysPending = (dateStr) => {
    const diff = new Date() - new Date(dateStr);
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  };

  const pagination = usePagination(displayTxns, 10);

  const columns = [
    { header: <input type="checkbox" className="rounded border-slate-300"/>, cell: (row) => <input type="checkbox" className="rounded border-slate-300"/>, className: 'w-12' },
    { header: 'Transaction ID', cell: (row) => <span className="font-medium text-primary">{row.id}</span> },
    { header: 'Date', cell: (row) => <span className="text-slate-700">{new Date(row.date).toLocaleDateString()}</span> },
    { header: 'Type', cell: (row) => <span className="text-slate-700">{row.type}</span> },
    { header: 'Entity', cell: (row) => <span className="font-medium">{row.entity}</span> },
    { header: 'Amount', cell: (row) => <span className="font-semibold text-slate-800">{row.amount}</span> },
    ...(activeTab === 'pending' ? [{ header: 'Days Pending', cell: (row) => {
      const days = getDaysPending(row.date);
      return (
        <span className={`flex items-center gap-1 ${days > 3 ? 'text-red-600 font-medium' : 'text-slate-600'}`}>
          {days > 3 && <AlertCircle size={14}/>} {days} days
        </span>
      );
    }}] : []),
    { header: 'Status', cell: (row) => (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
        row.status === 'Completed' || row.status === 'Reconciled' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
      }`}>
        {row.status}
      </span>
    )},
    { header: 'Actions', className: 'text-center', cell: (row) => (
      <div className="flex justify-center">
        <ActionMenu id={row.id} onMoveStage={activeTab === 'pending' ? handleMoveStage : undefined} />
      </div>
    )}
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Finance & Payments</h2>
          <p className="text-sm text-slate-500">Manage Accounts Receivable, Payable, and Forex</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 text-green-600 rounded-lg">
              <ArrowDownRight size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Accounts Receivable</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">₹ 8.5 Cr</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 text-red-600 rounded-lg">
              <ArrowUpRight size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Accounts Payable</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">₹ 2.1 Cr</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <DollarSign size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Forex Exposure</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">$ 1.2M</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
              <IndianRupee size={20} />
            </div>
            <span className="text-sm font-medium text-slate-500">Bank Balance</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">₹ 5.4 Cr</h3>
        </div>
      </div>

      <PageTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <Card>
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              type="text" 
              placeholder="Search Transactions..." 
              
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
            <Filter size={16} />
            Filters
          </button>
        </div>
        <DataTable 
          columns={columns} 
          data={pagination.paginatedData} 
          {...pagination}
        />
      </Card>

      <WorkflowNavigation 
        prevLink="/dispatch"
        prevLabel="Dispatch"
        nextLink="/traceability"
        nextLabel="Traceability & Audit"
      />

      {selectedRecord && (
        <StageTransitionModal 
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          recordId={selectedRecord.id}
          currentStage={selectedRecord.status}
          nextStages={NEXT_STAGES.filter(s => s !== selectedRecord.status)}
          onConfirm={handleConfirmTransition}
        />
      )}
    </div>
  );
};

import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input, Select, Textarea } from '../../components/ui/Input';