import React, { useState, useEffect } from 'react';
import { Truck, Map, Shield, Search, Filter, AlertCircle } from 'lucide-react';
import { WorkflowNavigation } from '../../components/WorkflowNavigation';
import { PageTabs } from '../../components/PageTabs';
import { ActionMenu } from '../../components/ActionMenu';
import { StageTransitionModal } from '../../components/StageTransitionModal';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
const dummyDispatches = [];

export const Logistics = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const NEXT_STAGES = ['Pending Advance', 'Advance Paid', 'In Transit', 'POD Received', 'Pending Balance', 'Settled'];

  useEffect(() => {
    // Generate mock trips from dummyDispatches
    const mockTrips = dummyDispatches.map((trip, i) => ({
      ...trip,
      transporter: `Transporter ${i+1}`,
      freight: 15000 + i*100,
      date: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
      status: i > 5 ? 'Settled' : (i % 2 === 0 ? 'Pending Advance' : 'Pending Balance'),
    }));
    setTrips(mockTrips);
    setLoading(false);
  }, []);

  const handleMoveStage = (id) => {
    const record = trips.find(t => t.id === id);
    setSelectedRecord(record);
    setModalOpen(true);
  };

  const handleConfirmTransition = (id, newStage, remarks) => {
    setTrips(prev => prev.map(t => t.id === id ? { ...t, status: newStage } : t));
  };

  const pendingTrips = trips.filter(t => t.status !== 'Settled');
  const historyTrips = trips.filter(t => t.status === 'Settled');
  const displayTrips = activeTab === 'pending' ? pendingTrips : historyTrips;

  const getDaysPending = (dateStr) => {
    const diff = new Date() - new Date(dateStr);
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  };

  const pagination = usePagination(displayTrips, 10);

  const columns = [
    { header: <input type="checkbox" className="rounded border-slate-300"/>, cell: (row) => <input type="checkbox" className="rounded border-slate-300"/>, className: 'w-12' },
    { header: 'Trip ID', cell: (row) => <span className="font-medium text-primary">{row.id}</span> },
    { header: 'Transporter', cell: (row) => <span className="text-slate-700">{row.transporter}</span> },
    { header: 'Vehicle', cell: (row) => <span className="text-slate-700">{row.vehicle}</span> },
    { header: 'Freight Calc.', cell: (row) => <span className="font-semibold text-slate-800">₹ {row.freight.toLocaleString()}</span> },
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
        row.status === 'Settled' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
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
      <div>
        <h2 className="text-xl font-semibold text-slate-800">Vehicle & Logistics Management</h2>
        <p className="text-sm text-slate-500">Manage transporters, vehicles, insurance, and freight settlements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <Truck size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Vehicles</p>
            <h3 className="text-2xl font-bold text-slate-800">45</h3>
          </div>
        </Card>
        <Card className="p-6">
          <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
            <Shield size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Insurance Expiring</p>
            <h3 className="text-2xl font-bold text-slate-800">3</h3>
          </div>
        </Card>
        <Card className="p-6">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg">
            <Map size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Trips</p>
            <h3 className="text-2xl font-bold text-slate-800">12</h3>
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
              placeholder="Search Trips..." 
              
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
        prevLink="/gate"
        prevLabel="Gate Management"
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