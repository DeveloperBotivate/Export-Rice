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

export const OrderApproval = () => {
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
    
    
    autoFields = { orderApprovalId: 'OA-' + Math.floor(Math.random()*10000) };
    
    
    const readOnlyFields = ["orderId","quotationNo","followUpId","orderApprovalId"];
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
          Approve Order
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"Follow-up ID","accessor":"followUpId"},{"header":"Order ID","accessor":"orderId"},{"header":"Quotation No","accessor":"quotationNo"},{"header":"Customer Name","accessor":"customerName"},{"header":"Rice Grade","accessor":"riceGradeRequired"},{"header":"Customer Decision","accessor":"customerDecision"},{"header":"Counter Offer","accessor":"counterOffer"},{"header":"Next Follow-up Date","accessor":"nextFollowUpDate"}];
  const historyCols = [{"header":"Order Approval ID","accessor":"orderApprovalId"},{"header":"Order ID","accessor":"orderId"},{"header":"Quotation No","accessor":"quotationNo"},{"header":"Customer Name","accessor":"customerName"},{"header":"Approved Price (₹/MT)","accessor":"approvedPrice"},{"header":"Approved Qty (MT)","accessor":"approvedQty"},{"header":"Special Discount %","accessor":"specialDiscount"},{"header":"Payment Advance (₹)","accessor":"paymentAdvance"},{"header":"Credit Days","accessor":"creditDays"},{"header":"Approved By","accessor":"orderApprovedBy"},{"header":"Approval Date","accessor":"approvalDate"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Stage 4 - Order Approval</h2>
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
        title="Order Approval Details"
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
              <Label>Quotation No</Label>
              <Input 
                type="text"
                value={formData.quotationNo || ''} 
                onChange={(e) => setFormData({...formData, quotationNo: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Follow-up ID</Label>
              <Input 
                type="text"
                value={formData.followUpId || ''} 
                onChange={(e) => setFormData({...formData, followUpId: e.target.value})}
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
              <Label>Approved Price (₹/MT)</Label>
              <Input 
                type="number"
                value={formData.approvedPrice || ''} 
                onChange={(e) => setFormData({...formData, approvedPrice: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Approved Quantity (MT)</Label>
              <Input 
                type="number"
                value={formData.approvedQty || ''} 
                onChange={(e) => setFormData({...formData, approvedQty: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Special Discount (%)</Label>
              <Input 
                type="number"
                value={formData.specialDiscount || ''} 
                onChange={(e) => setFormData({...formData, specialDiscount: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Payment Advance (₹)</Label>
              <Input 
                type="number"
                value={formData.paymentAdvance || ''} 
                onChange={(e) => setFormData({...formData, paymentAdvance: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Credit Days</Label>
              <Input 
                type="number"
                value={formData.creditDays || ''} 
                onChange={(e) => setFormData({...formData, creditDays: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Approved By</Label>
              <Input 
                type="text"
                value={formData.orderApprovedBy || ''} 
                onChange={(e) => setFormData({...formData, orderApprovedBy: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Approval Date</Label>
              <Input 
                type="date"
                value={formData.approvalDate || ''} 
                onChange={(e) => setFormData({...formData, approvalDate: e.target.value})}
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
