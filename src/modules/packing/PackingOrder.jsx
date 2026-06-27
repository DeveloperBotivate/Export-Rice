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
    packingOrderNo: `PKO-2026-${(i + 1).toString().padStart(4, '0')}`,
    orderDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
    riceGrade: ['Grade A', 'Grade B', 'Premium'][Math.floor(Math.random() * 3)],
    batchNo: `BATCH-${i+1}`,
    lotNo: `LOT-${i+1}`,
    qtyToPack: Math.floor(Math.random() * 50) + 10,
    bagType: ['PP', 'BOPP'][Math.floor(Math.random() * 2)],
    bagSize: ['5kg', '10kg', '25kg', '50kg'][Math.floor(Math.random() * 4)],
    targetPackingDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
    shift: ['Morning', 'Evening', 'Night'][Math.floor(Math.random() * 3)],
    createdBy: 'Packing Head'
  }));
};

export const PackingOrder = () => {
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
    setFormData({ packingOrderNo: 'PKO-' + Math.floor(Math.random()*10000) });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const newItem = { ...formData, id: Date.now() };
    setHistoryItems([newItem, ...historyItems]);
    setIsModalOpen(false);
  };

  const columns = [
    { header: 'Packing Order No', accessor: 'packingOrderNo' },
    { header: 'Order Date', accessor: 'orderDate' },
    { header: 'Rice Grade', accessor: 'riceGrade' },
    { header: 'Lot No', accessor: 'lotNo' },
    { header: 'Batch No', accessor: 'batchNo' },
    { header: 'Qty to Pack (MT)', accessor: 'qtyToPack' },
    { header: 'Bag Type', accessor: 'bagType' },
    { header: 'Bag Size', accessor: 'bagSize' },
    { header: 'Target Packing Date', accessor: 'targetPackingDate' },
    { header: 'Shift', accessor: 'shift' },
    { header: 'Created By', accessor: 'createdBy' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Stage 1 - Packing Order</h2>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus size={16} /> Create Packing Order
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
        title="Create Packing Order"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Packing Order No</Label>
              <Input type="text" value={formData.packingOrderNo || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Order Date</Label>
              <Input type="date" value={formData.orderDate || ''} onChange={(e) => setFormData({...formData, orderDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Rice Grade</Label>
              <Input type="text" value={formData.riceGrade || ''} onChange={(e) => setFormData({...formData, riceGrade: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Rice Batch No</Label>
              <Input type="text" value={formData.batchNo || ''} onChange={(e) => setFormData({...formData, batchNo: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Lot No</Label>
              <Input type="text" value={formData.lotNo || ''} onChange={(e) => setFormData({...formData, lotNo: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Quantity to Pack (MT)</Label>
              <Input type="number" value={formData.qtyToPack || ''} onChange={(e) => setFormData({...formData, qtyToPack: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Bag Type</Label>
              <Select value={formData.bagType || ''} onChange={(e) => setFormData({...formData, bagType: e.target.value})}>
                <option value="">Select Bag Type</option>
                <option value="PP">PP</option>
                <option value="BOPP">BOPP</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Bag Size</Label>
              <Select value={formData.bagSize || ''} onChange={(e) => setFormData({...formData, bagSize: e.target.value})}>
                <option value="">Select Bag Size</option>
                <option value="5kg">5kg</option>
                <option value="10kg">10kg</option>
                <option value="25kg">25kg</option>
                <option value="50kg">50kg</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Target Packing Date</Label>
              <Input type="date" value={formData.targetPackingDate || ''} onChange={(e) => setFormData({...formData, targetPackingDate: e.target.value})} />
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
              <Label>Created By</Label>
              <Input type="text" value={formData.createdBy || ''} onChange={(e) => setFormData({...formData, createdBy: e.target.value})} />
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
