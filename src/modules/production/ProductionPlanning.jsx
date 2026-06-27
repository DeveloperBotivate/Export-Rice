import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
import { Modal } from '../../components/ui/Modal';

const generateDummyData = () => {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    productionOrderNo: `PRD-2026-${(i + 1).toString().padStart(4, '0')}`,
    planDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
    paddyGrade: ['Grade A', 'Grade B', 'Grade C'][Math.floor(Math.random() * 3)],
    sourceStockId: `STK-${Math.floor(Math.random() * 1000)}`,
    lotNo: `LOT-${i+1}`,
    batchNo: `BATCH-${i+1}`,
    plannedInputQty: Math.floor(Math.random() * 50) + 10,
    expectedPremiumRice: (Math.floor(Math.random() * 50) * 0.6).toFixed(2),
    expectedBrokenRice: (Math.floor(Math.random() * 50) * 0.1).toFixed(2),
    expectedBran: (Math.floor(Math.random() * 50) * 0.08).toFixed(2),
    expectedHusk: (Math.floor(Math.random() * 50) * 0.2).toFixed(2),
    expectedPolish: (Math.floor(Math.random() * 50) * 0.02).toFixed(2),
    recoveryTarget: 60,
    machineAssigned: `MCH-${Math.floor(Math.random() * 10)}`,
    operatorAssigned: 'Ramesh Operator',
    shift: ['Morning', 'Evening', 'Night'][Math.floor(Math.random() * 3)],
    productionDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
    plannedBy: 'Production Head'
  }));
};

export const ProductionPlanning = () => {
  const [historyItems, setHistoryItems] = useState(generateDummyData());
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const filteredData = historyItems.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const pagination = usePagination(filteredData, 10);

  const handleCreateNew = () => {
    setFormData({ productionOrderNo: 'PRD-' + Math.floor(Math.random()*10000) });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const newItem = { ...formData, id: Date.now() };
    setHistoryItems([newItem, ...historyItems]);
    setIsModalOpen(false);
  };

  const columns = [
    { header: 'Production Order No', accessor: 'productionOrderNo' },
    { header: 'Plan Date', accessor: 'planDate' },
    { header: 'Paddy Grade', accessor: 'paddyGrade' },
    { header: 'Source Stock ID', accessor: 'sourceStockId' },
    { header: 'Lot No', accessor: 'lotNo' },
    { header: 'Batch No', accessor: 'batchNo' },
    { header: 'Planned Input Qty (MT)', accessor: 'plannedInputQty' },
    { header: 'Expected Rice Output (MT)', accessor: 'expectedPremiumRice' },
    { header: 'Expected Bran (MT)', accessor: 'expectedBran' },
    { header: 'Expected Husk (MT)', accessor: 'expectedHusk' },
    { header: 'Recovery % Target', accessor: 'recoveryTarget' },
    { header: 'Machine Assigned', accessor: 'machineAssigned' },
    { header: 'Shift', accessor: 'shift' },
    { header: 'Planned By', accessor: 'plannedBy' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Stage 1 - Production Planning</h2>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus size={16} /> Create Production Plan
        </Button>
      </div>

      <Card>
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <DataTable 
          columns={columns} 
          data={pagination.paginatedData} 
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          itemsPerPage={pagination.itemsPerPage}
          onPageChange={pagination.setCurrentPage}
          onItemsPerPageChange={pagination.setItemsPerPage}
          totalResults={pagination.totalResults}
        />
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Create Production Plan"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Production Order No</Label>
              <Input type="text" value={formData.productionOrderNo || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Plan Date</Label>
              <Input type="date" value={formData.planDate || ''} onChange={(e) => setFormData({...formData, planDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Paddy Grade Input</Label>
              <Input type="text" value={formData.paddyGrade || ''} onChange={(e) => setFormData({...formData, paddyGrade: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Source Stock ID</Label>
              <Input type="text" value={formData.sourceStockId || ''} onChange={(e) => setFormData({...formData, sourceStockId: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Lot No</Label>
              <Input type="text" value={formData.lotNo || ''} onChange={(e) => setFormData({...formData, lotNo: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Batch No</Label>
              <Input type="text" value={formData.batchNo || ''} onChange={(e) => setFormData({...formData, batchNo: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Planned Input Quantity (MT)</Label>
              <Input type="number" value={formData.plannedInputQty || ''} onChange={(e) => setFormData({...formData, plannedInputQty: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Expected Output — Premium Rice (MT)</Label>
              <Input type="number" value={formData.expectedPremiumRice || ''} onChange={(e) => setFormData({...formData, expectedPremiumRice: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Expected Output — Broken Rice (MT)</Label>
              <Input type="number" value={formData.expectedBrokenRice || ''} onChange={(e) => setFormData({...formData, expectedBrokenRice: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Expected Bran (MT)</Label>
              <Input type="number" value={formData.expectedBran || ''} onChange={(e) => setFormData({...formData, expectedBran: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Expected Husk (MT)</Label>
              <Input type="number" value={formData.expectedHusk || ''} onChange={(e) => setFormData({...formData, expectedHusk: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Expected Polish (MT)</Label>
              <Input type="number" value={formData.expectedPolish || ''} onChange={(e) => setFormData({...formData, expectedPolish: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Recovery % Target</Label>
              <Input type="number" value={formData.recoveryTarget || ''} onChange={(e) => setFormData({...formData, recoveryTarget: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Machine Assigned</Label>
              <Input type="text" value={formData.machineAssigned || ''} onChange={(e) => setFormData({...formData, machineAssigned: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Operator Assigned</Label>
              <Input type="text" value={formData.operatorAssigned || ''} onChange={(e) => setFormData({...formData, operatorAssigned: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Shift</Label>
              <Select value={formData.shift || ''} onChange={(e) => setFormData({...formData, shift: e.target.value})}>
                <option value="">Select Shift</option>
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Production Date</Label>
              <Input type="date" value={formData.productionDate || ''} onChange={(e) => setFormData({...formData, productionDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Planned By</Label>
              <Input type="text" value={formData.plannedBy || ''} onChange={(e) => setFormData({...formData, plannedBy: e.target.value})} />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
            <Button onClick={() => setIsModalOpen(false)} variant="outline">Cancel</Button>
            <Button onClick={handleSave}>Save Request</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
