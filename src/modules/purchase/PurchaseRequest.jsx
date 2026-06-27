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
    prNumber: `PR-2026-${(i + 1).toString().padStart(4, '0')}`,
    prDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
    paddyGrade: ['Grade A', 'Grade B', 'Grade C'][Math.floor(Math.random() * 3)],
    quantity: Math.floor(Math.random() * 500) + 100,
    targetMandi: ['Moga Mandi', 'Karnal Mandi', 'Ludhiana Market'][Math.floor(Math.random() * 3)],
    requiredByDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
    requestedBy: 'Purchase Officer',
    department: 'Procurement',
    remarks: 'Standard request',
    createdBy: 'Admin',
    createdAt: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
    updatedAt: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`
  }));
};

export const PurchaseRequest = () => {
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
    setFormData({ prNumber: 'PR-' + Math.floor(Math.random()*10000) });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const newItem = { ...formData, id: Date.now(), createdAt: new Date().toISOString().split('T')[0], status: 'Completed' };
    setHistoryItems([newItem, ...historyItems]);
    setIsModalOpen(false);
  };

  const columns = [
    { header: 'PR Number', accessor: 'prNumber' },
    { header: 'PR Date', accessor: 'prDate' },
    { header: 'Paddy Type / Grade', accessor: 'paddyGrade' },
    { header: 'Quantity Required (MT)', accessor: 'quantity' },
    { header: 'Target Mandi', accessor: 'targetMandi' },
    { header: 'Required By Date', accessor: 'requiredByDate' },
    { header: 'Requested By', accessor: 'requestedBy' },
    { header: 'Department', accessor: 'department' },
    { header: 'Remarks', accessor: 'remarks' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Stage 1 - Purchase Request</h2>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus size={16} /> Create Purchase Request
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
        title="Create Purchase Request"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>PR Number</Label>
              <Input type="text" value={formData.prNumber || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>PR Date</Label>
              <Input type="date" value={formData.prDate || ''} onChange={(e) => setFormData({...formData, prDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Paddy Type / Grade</Label>
              <Input type="text" value={formData.paddyGrade || ''} onChange={(e) => setFormData({...formData, paddyGrade: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Quantity Required (MT)</Label>
              <Input type="number" value={formData.quantity || ''} onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Target Mandi</Label>
              <Input type="text" value={formData.targetMandi || ''} onChange={(e) => setFormData({...formData, targetMandi: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Required By Date</Label>
              <Input type="date" value={formData.requiredByDate || ''} onChange={(e) => setFormData({...formData, requiredByDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Requested By</Label>
              <Input type="text" value={formData.requestedBy || ''} onChange={(e) => setFormData({...formData, requestedBy: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Department</Label>
              <Input type="text" value={formData.department || ''} onChange={(e) => setFormData({...formData, department: e.target.value})} />
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label>Remarks</Label>
              <Input type="text" value={formData.remarks || ''} onChange={(e) => setFormData({...formData, remarks: e.target.value})} />
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
