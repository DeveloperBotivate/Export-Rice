import React, { useState, useEffect } from 'react';
import { Search, Play, Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
import { Modal } from '../../components/ui/Modal';
import { PageTabs } from '../../components/PageTabs';

const generateDummyData = () => {
  return Array.from({ length: 40 }, (_, i) => {
    const isExport = i % 2 === 0;
    return {
      id: i + 1,
      orderId: `SO-00${(i + 1).toString().padStart(2, '0')}`,
      orderType: isExport ? 'Export' : 'Domestic',
      customerName: `Customer ${i+1}`,
      riceGrade: ['Basmati', 'Non-Basmati', 'Sona Masoori'][Math.floor(Math.random() * 3)],
      quantity: Math.floor(Math.random() * 50) + 10,
      totalOrderValue: Math.floor(Math.random() * 500000) + 100000,
      requiredDeliveryDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      
      verificationId: `CV-00${(i + 1).toString().padStart(2, '0')}`,
      creditLimit: isExport ? 'A+' : '500000',
      availableCredit: 250000,
      verificationStatus: ['Approved', 'Hold', 'Rejected'][Math.floor(Math.random() * 3)],
      verificationDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      verifiedBy: 'Finance Mgr',
      
      confirmationId: `OC-00${(i + 1).toString().padStart(2, '0')}`,
      finalQuantity: Math.floor(Math.random() * 50) + 10,
      finalRate: 45000,
      advanceReceived: 50000,
      confirmedDeliveryDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      confirmedBy: 'Sales Rep',
      
      allocationId: `AL-00${(i + 1).toString().padStart(2, '0')}`,
      quantityAllocated: Math.floor(Math.random() * 50) + 10,
      allocationStatus: ['Full', 'Partial', 'Backorder'][Math.floor(Math.random() * 3)],
      stockCheckDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      allocatedBy: 'Prod Mgr',
      
      completionId: `OCM-00${(i + 1).toString().padStart(2, '0')}`,
      totalQtySupplied: Math.floor(Math.random() * 50) + 10,
      totalValue: Math.floor(Math.random() * 500000) + 100000,
      completionDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      closedBy: 'Sales Admin',
      completionStatus: isExport ? 'Ready for Export Process' : 'Ready for Dispatch',
      
      status: 'Completed'
    };
  });
};

export const ProductionAllocationCheck = () => {
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
    if ('ProductionAllocationCheck' === 'CreditBuyerVerification') autoFields = { verificationId: 'CV-00' + Math.floor(Math.random()*100) };
    if ('ProductionAllocationCheck' === 'OrderConfirmation') autoFields = { confirmationId: 'OC-00' + Math.floor(Math.random()*100) };
    if ('ProductionAllocationCheck' === 'ProductionAllocationCheck') autoFields = { allocationId: 'AL-00' + Math.floor(Math.random()*100) };
    if ('ProductionAllocationCheck' === 'OrderCompletion') autoFields = { completionId: 'OCM-00' + Math.floor(Math.random()*100) };
    
    const readOnlyFields = ["confirmationId","orderId","allocationId"];
    const initialFormData = {};
    readOnlyFields.forEach(field => {
      initialFormData[field] = item[field];
    });
    
    setFormData({ ...initialFormData, ...autoFields });
    setIsModalOpen(true);
  };

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
          Allocate
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"Confirmation ID","accessor":"confirmationId"},{"header":"Order ID","accessor":"orderId"},{"header":"Order Type","accessor":"orderType"},{"header":"Rice Grade","accessor":"riceGrade"},{"header":"Final Quantity (MT)","accessor":"finalQuantity"},{"header":"Confirmed Delivery Date","accessor":"confirmedDeliveryDate"}];
  const historyCols = [{"header":"Allocation ID","accessor":"allocationId"},{"header":"Order ID","accessor":"orderId"},{"header":"Order Type","accessor":"orderType"},{"header":"Rice Grade","accessor":"riceGrade"},{"header":"Quantity Allocated (MT)","accessor":"quantityAllocated"},{"header":"Allocation Status","accessor":"allocationStatus"},{"header":"Stock Check Date","accessor":"stockCheckDate"},{"header":"Allocated By","accessor":"allocatedBy"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 4 - Production/Stock Allocation Check</h2>
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
        title="Allocation Details"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <Label>Confirmation ID</Label>
              <Input 
                type="text"
                value={formData.confirmationId || ''} 
                onChange={(e) => setFormData({...formData, confirmationId: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Order ID</Label>
              <Input 
                type="text"
                value={formData.orderId || ''} 
                onChange={(e) => setFormData({...formData, orderId: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Allocation ID</Label>
              <Input 
                type="text"
                value={formData.allocationId || ''} 
                onChange={(e) => setFormData({...formData, allocationId: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Stock Check Date</Label>
              <Input 
                type="date"
                value={formData.stockCheckDate || ''} 
                onChange={(e) => setFormData({...formData, stockCheckDate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>FG Stock Available (MT)</Label>
              <Input 
                type="number"
                value={formData.fgStockAvailable || ''} 
                onChange={(e) => setFormData({...formData, fgStockAvailable: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Quantity Allocated (MT)</Label>
              <Input 
                type="number"
                value={formData.quantityAllocated || ''} 
                onChange={(e) => setFormData({...formData, quantityAllocated: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Allocation Status</Label>
              <Select 
                value={formData.allocationStatus || ''} 
                onChange={(e) => setFormData({...formData, allocationStatus: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Allocation Status</option>
                <option value="Full">Full</option><option value="Partial">Partial</option><option value="Backorder">Backorder</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Expected Production Date</Label>
              <Input 
                type="date"
                value={formData.expectedProductionDate || ''} 
                onChange={(e) => setFormData({...formData, expectedProductionDate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Allocated By</Label>
              <Input 
                type="text"
                value={formData.allocatedBy || ''} 
                onChange={(e) => setFormData({...formData, allocatedBy: e.target.value})}
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
