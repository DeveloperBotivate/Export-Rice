import React, { useState } from 'react';
import { Search, Plus, Play } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import DataTable from '../../components/DataTable';
import { usePagination } from '../../hooks/usePagination';
import { Modal } from '../../components/ui/Modal';
import { PageTabs } from '../../components/PageTabs';

const generateDummyData = () => {
  return Array.from({ length: 40 }, (_, i) => {
    const orderType = i % 2 === 0 ? 'Export' : 'Domestic';
    return {
      id: i + 1,
      sourceRef: orderType === 'Export' ? `EC-00${(i + 1).toString().padStart(2, '0')}` : `SO-00${(i + 1).toString().padStart(2, '0')}`,
      dispatchOrderNo: `DO-00${(i + 1).toString().padStart(2, '0')}`,
      orderType: orderType,
      customerName: `Customer ${i+1}`,
      riceGrade: ['Basmati', 'Non-Basmati'][Math.floor(Math.random() * 2)],
      quantity: Math.floor(Math.random() * 50) + 10,
      requiredDispatchDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      priority: ['Normal', 'Urgent'][Math.floor(Math.random() * 2)],
      orderDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      customerPhone: '+1234567890',
      noOfBags: 500,
      bagSize: '50kg',
      createdBy: 'Dispatcher',
      status: 'Completed'
    };
  });
};

export const DispatchOrder = () => {
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
    setFormData({
      sourceRef: item.sourceRef,
      orderType: item.orderType,
      customerName: item.customerName,
      riceGrade: item.riceGrade,
      quantity: item.quantity,
      dispatchOrderNo: 'DO-00' + Math.floor(Math.random()*100)
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const newItem = { ...selectedItem, ...formData, status: 'Completed' };
    setHistoryItems([newItem, ...historyItems]);
    setPendingItems(pendingItems.filter(p => p.id !== selectedItem.id));
    setIsModalOpen(false);
  };

  const pendingCols = [
    {
      header: 'Action',
      className: 'text-right',
      cell: (row) => (
        <div className="flex justify-end">
          <Button size="sm" onClick={() => handleActionClick(row)} className="flex items-center gap-1 bg-primary text-white">
            <Play size={14} /> Dispatch
          </Button>
        </div>
      )
    },
    { header: 'Order Type', accessor: 'orderType', cell: (row) => (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${row.orderType === 'Export' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
        {row.orderType}
      </span>
    )},
    { header: 'Source Ref', accessor: 'sourceRef' },
    { header: 'Customer/Buyer Name', accessor: 'customerName' },
    { header: 'Rice Grade', accessor: 'riceGrade' },
    { header: 'Quantity (MT)', accessor: 'quantity' },
    { header: 'Required Dispatch Date', accessor: 'requiredDispatchDate' },
    { header: 'Priority', accessor: 'priority' }
  ];

  const historyCols = [
    { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
    { header: 'Order Type', accessor: 'orderType', cell: (row) => (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${row.orderType === 'Export' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
        {row.orderType}
      </span>
    )},
    { header: 'Source Ref', accessor: 'sourceRef' },
    { header: 'Customer/Buyer Name', accessor: 'customerName' },
    { header: 'Rice Grade', accessor: 'riceGrade' },
    { header: 'Quantity (MT)', accessor: 'quantity' },
    { header: 'No. of Bags', accessor: 'noOfBags' },
    { header: 'Required Dispatch Date', accessor: 'requiredDispatchDate' },
    { header: 'Priority', accessor: 'priority' },
    { header: 'Created By', accessor: 'createdBy' },
    { header: 'Status', accessor: 'status' }
  ];

  const columns = activeTab === 'pending' ? pendingCols : historyCols;

  const domesticPending = pendingItems.filter(i => i.orderType === 'Domestic').length;
  const exportPending = pendingItems.filter(i => i.orderType === 'Export').length;
  const totalPending = pendingItems.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Stage 1 - Dispatch Order</h2>
        <div className="flex gap-4">
          <div className="bg-slate-100 px-3 py-1.5 rounded-md text-sm">Total Pending: <span className="font-bold">{totalPending}</span></div>
          <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-md text-sm border border-green-200">Domestic: <span className="font-bold">{domesticPending}</span></div>
          <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md text-sm border border-blue-200">Export: <span className="font-bold">{exportPending}</span></div>
        </div>
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
        title="Create Dispatch Order"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Dispatch Order No</Label>
              <Input type="text" value={formData.dispatchOrderNo || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Order Type</Label>
              <Input type="text" value={formData.orderType || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Source Reference</Label>
              <Input type="text" value={formData.sourceRef || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Order Date</Label>
              <Input type="date" value={formData.orderDate || ''} onChange={(e) => setFormData({...formData, orderDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Customer/Buyer Name</Label>
              <Input type="text" value={formData.customerName || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Customer Phone / Buyer Country</Label>
              <Input type="text" value={formData.customerPhone || ''} onChange={(e) => setFormData({...formData, customerPhone: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Delivery Address / Port of Loading</Label>
              <Input type="text" value={formData.deliveryAddress || ''} onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})} />
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
              <Input type="date" value={formData.requiredDispatchDate || ''} onChange={(e) => setFormData({...formData, requiredDispatchDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Priority</Label>
              <Select value={formData.priority || ''} onChange={(e) => setFormData({...formData, priority: e.target.value})}>
                <option value="">Select Priority</option>
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
