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
    const price = Math.floor(Math.random() * 50000) + 40000;
    
    return {
      id: i + 1,
      orderId: `SO-2026-${(i + 1).toString().padStart(4, '0')}`,
      orderDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      orderType: ['Domestic', 'Export'][Math.floor(Math.random() * 2)],
      customerName: `Customer ${i+1}`,
      customerPhone: `+91 9876543${(i+1).toString().padStart(3, '0')}`,
      customerEmail: `contact@customer${i+1}.com`,
      customerAddress: 'Mumbai, India',
      riceGradeRequired: ['Grade A', 'Grade B', 'Premium'][Math.floor(Math.random() * 3)],
      qtyRequired: qty,
      bagSizePreference: ['25kg', '50kg'][Math.floor(Math.random() * 2)],
      deliveryLocation: 'Warehouse 1',
      expectedDeliveryDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      receivedBy: 'Sales Rep',
      
      quotationNo: `QT-${(i + 1).toString().padStart(4, '0')}`,
      quotationDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      quotedQty: qty,
      quotedPrice: price,
      totalValue: qty * price,
      validTill: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      quotationBy: 'Sales Manager',

      followUpId: `FU-${(i + 1).toString().padStart(4, '0')}`,
      followUpDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      customerDecision: ['Accepted', 'Negotiating', 'Rejected'][Math.floor(Math.random() * 3)],
      counterOffer: price - 500,
      nextFollowUpDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      handledBy: 'Sales Rep',

      orderApprovalId: `OA-${(i + 1).toString().padStart(4, '0')}`,
      approvedPrice: price - 200,
      approvedQty: qty,
      specialDiscount: 2,
      paymentAdvance: 50000,
      creditDays: 30,
      orderApprovedBy: 'Sales Director',
      approvalDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,

      orderCompletionId: `OC-${(i + 1).toString().padStart(4, '0')}`,
      totalQtySupplied: qty,
      invoiceRef: `INV-${(i + 1).toString().padStart(4, '0')}`,
      dispatchRef: `DISP-${(i + 1).toString().padStart(4, '0')}`,
      totalValueSupplied: qty * (price - 200),
      balancePayment: 0,
      paymentReceived: 'Yes',
      orderStatus: 'Completed',
      closedBy: 'Finance Head',
      completionDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,

      status: 'Completed'
    };
  });
};

export const OrderCompletion = () => {
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
    
    
    
    autoFields = { orderCompletionId: 'OC-' + Math.floor(Math.random()*10000) };
    
    const readOnlyFields = ["orderId","orderApprovalId","orderCompletionId"];
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
          Complete Order
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"Order Approval ID","accessor":"orderApprovalId"},{"header":"Order ID","accessor":"orderId"},{"header":"Customer Name","accessor":"customerName"},{"header":"Rice Grade","accessor":"riceGradeRequired"},{"header":"Approved Qty (MT)","accessor":"approvedQty"},{"header":"Approved Price (₹/MT)","accessor":"approvedPrice"},{"header":"Approval Date","accessor":"approvalDate"}];
  const historyCols = [{"header":"Order Completion ID","accessor":"orderCompletionId"},{"header":"Order ID","accessor":"orderId"},{"header":"Customer Name","accessor":"customerName"},{"header":"Rice Grade","accessor":"riceGradeRequired"},{"header":"Total Qty Supplied (MT)","accessor":"totalQtySupplied"},{"header":"Invoice Ref","accessor":"invoiceRef"},{"header":"Dispatch Ref","accessor":"dispatchRef"},{"header":"Total Value (₹)","accessor":"totalValueSupplied"},{"header":"Balance Payment (₹)","accessor":"balancePayment"},{"header":"Payment Received","accessor":"paymentReceived"},{"header":"Order Status","accessor":"orderStatus"},{"header":"Closed By","accessor":"closedBy"},{"header":"Completion Date","accessor":"completionDate"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 5 - Order Completion</h2>
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
        title="Completion Details"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            
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
              <Label>Order Approval ID</Label>
              <Input 
                type="text"
                value={formData.orderApprovalId || ''} 
                onChange={(e) => setFormData({...formData, orderApprovalId: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Order Completion ID</Label>
              <Input 
                type="text"
                value={formData.orderCompletionId || ''} 
                onChange={(e) => setFormData({...formData, orderCompletionId: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Completion Date</Label>
              <Input 
                type="date"
                value={formData.completionDate || ''} 
                onChange={(e) => setFormData({...formData, completionDate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Quantity Supplied (MT)</Label>
              <Input 
                type="number"
                value={formData.totalQtySupplied || ''} 
                onChange={(e) => setFormData({...formData, totalQtySupplied: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Invoice Reference</Label>
              <Input 
                type="text"
                value={formData.invoiceRef || ''} 
                onChange={(e) => setFormData({...formData, invoiceRef: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Dispatch Reference</Label>
              <Input 
                type="text"
                value={formData.dispatchRef || ''} 
                onChange={(e) => setFormData({...formData, dispatchRef: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Value (₹)</Label>
              <Input 
                type="number"
                value={formData.totalValueSupplied || ''} 
                onChange={(e) => setFormData({...formData, totalValueSupplied: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Balance Payment (₹)</Label>
              <Input 
                type="number"
                value={formData.balancePayment || ''} 
                onChange={(e) => setFormData({...formData, balancePayment: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Payment Received (Y/N)</Label>
              <Select 
                value={formData.paymentReceived || ''} 
                onChange={(e) => setFormData({...formData, paymentReceived: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Payment Received (Y/N)</option>
                <option value="Yes">Yes</option><option value="No">No</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Order Status (Completed / Partial)</Label>
              <Select 
                value={formData.orderStatus || ''} 
                onChange={(e) => setFormData({...formData, orderStatus: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Order Status (Completed / Partial)</option>
                <option value="Completed">Completed</option><option value="Partial">Partial</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Closed By</Label>
              <Input 
                type="text"
                value={formData.closedBy || ''} 
                onChange={(e) => setFormData({...formData, closedBy: e.target.value})}
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
