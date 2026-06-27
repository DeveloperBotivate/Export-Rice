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
    orderId: `SO-2026-${(i + 1).toString().padStart(4, '0')}`,
    orderDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
    orderType: ['Domestic', 'Export'][Math.floor(Math.random() * 2)],
    customerName: `Customer ${i+1}`,
    customerPhone: `+91 9876543${(i+1).toString().padStart(3, '0')}`,
    customerEmail: `contact@customer${i+1}.com`,
    customerAddress: 'Mumbai, India',
    riceGradeRequired: ['Grade A', 'Grade B', 'Premium'][Math.floor(Math.random() * 3)],
    qtyRequired: Math.floor(Math.random() * 50) + 10,
    bagSizePreference: ['25kg', '50kg'][Math.floor(Math.random() * 2)],
    deliveryLocation: 'Warehouse 1',
    expectedDeliveryDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
    receivedBy: 'Sales Rep'
  }));
};

export const OrderReceive = () => {
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
    setFormData({ orderId: 'SO-' + Math.floor(Math.random()*10000) });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const newItem = { ...formData, id: Date.now() };
    setHistoryItems([newItem, ...historyItems]);
    setIsModalOpen(false);
  };

  const columns = [
    { header: 'Order ID', accessor: 'orderId' },
    { header: 'Order Date', accessor: 'orderDate' },
    { header: 'Order Type', accessor: 'orderType' },
    { header: 'Customer Name', accessor: 'customerName' },
    { header: 'Customer Phone', accessor: 'customerPhone' },
    { header: 'Customer Email', accessor: 'customerEmail' },
    { header: 'Customer Address / Country', accessor: 'customerAddress' },
    { header: 'Rice Grade Required', accessor: 'riceGradeRequired' },
    { header: 'Quantity Required (MT)', accessor: 'qtyRequired' },
    { header: 'Bag Size Preference', accessor: 'bagSizePreference' },
    { header: 'Delivery Location', accessor: 'deliveryLocation' },
    { header: 'Expected Delivery Date', accessor: 'expectedDeliveryDate' },
    { header: 'Received By', accessor: 'receivedBy' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Stage 1 - Order Receive</h2>
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
        title="Receive Sales Order"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Order ID</Label>
              <Input type="text" value={formData.orderId || ''} readOnly className="bg-slate-100" />
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
              <Label>Customer Name</Label>
              <Input type="text" value={formData.customerName || ''} onChange={(e) => setFormData({...formData, customerName: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Customer Phone</Label>
              <Input type="text" value={formData.customerPhone || ''} onChange={(e) => setFormData({...formData, customerPhone: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Customer Email</Label>
              <Input type="text" value={formData.customerEmail || ''} onChange={(e) => setFormData({...formData, customerEmail: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Customer Address / Country</Label>
              <Input type="text" value={formData.customerAddress || ''} onChange={(e) => setFormData({...formData, customerAddress: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Rice Grade Required</Label>
              <Input type="text" value={formData.riceGradeRequired || ''} onChange={(e) => setFormData({...formData, riceGradeRequired: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Quantity Required (MT)</Label>
              <Input type="number" value={formData.qtyRequired || ''} onChange={(e) => setFormData({...formData, qtyRequired: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Bag Size Preference</Label>
              <Input type="text" value={formData.bagSizePreference || ''} onChange={(e) => setFormData({...formData, bagSizePreference: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Delivery Location</Label>
              <Input type="text" value={formData.deliveryLocation || ''} onChange={(e) => setFormData({...formData, deliveryLocation: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Expected Delivery Date</Label>
              <Input type="date" value={formData.expectedDeliveryDate || ''} onChange={(e) => setFormData({...formData, expectedDeliveryDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Received By</Label>
              <Input type="text" value={formData.receivedBy || ''} onChange={(e) => setFormData({...formData, receivedBy: e.target.value})} />
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
