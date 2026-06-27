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
  return Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    confirmationId: `CF-${(i + 1).toString().padStart(4, '0')}`,
    invoiceNo: `INV-${(i + 1).toString().padStart(4, '0')}`,
    dispatchOrderNo: `DO-${(i + 1).toString().padStart(4, '0')}`,
    customerName: `Customer ${i+1}`,
    customerGst: `27AAAC${i}1234K1Z1`,
    invoiceAmount: (Math.floor(Math.random() * 50) + 10) * 45000,
    outstandingAmount: (Math.floor(Math.random() * 50) + 10) * 45000,
    confirmationDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
    deliveryStatus: 'Complete',
    invoiceDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
    paymentDueDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
    status: 'Pending'
  }));
};

export const AccountsReceivable = () => {
  const [pendingItems, setPendingItems] = useState(generateDummyData().slice(0, 20));
  const [historyItems, setHistoryItems] = useState(generateDummyData().slice(20, 40));
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);

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
      ...item,
      arId: 'AR-' + Math.floor(Math.random()*10000),
      paymentReceived: 0,
      outstanding: item.invoiceAmount
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen && formData && selectedItem) {
      const inv = parseFloat(selectedItem.invoiceAmount) || 0;
      const rec = parseFloat(formData.paymentReceived) || 0;
      const out = inv - rec;
      if (formData.outstanding !== out) {
        setFormData(prev => ({ ...prev, outstanding: out }));
      }
    }
  }, [formData, isModalOpen, selectedItem]);

  const handleSave = () => {
    const newItem = { ...formData, id: Date.now(), status: 'Paid' };
    setHistoryItems([newItem, ...historyItems]);
    setPendingItems(pendingItems.filter(p => p.id !== selectedItem.id));
    setIsModalOpen(false);
  };

  const actionColumn = {
    header: 'Action',
    className: 'text-right',
    cell: (row) => (
      <div className="flex justify-end">
        <Button size="sm" onClick={() => handleActionClick(row)} className="flex items-center gap-1 bg-primary text-white">
          <Play size={14} /> Process AR
        </Button>
      </div>
    )
  };

  const pendingCols = [
    { header: 'Confirmation ID', accessor: 'confirmationId' },
    { header: 'Invoice No', accessor: 'invoiceNo' },
    { header: 'Dispatch Order No', accessor: 'dispatchOrderNo' },
    { header: 'Customer Name', accessor: 'customerName' },
    { header: 'Invoice Amount (₹)', accessor: 'invoiceAmount' },
    { header: 'Outstanding Amount (₹)', accessor: 'outstandingAmount' },
    { header: 'Confirmation Date', accessor: 'confirmationDate' },
    { header: 'Delivery Status', accessor: 'deliveryStatus' }
  ];

  const historyCols = [
    { header: 'AR ID', accessor: 'arId' },
    { header: 'Confirmation ID', accessor: 'confirmationId' },
    { header: 'Invoice No', accessor: 'invoiceNo' },
    { header: 'Customer Name', accessor: 'customerName' },
    { header: 'Invoice Amount (₹)', accessor: 'invoiceAmount' },
    { header: 'Payment Received (₹)', accessor: 'paymentReceived' },
    { header: 'Outstanding (₹)', accessor: 'outstanding' },
    { header: 'Payment Mode', accessor: 'paymentMode' },
    { header: 'Status', accessor: 'status' }
  ];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Stage 1 - Accounts Receivable</h2>
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
        title="Accounts Receivable Details"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Confirmation ID</Label>
              <Input type="text" value={formData.confirmationId || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Invoice No</Label>
              <Input type="text" value={formData.invoiceNo || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>AR ID</Label>
              <Input type="text" value={formData.arId || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Customer Name</Label>
              <Input type="text" value={formData.customerName || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Invoice Date</Label>
              <Input type="date" value={formData.invoiceDate || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Invoice Amount (₹)</Label>
              <Input type="number" value={formData.invoiceAmount || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Payment Due Date</Label>
              <Input type="date" value={formData.paymentDueDate || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Payment Received (₹)</Label>
              <Input type="number" value={formData.paymentReceived || ''} onChange={(e) => setFormData({...formData, paymentReceived: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Payment Date</Label>
              <Input type="date" value={formData.paymentDate || ''} onChange={(e) => setFormData({...formData, paymentDate: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Payment Mode</Label>
              <Select value={formData.paymentMode || ''} onChange={(e) => setFormData({...formData, paymentMode: e.target.value})}>
                <option value="NEFT">NEFT</option>
                <option value="RTGS">RTGS</option>
                <option value="Cheque">Cheque</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>UTR/Reference No</Label>
              <Input type="text" value={formData.utrNo || ''} onChange={(e) => setFormData({...formData, utrNo: e.target.value})} />
            </div>
            <div className="space-y-1.5">
              <Label>Outstanding (₹)</Label>
              <Input type="number" value={formData.outstanding || ''} readOnly className="bg-slate-100" />
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select value={formData.arStatus || ''} onChange={(e) => setFormData({...formData, arStatus: e.target.value})}>
                <option value="Current">Current</option>
                <option value="Overdue">Overdue</option>
                <option value="Partially Paid">Partially Paid</option>
                <option value="Written-off">Written-off</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Remarks</Label>
              <Input type="text" value={formData.remarks || ''} onChange={(e) => setFormData({...formData, remarks: e.target.value})} />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
            <Button onClick={() => setIsModalOpen(false)} variant="outline">Cancel</Button>
            <Button onClick={handleSave}>Save Record</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
