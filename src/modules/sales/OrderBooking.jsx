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
    orderId: `SO-00${(i + 1).toString().padStart(2, '0')}`,
    orderType: ['Domestic', 'Export'][Math.floor(Math.random() * 2)],
    orderDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
    customerName: `Customer ${i+1}`,
    customerPhone: `+91 9876543${(i+1).toString().padStart(3, '0')}`,
    customerGstin: `27AABCU9603R1Z${i%9}`,
    riceGrade: ['Basmati', 'Non-Basmati', 'Sona Masoori'][Math.floor(Math.random() * 3)],
    quantity: Math.floor(Math.random() * 50) + 10,
    rate: 45000,
    totalOrderValue: Math.floor(Math.random() * 500000) + 100000,
    deliveryTerms: 'FOB',
    paymentTerms: 'Advance',
    requiredDeliveryDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
    bookedBy: 'Sales Rep',
    status: 'Booked'
  }));
};

export const OrderBooking = () => {
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
    setFormData({ orderId: 'SO-00' + Math.floor(Math.random()*100) });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const newItem = { ...formData, id: Date.now(), status: 'Booked' };
    setHistoryItems([newItem, ...historyItems]);
    setIsModalOpen(false);
  };

  const columns = [
    { header: 'Order ID', accessor: 'orderId' },
    { header: 'Order Type', accessor: 'orderType' },
    { header: 'Order Date', accessor: 'orderDate' },
    { header: 'Customer/Buyer Name', accessor: 'customerName' },
    { header: 'Rice Grade', accessor: 'riceGrade' },
    { header: 'Quantity (MT)', accessor: 'quantity' },
    { header: 'Rate', accessor: 'rate' },
    { header: 'Total Order Value', accessor: 'totalOrderValue' },
    { header: 'Required Delivery Date', accessor: 'requiredDeliveryDate' },
    { header: 'Booked By', accessor: 'bookedBy' },
    { header: 'Status', accessor: 'status' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Stage 1 - Order Booking</h2>
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus size={16} /> Create Order
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
        title="Create Order"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Order ID</Label>
              <Input type="text" value={formData.orderId || ''} readOnly className="bg-slate-100" />
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
              <Label>Order Date</Label>
              <Input type="date" value={formData.orderDate || ''} onChange={(e) => setFormData({...formData, orderDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Customer/Buyer Name</Label>
              <Input type="text" value={formData.customerName || ''} onChange={(e) => setFormData({...formData, customerName: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Customer Phone / Buyer Country</Label>
              <Input type="text" value={formData.customerPhone || ''} onChange={(e) => setFormData({...formData, customerPhone: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Customer GSTIN / Buyer Address</Label>
              <Input type="text" value={formData.customerGstin || ''} onChange={(e) => setFormData({...formData, customerGstin: e.target.value})} />
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
              <Label>Rate (₹/MT or $/MT)</Label>
              <Input type="number" value={formData.rate || ''} onChange={(e) => setFormData({...formData, rate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Total Order Value</Label>
              <Input type="number" value={formData.totalOrderValue || ''} onChange={(e) => setFormData({...formData, totalOrderValue: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Delivery Terms</Label>
              <Input type="text" value={formData.deliveryTerms || ''} onChange={(e) => setFormData({...formData, deliveryTerms: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Payment Terms</Label>
              <Input type="text" value={formData.paymentTerms || ''} onChange={(e) => setFormData({...formData, paymentTerms: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Required Delivery Date</Label>
              <Input type="date" value={formData.requiredDeliveryDate || ''} onChange={(e) => setFormData({...formData, requiredDeliveryDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Sales Person / Booked By</Label>
              <Input type="text" value={formData.bookedBy || ''} onChange={(e) => setFormData({...formData, bookedBy: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Remarks</Label>
              <Input type="text" value={formData.remarks || ''} onChange={(e) => setFormData({...formData, remarks: e.target.value})} />
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
