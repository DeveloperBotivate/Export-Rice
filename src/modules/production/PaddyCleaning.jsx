import React, { useState, useEffect } from 'react';
import { Search, Play } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
import { Modal } from '../../components/ui/Modal';
import { PageTabs } from '../../components/PageTabs';

const generateDummyData = () => {
  return Array.from({ length: 40 }, (_, i) => {
    const qty = Math.floor(Math.random() * 50) + 10;
    
    return {
      id: i + 1,
      productionOrderNo: `PRD-2026-${(i + 1).toString().padStart(4, '0')}`,
      planDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      paddyGrade: ['Grade A', 'Grade B', 'Grade C'][Math.floor(Math.random() * 3)],
      sourceStockId: `STK-${Math.floor(Math.random() * 1000)}`,
      lotNo: `LOT-${i+1}`,
      batchNo: `BATCH-${i+1}`,
      plannedInputQty: qty,
      expectedPremiumRice: (qty * 0.6).toFixed(2),
      expectedBrokenRice: (qty * 0.1).toFixed(2),
      expectedBran: (qty * 0.08).toFixed(2),
      expectedHusk: (qty * 0.2).toFixed(2),
      expectedPolish: (qty * 0.02).toFixed(2),
      recoveryTarget: 60,
      machineAssigned: `MCH-${Math.floor(Math.random() * 10)}`,
      operatorAssigned: 'Ramesh Operator',
      shift: ['Morning', 'Evening', 'Night'][Math.floor(Math.random() * 3)],
      productionDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      plannedBy: 'Production Head',
      
      actualStartDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      actualStartTime: '08:00 AM',
      
      cleaningId: `CLN-${(i + 1).toString().padStart(4, '0')}`,
      cleaningDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}T10:00`,
      cleaningInputQty: qty,
      cleanedOutput: (qty * 0.98).toFixed(2),
      dustWastage: Math.floor(Math.random() * 50) + 10,
      stoneWastage: Math.floor(Math.random() * 20) + 5,
      foreignMatter: Math.floor(Math.random() * 30) + 5,
      cleaningMachine: `CLN-MCH-${Math.floor(Math.random() * 5)}`,
      cleaningOperator: 'Suresh Cleaner',

      dehuskingId: `DHK-${(i + 1).toString().padStart(4, '0')}`,
      dehuskingInputQty: (qty * 0.98).toFixed(2),
      brownRiceOutput: (qty * 0.78).toFixed(2),
      huskOutput: (qty * 0.2).toFixed(2),
      dehuskingEfficiency: 95,
      rubberRollId: `RR-${Math.floor(Math.random() * 100)}`,
      machineRpm: 1200,
      dehuskingOperator: 'Anil Husker',
      dehuskingDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}T12:00`,

      separationId: `SEP-${(i + 1).toString().padStart(4, '0')}`,
      separationInputQty: (qty * 0.78).toFixed(2),
      separatedBrownRice: (qty * 0.75).toFixed(2),
      paddyReturned: (qty * 0.03).toFixed(2),
      separatorMachineId: `SEP-MCH-${Math.floor(Math.random() * 5)}`,
      separationEfficiency: 98,
      separationOperator: 'Vijay Separator',
      separationDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}T14:00`,

      polishingId: `POL-${(i + 1).toString().padStart(4, '0')}`,
      polishingInputQty: (qty * 0.75).toFixed(2),
      whiteRiceOutput: (qty * 0.65).toFixed(2),
      branOutput: (qty * 0.08).toFixed(2),
      polishOutput: (qty * 0.02).toFixed(2),
      polishingDegree: 12,
      polishingMachineId: `POL-MCH-${Math.floor(Math.random() * 5)}`,
      waterUsed: Math.floor(Math.random() * 500) + 100,
      polishingOperator: 'Mohan Polisher',
      polishingDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}T16:00`,

      gradingId: `GRD-${(i + 1).toString().padStart(4, '0')}`,
      gradingInputQty: (qty * 0.65).toFixed(2),
      gradeARice: (qty * 0.5).toFixed(2),
      gradeBRice: (qty * 0.1).toFixed(2),
      brokenRice: (qty * 0.03).toFixed(2),
      smallBroken: (qty * 0.02).toFixed(2),
      gradingMachineId: `GRD-MCH-${Math.floor(Math.random() * 5)}`,
      sieveSize: '3.5mm',
      gradingOperator: 'Karan Grader',
      gradingDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}T18:00`,

      colorSortId: `CS-${(i + 1).toString().padStart(4, '0')}`,
      colorSortInputQty: (qty * 0.5).toFixed(2),
      sortedOutput: (qty * 0.49).toFixed(2),
      rejection: (qty * 0.01).toFixed(2),
      colorSorterMachineId: `CS-MCH-${Math.floor(Math.random() * 5)}`,
      noOfPasses: 2,
      rejectionPercent: 2,
      colorSortOperator: 'Raj Sorter',
      colorSortDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}T20:00`,

      actualTotalInput: qty,
      actualRiceOutput: (qty * 0.49).toFixed(2),
      actualBran: (qty * 0.08).toFixed(2),
      actualHusk: (qty * 0.2).toFixed(2),
      actualPolish: (qty * 0.02).toFixed(2),
      actualBrokenRice: (qty * 0.03).toFixed(2),
      actualRecoveryPercent: 58,
      variance: -0.5,
      machineHold: 'No',
      holdReason: '',
      inventoryTransferRef: `TRF-${Math.floor(Math.random() * 1000)}`,
      closedBy: 'Production Head',
      closureDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,

      status: 'Completed'
    };
  });
};

