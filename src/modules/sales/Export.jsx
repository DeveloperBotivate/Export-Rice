import React, { useState, useEffect } from 'react';
import { Globe, FileCheck, Search, Filter, AlertCircle } from 'lucide-react';
import { WorkflowNavigation } from '../../components/WorkflowNavigation';
import { PageTabs } from '../../components/PageTabs';
import { ActionMenu } from '../../components/ActionMenu';
import { StageTransitionModal } from '../../components/StageTransitionModal';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
const dummyExportContracts = [];

export const ExportManagement = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const NEXT_STAGES = ['Contract Drafted', 'LC Pending', 'LC Received', 'Vessel Booked', 'Container Stuffed', 'BL Generated', 'Completed'];

  useEffect(() => {
    // Generate mock contracts from dummyExportContracts
    const mockContracts = dummyExportContracts.map((contract, i) => ({
      ...contract,
      id: contract.contractRef,
      date: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
      status: i > 2 ? 'Completed' : contract.status,
    }));
    setContracts(mockContracts);
    setLoading(false);
  }, []);

  const handleMoveStage = (id) => {
    const record = contracts.find(c => c.id === id);
    setSelectedRecord(record);
    setModalOpen(true);
  };

  const handleConfirmTransition = (id, newStage, remarks) => {
    setContracts(prev => prev.map(c => c.id === id ? { ...c, status: newStage } : c));
  };

  const pendingContracts = contracts.filter(c => c.status !== 'Completed');
  const historyContracts = contracts.filter(c => c.status === 'Completed');
  const displayContracts = activeTab === 'pending' ? pendingContracts : historyContracts;

  const getDaysPending = (dateStr) => {
    const diff = new Date() - new Date(dateStr);
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  };

  const pagination = usePagination(displayContracts, 10);

  const columns = [
    { header: <input type="checkbox" className="rounded border-slate-300"/>, cell: (row) => <input type="checkbox" className="rounded border-slate-300"/>, className: 'w-12' },
    { header: 'Contract Ref', cell: (row) => <span className="font-medium text-primary">{row.contractRef}</span> },
    { header: 'Consignee', cell: (row) => <span className="text-slate-700">{row.consignee}</span> },
    { header: 'Port of Discharge', cell: (row) => <span className="text-slate-700">{row.port}</span> },
    { header: 'Containers', cell: (row) => <span className="font-semibold text-slate-800">{row.containers}</span> },
    ...(activeTab === 'pending' ? [{ header: 'Days Pending', cell: (row) => {
      const days = getDaysPending(row.date);
      return (
        <span className={`flex items-center gap-1 ${days > 3 ? 'text-red-600 font-medium' : 'text-slate-600'}`}>
          {days > 3 && <AlertCircle size={14}/>} {days} days
        </span>
      );
    }}] : []),
    { header: 'Status', cell: (row) => (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center w-fit gap-1 ${
        row.status === 'Completed' || row.status === 'LC Received' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
      }`}>
        {row.status === 'LC Received' && <FileCheck size={12}/>}
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
          <h2 className="text-xl font-semibold text-slate-800">Export Management</h2>
          <p className="text-sm text-slate-500">Manage international contracts, containers, and shipping lines</p>
        </div>
        <Button >
          <Globe size={18} />
          New Export Contract
        </Button>
      </div>

      <PageTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <Card>
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              type="text" 
              placeholder="Search Contracts..." 
              
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
        prevLabel="Sales Management"
        nextLink="/finance"
        nextLabel="Finance"
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