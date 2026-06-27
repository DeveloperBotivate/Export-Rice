import React, { useState, useEffect } from 'react';
import { Truck, MapPin, CheckSquare, PackageOpen, Search, Filter, AlertCircle } from 'lucide-react';
import { WorkflowNavigation } from '../../components/WorkflowNavigation';
import { PageTabs } from '../../components/PageTabs';
import { ActionMenu } from '../../components/ActionMenu';
import { StageTransitionModal } from '../../components/StageTransitionModal';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
const dummyDispatches = [];

export const Dispatch = () => {
  const [dispatches, setDispatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const NEXT_STAGES = ['Vehicle Assigned', 'Loading Started', 'Loading Complete', 'E-Way Bill Generated', 'In Transit', 'Delivered'];

  useEffect(() => {
    // Generate dates if missing
    const seeded = dummyDispatches.map(d => ({...d, date: d.date || new Date().toISOString()}));
    setDispatches(seeded);
    setLoading(false);
  }, []);

  const handleMoveStage = (id) => {
    const record = dispatches.find(d => d.id === id);
    setSelectedRecord(record);
    setModalOpen(true);
  };

  const handleConfirmTransition = (id, newStage, remarks) => {
    setDispatches(prev => prev.map(d => d.id === id ? { ...d, status: newStage } : d));
  };

  const pendingDispatches = dispatches.filter(d => d.status !== 'Delivered');
  const historyDispatches = dispatches.filter(d => d.status === 'Delivered');
  const displayDispatches = activeTab === 'pending' ? pendingDispatches : historyDispatches;

  const getDaysPending = (dateStr) => {
    const diff = new Date() - new Date(dateStr);
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  };

  const pagination = usePagination(displayDispatches, 10);

  const columns = [
    { header: <input type="checkbox" className="rounded border-slate-300"/>, cell: (row) => <input type="checkbox" className="rounded border-slate-300"/>, className: 'w-12' },
    { header: 'Dispatch ID', cell: (row) => <span className="font-medium text-primary">{row.id}</span> },
    { header: 'Sales Order Ref', cell: (row) => <span className="text-slate-700 font-medium">{row.soId}</span> },
    { header: 'Vehicle', accessor: 'vehicle' },
    { header: 'Destination', accessor: 'destination' },
    { header: 'Transit Progress', cell: (row) => (
      <div className="flex items-center gap-2 relative">
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: `${row.progress}%` }}></div>
        </div>
        <Truck size={14} className="text-primary absolute top-1/2 -translate-y-1/2" style={{ left: `calc(${row.progress}% - 14px)` }} />
      </div>
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
        row.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
        row.status === 'In Transit' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
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
          <h2 className="text-xl font-semibold text-slate-800">Dispatch & Logistics</h2>
          <p className="text-sm text-slate-500">Coordinate loading, e-way bills, and delivery tracking</p>
        </div>
        <Button >
          <Truck size={18} />
          Schedule Dispatch
        </Button>
      </div>

      <PageTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <Card>
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              type="text" 
              placeholder="Search Dispatches..." 
              
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
        prevLink="/sales"
        prevLabel="Sales Order"
        nextLink="/finance"
        nextLabel="Finance & Payments"
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