export const PaddyCleaning = () => {
  const [pendingItems, setPendingItems] = useState(generateDummyData().slice(0, 20));
  const [historyItems, setHistoryItems] = useState(generateDummyData().slice(20, 40));
  
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});

  const displayData = activeTab === 'pending' ? pendingItems : historyItems;
  
  const filteredData = displayData.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const pagination = usePagination(filteredData, 10);

  const handleActionClick = (item) => {
    setSelectedItem(item);
    
    let autoFields = {};
    autoFields = { cleaningId: 'CLN-' + Math.floor(Math.random()*10000) };
    
    
    
    
    
    
    const readOnlyFields = ["productionOrderNo"];
    const initialFormData = {};
    readOnlyFields.forEach(field => {
      initialFormData[field] = item[field];
    });
    
    setFormData({ ...initialFormData, ...autoFields });
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen && formData) {
      
    }
  }, [formData, isModalOpen, selectedItem]);

  const handleSave = () => {
    const processedItem = { ...selectedItem, ...formData, status: 'Completed' };
    setHistoryItems([processedItem, ...historyItems]);
    setPendingItems(pendingItems.filter(p => p.id !== selectedItem.id));
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const actionColumn = {
    header: 'Action',
    className: 'text-right',
    cell: (row) => (
      <div className="flex justify-end">
        <Button size="sm" onClick={() => handleActionClick(row)} className="flex items-center gap-1 bg-primary text-white">
          <Play size={14} />
          Process Cleaning
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"Production Order No","accessor":"productionOrderNo"},{"header":"Paddy Grade","accessor":"paddyGrade"},{"header":"Planned Input Qty (MT)","accessor":"plannedInputQty"},{"header":"Actual Start Date","accessor":"actualStartDate"},{"header":"Machine ID","accessor":"machineAssigned"},{"header":"Operator Name","accessor":"operatorAssigned"}];
  const historyCols = [{"header":"Cleaning ID","accessor":"cleaningId"},{"header":"Production Order No","accessor":"productionOrderNo"},{"header":"Input Qty (MT)","accessor":"cleaningInputQty"},{"header":"Cleaned Output (MT)","accessor":"cleanedOutput"},{"header":"Dust Wastage (Kg)","accessor":"dustWastage"},{"header":"Stone Wastage (Kg)","accessor":"stoneWastage"},{"header":"Foreign Matter (Kg)","accessor":"foreignMatter"},{"header":"Date","accessor":"cleaningDate"},{"header":"Operator","accessor":"cleaningOperator"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 2.1 - Paddy Cleaning</h2>
      </div>

      <PageTabs activeTab={activeTab} setActiveTab={setActiveTab} />

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
        title="Paddy Cleaning Details"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <Label>Production Order No</Label>
              <Input 
                type="text"
                value={formData.productionOrderNo || ''} 
                onChange={(e) => setFormData({...formData, productionOrderNo: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Cleaning ID</Label>
              <Input 
                type="text"
                value={formData.cleaningId || ''} 
                onChange={(e) => setFormData({...formData, cleaningId: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Date & Time</Label>
              <Input 
                type="datetime-local"
                value={formData.cleaningDate || ''} 
                onChange={(e) => setFormData({...formData, cleaningDate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Input Quantity (MT)</Label>
              <Input 
                type="number"
                value={formData.cleaningInputQty || ''} 
                onChange={(e) => setFormData({...formData, cleaningInputQty: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Cleaned Output (MT)</Label>
              <Input 
                type="number"
                value={formData.cleanedOutput || ''} 
                onChange={(e) => setFormData({...formData, cleanedOutput: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Wastage — Dust (Kg)</Label>
              <Input 
                type="number"
                value={formData.dustWastage || ''} 
                onChange={(e) => setFormData({...formData, dustWastage: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Wastage — Stones (Kg)</Label>
              <Input 
                type="number"
                value={formData.stoneWastage || ''} 
                onChange={(e) => setFormData({...formData, stoneWastage: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Foreign Matter Removed (Kg)</Label>
              <Input 
                type="number"
                value={formData.foreignMatter || ''} 
                onChange={(e) => setFormData({...formData, foreignMatter: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Machine ID</Label>
              <Input 
                type="text"
                value={formData.cleaningMachine || ''} 
                onChange={(e) => setFormData({...formData, cleaningMachine: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Operator</Label>
              <Input 
                type="text"
                value={formData.cleaningOperator || ''} 
                onChange={(e) => setFormData({...formData, cleaningOperator: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Remarks</Label>
              <Input 
                type="text"
                value={formData.remarks || ''} 
                onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
            <Button onClick={() => setIsModalOpen(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save & Process
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
