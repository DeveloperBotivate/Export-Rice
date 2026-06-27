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
    dispatchOrderNo: `DO-${(i + 1).toString().padStart(4, '0')}`,
    orderDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
    orderType: 'Domestic',
    salesOrderRef: `SO-${(i + 1).toString().padStart(4, '0')}`,
    customerName: `Customer ${i+1}`,
    customerGst: `27AAAC${i}1234K1Z1`,
    riceGrade: 'Premium Basmati',
    quantity: Math.floor(Math.random() * 50) + 10,
    noOfBags: (Math.floor(Math.random() * 50) + 10) * 40,
    reqDispatchDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
    priority: 'Normal',
    createdBy: 'Sales Exec',
    status: 'Active'
  }));
};

export const DispatchOrder = () => {
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
    setFormData({ dispatchOrderNo: 'DO-' + Math.floor(Math.random()*10000) });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const newItem = { ...formData, id: Date.now(), status: 'Active' };
    setHistoryItems([newItem, ...historyItems]);
    setIsModalOpen(false);
  };

  const columns = [
    { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
    { header: 'Order Date', accessor: 'orderDate' },
    { header: 'Order Type', accessor: 'orderType' },
    { header: 'Sales Order Ref', accessor: 'salesOrderRef' },
    { header: 'Customer Name', accessor: 'customerName' },
    { header: 'Customer GSTIN', accessor: 'customerGst' },
    { header: 'Rice Grade', accessor: 'riceGrade' },
    { header: 'Quantity (MT)', accessor: 'quantity' },
    { header: 'No. of Bags', accessor: 'noOfBags' },
    { header: 'Req Dispatch Date', accessor: 'reqDispatchDate' },
    { header: 'Priority', accessor: 'priority' },
    { header: 'Created By', accessor: 'createdBy' },
    { header: 'Status', accessor: 'status' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Stage 1 - Dispatch Order</h2>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus size={16} /> Receive Order
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
        title="Receive Dispatch Order"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Dispatch Order No</Label>
              <Input type="text" value={formData.dispatchOrderNo || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Order Date</Label>
              <Input type="date" value={formData.orderDate || ''} onChange={(e) => setFormData({...formData, orderDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Order Type</Label>
              <Select value={formData.orderType || ''} onChange={(e) => setFormData({...formData, orderType: e.target.value})}>
                <option value="">Select Type</option>
                <option value="Domestic">Domestic</option>
                <option value="Export">Export</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Sales Order Ref</Label>
              <Input type="text" value={formData.salesOrderRef || ''} onChange={(e) => setFormData({...formData, salesOrderRef: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Customer Name</Label>
              <Input type="text" value={formData.customerName || ''} onChange={(e) => setFormData({...formData, customerName: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Customer Phone</Label>
              <Input type="text" value={formData.customerPhone || ''} onChange={(e) => setFormData({...formData, customerPhone: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Customer GSTIN</Label>
              <Input type="text" value={formData.customerGst || ''} onChange={(e) => setFormData({...formData, customerGst: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Delivery Address</Label>
              <Input type="text" value={formData.deliveryAddress || ''} onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Delivery State</Label>
              <Input type="text" value={formData.deliveryState || ''} onChange={(e) => setFormData({...formData, deliveryState: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Delivery Pin Code</Label>
              <Input type="text" value={formData.deliveryPinCode || ''} onChange={(e) => setFormData({...formData, deliveryPinCode: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Rice Grade</Label>
              <Input type="text" value={formData.riceGrade || ''} onChange={(e) => setFormData({...formData, riceGrade: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Quantity (MT)</Label>
              <Input type="number" value={formData.quantity || ''} onChange={(e) => setFormData({...formData, quantity: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>No. of Bags</Label>
              <Input type="number" value={formData.noOfBags || ''} onChange={(e) => setFormData({...formData, noOfBags: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Bag Size</Label>
              <Input type="text" value={formData.bagSize || ''} onChange={(e) => setFormData({...formData, bagSize: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Required Dispatch Date</Label>
              <Input type="date" value={formData.reqDispatchDate || ''} onChange={(e) => setFormData({...formData, reqDispatchDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Priority</Label>
              <Select value={formData.priority || ''} onChange={(e) => setFormData({...formData, priority: e.target.value})}>
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Special Instructions</Label>
              <Input type="text" value={formData.specialInstructions || ''} onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Created By</Label>
              <Input type="text" value={formData.createdBy || ''} onChange={(e) => setFormData({...formData, createdBy: e.target.value})} />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
            <Button onClick={() => setIsModalOpen(false)} variant="outline">Cancel</Button>
            <Button onClick={handleSave}>Save Order</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
