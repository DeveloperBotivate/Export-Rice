import React, { useState, useEffect } from 'react';
import { ShoppingBag, Globe, PlaneTakeoff, Plus, Search, Filter, AlertCircle } from 'lucide-react';
const MockDB = { get: async () => [], getAll: async () => [], add: async (t, data) => ({ id: Date.now(), ...data }), create: async (t, data) => ({ id: Date.now(), ...data }), update: async (t, id, data) => ({ id, ...data }), delete: async () => true };
import { WorkflowNavigation } from '../../components/WorkflowNavigation';
import { PageTabs } from '../../components/PageTabs';
import { ActionMenu } from '../../components/ActionMenu';
import { StageTransitionModal } from '../../components/StageTransitionModal';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';

export const SalesOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const NEXT_STAGES = ['Order Confirmed', 'Payment Verified', 'Ready for Dispatch', 'Dispatched', 'Delivered'];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const result = await MockDB.get('salesOrders');
    // Ensure data has dates for demo
    setOrders(result.map(o => ({...o, date: o.date || new Date().toISOString()})));
    setLoading(false);
  };

  const handleMoveStage = (id) => {
    const record = orders.find(o => o.id === id);
    setSelectedRecord(record);
    setModalOpen(true);
  };

  const handleConfirmTransition = async (id, newStage, remarks) => {
    await MockDB.update('salesOrders', id, { status: newStage, remarks });
    fetchOrders();
  };

  const pendingOrders = orders.filter(o => o.status !== 'Delivered' && o.status !== 'Dispatched');
  const historyOrders = orders.filter(o => o.status === 'Delivered' || o.status === 'Dispatched');
  const displayOrders = activeTab === 'pending' ? pendingOrders : historyOrders;

  const getDaysPending = (dateStr) => {
    const diff = new Date() - new Date(dateStr);
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  };

  const pagination = usePagination(displayOrders, 10);

  const columns = [
    { header: <input type="checkbox" className="rounded border-slate-300"/>, cell: (row) => <input type="checkbox" className="rounded border-slate-300"/>, className: 'w-12' },
    { header: 'Order Ref', cell: (row) => <span className="font-medium text-primary">{row.id}</span> },
    { header: 'Customer', cell: (row) => <span className="text-slate-800 font-medium">{row.customer}</span> },
    { header: 'Destination', cell: (row) => <span className="text-slate-600">{row.destination}</span> },
    { header: 'Quantity', cell: (row) => <span className="text-slate-600">{row.qty} KG</span> },
    { header: 'Type', cell: (row) => (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
        row.destination !== 'Domestic' ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-700'
      }`}>
        {row.destination !== 'Domestic' ? 'Export' : 'Domestic'}
      </span>
    )},
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
        row.status === 'Delivered' || row.status === 'Dispatched' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
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
          <h2 className="text-xl font-semibold text-slate-800">Sales & Export Management</h2>
          <p className="text-sm text-slate-500">Manage domestic sales and international export contracts</p>
        </div>
        <div className="flex gap-3">
          <Button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm">
            <Globe size={18} />
            New Export Contract
          </Button>
          <Button >
            <Plus size={18} />
            New Sales Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Domestic Orders</p>
            <h3 className="text-2xl font-bold text-slate-800">24</h3>
            <p className="text-xs text-green-600 mt-1">₹ 4.2 Cr Revenue</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="p-3 bg-sky-100 text-sky-600 rounded-lg">
            <PlaneTakeoff size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Exports</p>
            <h3 className="text-2xl font-bold text-slate-800">8</h3>
            <p className="text-xs text-green-600 mt-1">$ 1.5M Revenue</p>
          </div>
        </Card>
      </div>

      <PageTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <Card>
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              type="text" 
              placeholder="Search Orders..." 
              
            />
          </div>
          <Button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
            <Filter size={16} />
            Filters
          </Button>
        </div>
        <DataTable 
          columns={columns} 
          data={pagination.paginatedData} 
          {...pagination}
        />
      </Card>

      <WorkflowNavigation 
        prevLink="/packing"
        prevLabel="Packing"
        nextLink="/dispatch"
        nextLabel="Dispatch"
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

import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input, Select, Textarea } from '../../components/ui/Input';