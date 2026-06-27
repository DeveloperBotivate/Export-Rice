const fs = require('fs');
const path = require('path');

const stages = [
  {
    file: 'SentQuotation.jsx', name: 'SentQuotation', title: 'Stage 2 - Sent Quotation', action: 'Send Quotation', modalTitle: 'Quotation Details',
    pendingCols: [
      { header: 'Order ID', accessor: 'orderId' }, { header: 'Order Date', accessor: 'orderDate' },
      { header: 'Order Type', accessor: 'orderType' }, { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Rice Grade', accessor: 'riceGradeRequired' }, { header: 'Qty Required (MT)', accessor: 'qtyRequired' },
      { header: 'Delivery Location', accessor: 'deliveryLocation' }, { header: 'Expected Delivery Date', accessor: 'expectedDeliveryDate' },
      { header: 'Received By', accessor: 'receivedBy' }
    ],
    historyCols: [
      { header: 'Quotation No', accessor: 'quotationNo' }, { header: 'Order ID', accessor: 'orderId' },
      { header: 'Quotation Date', accessor: 'quotationDate' }, { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Rice Grade', accessor: 'riceGradeRequired' }, { header: 'Quantity (MT)', accessor: 'quotedQty' },
      { header: 'Quoted Price (₹ or $/MT)', accessor: 'quotedPrice' }, { header: 'Total Value', accessor: 'totalValue' },
      { header: 'Valid Till', accessor: 'validTill' }, { header: 'Quotation By', accessor: 'quotationBy' }
    ],
    fields: [
      { label: 'Order ID', name: 'orderId', type: 'text', readOnly: true },
      { label: 'Quotation No', name: 'quotationNo', type: 'text', readOnly: true },
      { label: 'Quotation Date', name: 'quotationDate', type: 'date' },
      { label: 'Customer Name', name: 'customerName', type: 'text', readOnly: true },
      { label: 'Rice Grade', name: 'riceGradeRequired', type: 'text', readOnly: true },
      { label: 'Quantity (MT)', name: 'quotedQty', type: 'number' },
      { label: 'Price (₹/MT or $/MT for Export)', name: 'quotedPrice', type: 'number' },
      { label: 'Total Value', name: 'totalValue', type: 'number', readOnly: true },
      { label: 'Payment Terms', name: 'paymentTerms', type: 'select', options: ['Advance', 'Net 15', 'Net 30', 'Net 60'] },
      { label: 'Delivery Terms (FOB / CIF / Ex-Mill)', name: 'deliveryTerms', type: 'select', options: ['FOB', 'CIF', 'Ex-Mill'] },
      { label: 'Quotation Validity (Days)', name: 'validityDays', type: 'number' },
      { label: 'Quotation By', name: 'quotationBy', type: 'text' },
      { label: 'Special Conditions', name: 'specialConditions', type: 'text' }
    ]
  },
  {
    file: 'OrderFollowUp.jsx', name: 'OrderFollowUp', title: 'Stage 3 - Order Follow-up', action: 'Follow Up', modalTitle: 'Follow-up Details',
    pendingCols: [
      { header: 'Quotation No', accessor: 'quotationNo' }, { header: 'Order ID', accessor: 'orderId' },
      { header: 'Customer Name', accessor: 'customerName' }, { header: 'Rice Grade', accessor: 'riceGradeRequired' },
      { header: 'Quantity (MT)', accessor: 'quotedQty' }, { header: 'Quoted Price', accessor: 'quotedPrice' },
      { header: 'Total Value', accessor: 'totalValue' }, { header: 'Valid Till', accessor: 'validTill' }
    ],
    historyCols: [
      { header: 'Follow-up ID', accessor: 'followUpId' }, { header: 'Quotation No', accessor: 'quotationNo' },
      { header: 'Order ID', accessor: 'orderId' }, { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Follow-up Date', accessor: 'followUpDate' }, { header: 'Customer Decision', accessor: 'customerDecision' },
      { header: 'Counter Offer', accessor: 'counterOffer' }, { header: 'Next Follow-up Date', accessor: 'nextFollowUpDate' },
      { header: 'Handled By', accessor: 'handledBy' }
    ],
    fields: [
      { label: 'Quotation No', name: 'quotationNo', type: 'text', readOnly: true },
      { label: 'Order ID', name: 'orderId', type: 'text', readOnly: true },
      { label: 'Follow-up ID', name: 'followUpId', type: 'text', readOnly: true },
      { label: 'Follow-up Date', name: 'followUpDate', type: 'date' },
      { label: 'Customer Feedback', name: 'customerFeedback', type: 'text' },
      { label: 'Counter Offer (if any) (₹/MT)', name: 'counterOffer', type: 'number' },
      { label: 'Customer Decision', name: 'customerDecision', type: 'select', options: ['Accepted', 'Negotiating', 'Rejected'] },
      { label: 'Next Follow-up Date', name: 'nextFollowUpDate', type: 'date' },
      { label: 'Handled By', name: 'handledBy', type: 'text' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'OrderApproval.jsx', name: 'OrderApproval', title: 'Stage 4 - Order Approval', action: 'Approve Order', modalTitle: 'Order Approval Details',
    pendingCols: [
      { header: 'Follow-up ID', accessor: 'followUpId' }, { header: 'Order ID', accessor: 'orderId' },
      { header: 'Quotation No', accessor: 'quotationNo' }, { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Rice Grade', accessor: 'riceGradeRequired' }, { header: 'Customer Decision', accessor: 'customerDecision' },
      { header: 'Counter Offer', accessor: 'counterOffer' }, { header: 'Next Follow-up Date', accessor: 'nextFollowUpDate' }
    ],
    historyCols: [
      { header: 'Order Approval ID', accessor: 'orderApprovalId' }, { header: 'Order ID', accessor: 'orderId' },
      { header: 'Quotation No', accessor: 'quotationNo' }, { header: 'Customer Name', accessor: 'customerName' },
      { header: 'Approved Price (₹/MT)', accessor: 'approvedPrice' }, { header: 'Approved Qty (MT)', accessor: 'approvedQty' },
      { header: 'Special Discount %', accessor: 'specialDiscount' }, { header: 'Payment Advance (₹)', accessor: 'paymentAdvance' },
      { header: 'Credit Days', accessor: 'creditDays' }, { header: 'Approved By', accessor: 'orderApprovedBy' },
      { header: 'Approval Date', accessor: 'approvalDate' }
    ],
    fields: [
      { label: 'Order ID', name: 'orderId', type: 'text', readOnly: true },
      { label: 'Quotation No', name: 'quotationNo', type: 'text', readOnly: true },
      { label: 'Follow-up ID', name: 'followUpId', type: 'text', readOnly: true },
      { label: 'Order Approval ID', name: 'orderApprovalId', type: 'text', readOnly: true },
      { label: 'Approved Price (₹/MT)', name: 'approvedPrice', type: 'number' },
      { label: 'Approved Quantity (MT)', name: 'approvedQty', type: 'number' },
      { label: 'Special Discount (%)', name: 'specialDiscount', type: 'number' },
      { label: 'Payment Advance (₹)', name: 'paymentAdvance', type: 'number' },
      { label: 'Credit Days', name: 'creditDays', type: 'number' },
      { label: 'Approved By', name: 'orderApprovedBy', type: 'text' },
      { label: 'Approval Date', name: 'approvalDate', type: 'date' },
      { label: 'Remarks', name: 'remarks', type: 'text' }
    ]
  },
  {
    file: 'OrderCompletion.jsx', name: 'OrderCompletion', title: 'Stage 5 - Order Completion', action: 'Complete Order', modalTitle: 'Completion Details',
    pendingCols: [
      { header: 'Order Approval ID', accessor: 'orderApprovalId' }, { header: 'Order ID', accessor: 'orderId' },
      { header: 'Customer Name', accessor: 'customerName' }, { header: 'Rice Grade', accessor: 'riceGradeRequired' },
      { header: 'Approved Qty (MT)', accessor: 'approvedQty' }, { header: 'Approved Price (₹/MT)', accessor: 'approvedPrice' },
      { header: 'Approval Date', accessor: 'approvalDate' }
    ],
    historyCols: [
      { header: 'Order Completion ID', accessor: 'orderCompletionId' }, { header: 'Order ID', accessor: 'orderId' },
      { header: 'Customer Name', accessor: 'customerName' }, { header: 'Rice Grade', accessor: 'riceGradeRequired' },
      { header: 'Total Qty Supplied (MT)', accessor: 'totalQtySupplied' }, { header: 'Invoice Ref', accessor: 'invoiceRef' },
      { header: 'Dispatch Ref', accessor: 'dispatchRef' }, { header: 'Total Value (₹)', accessor: 'totalValueSupplied' },
      { header: 'Balance Payment (₹)', accessor: 'balancePayment' }, { header: 'Payment Received', accessor: 'paymentReceived' },
      { header: 'Order Status', accessor: 'orderStatus' }, { header: 'Closed By', accessor: 'closedBy' },
      { header: 'Completion Date', accessor: 'completionDate' }
    ],
    fields: [
      { label: 'Order ID', name: 'orderId', type: 'text', readOnly: true },
      { label: 'Order Approval ID', name: 'orderApprovalId', type: 'text', readOnly: true },
      { label: 'Order Completion ID', name: 'orderCompletionId', type: 'text', readOnly: true },
      { label: 'Completion Date', name: 'completionDate', type: 'date' },
      { label: 'Total Quantity Supplied (MT)', name: 'totalQtySupplied', type: 'number' },
      { label: 'Invoice Reference', name: 'invoiceRef', type: 'text' },
      { label: 'Dispatch Reference', name: 'dispatchRef', type: 'text' },
      { label: 'Total Value (₹)', name: 'totalValueSupplied', type: 'number' },
      { label: 'Balance Payment (₹)', name: 'balancePayment', type: 'number' },
      { label: 'Payment Received (Y/N)', name: 'paymentReceived', type: 'select', options: ['Yes', 'No'] },
      { label: 'Order Status (Completed / Partial)', name: 'orderStatus', type: 'select', options: ['Completed', 'Partial'] },
      { label: 'Closed By', name: 'closedBy', type: 'text' }
    ]
  }
];

const template = (stage) => `import React, { useState, useEffect } from 'react';
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
      orderId: \`SO-2026-\${(i + 1).toString().padStart(4, '0')}\`,
      orderDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      orderType: ['Domestic', 'Export'][Math.floor(Math.random() * 2)],
      customerName: \`Customer \${i+1}\`,
      customerPhone: \`+91 9876543\${(i+1).toString().padStart(3, '0')}\`,
      customerEmail: \`contact@customer\${i+1}.com\`,
      customerAddress: 'Mumbai, India',
      riceGradeRequired: ['Grade A', 'Grade B', 'Premium'][Math.floor(Math.random() * 3)],
      qtyRequired: qty,
      bagSizePreference: ['25kg', '50kg'][Math.floor(Math.random() * 2)],
      deliveryLocation: 'Warehouse 1',
      expectedDeliveryDate: \`2026-07-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      receivedBy: 'Sales Rep',
      
      quotationNo: \`QT-\${(i + 1).toString().padStart(4, '0')}\`,
      quotationDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      quotedQty: qty,
      quotedPrice: price,
      totalValue: qty * price,
      validTill: \`2026-07-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      quotationBy: 'Sales Manager',

      followUpId: \`FU-\${(i + 1).toString().padStart(4, '0')}\`,
      followUpDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      customerDecision: ['Accepted', 'Negotiating', 'Rejected'][Math.floor(Math.random() * 3)],
      counterOffer: price - 500,
      nextFollowUpDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
      handledBy: 'Sales Rep',

      orderApprovalId: \`OA-\${(i + 1).toString().padStart(4, '0')}\`,
      approvedPrice: price - 200,
      approvedQty: qty,
      specialDiscount: 2,
      paymentAdvance: 50000,
      creditDays: 30,
      orderApprovedBy: 'Sales Director',
      approvalDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,

      orderCompletionId: \`OC-\${(i + 1).toString().padStart(4, '0')}\`,
      totalQtySupplied: qty,
      invoiceRef: \`INV-\${(i + 1).toString().padStart(4, '0')}\`,
      dispatchRef: \`DISP-\${(i + 1).toString().padStart(4, '0')}\`,
      totalValueSupplied: qty * (price - 200),
      balancePayment: 0,
      paymentReceived: 'Yes',
      orderStatus: 'Completed',
      closedBy: 'Finance Head',
      completionDate: \`2026-07-\${(i % 28 + 1).toString().padStart(2, '0')}\`,

      status: 'Completed'
    };
  });
};

export const ${stage.name} = () => {
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
    ${stage.name === 'SentQuotation' ? `autoFields = { quotationNo: 'QT-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'OrderFollowUp' ? `autoFields = { followUpId: 'FU-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'OrderApproval' ? `autoFields = { orderApprovalId: 'OA-' + Math.floor(Math.random()*10000) };` : ''}
    ${stage.name === 'OrderCompletion' ? `autoFields = { orderCompletionId: 'OC-' + Math.floor(Math.random()*10000) };` : ''}
    
    const readOnlyFields = ${JSON.stringify(stage.fields.filter(f => f.readOnly).map(f => f.name))};
    const initialFormData = {};
    readOnlyFields.forEach(field => {
      initialFormData[field] = item[field];
    });
    
    setFormData({ ...initialFormData, ...autoFields });
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen && formData) {
      ${stage.name === 'SentQuotation' ? `
      const qty = parseFloat(formData.quotedQty) || 0;
      const price = parseFloat(formData.quotedPrice) || 0;
      const total = qty * price;
      
      if (formData.totalValue !== total) {
        setFormData(prev => ({ ...prev, totalValue: total }));
      }
      ` : ''}
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
          ${stage.action}
        </Button>
      </div>
    )
  };

  const pendingCols = ${JSON.stringify(stage.pendingCols)};
  const historyCols = ${JSON.stringify(stage.historyCols)};

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">${stage.title}</h2>
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
        title="${stage.modalTitle}"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            ${stage.fields.map(f => {
              if (f.type === 'select') {
                return `
            <div className="space-y-1.5">
              <Label>${f.label}</Label>
              <Select 
                value={formData.${f.name} || ''} 
                onChange={(e) => setFormData({...formData, ${f.name}: e.target.value})}
                disabled={${!!f.readOnly}}
                className={${!!f.readOnly} ? 'bg-slate-100' : ''}
              >
                <option value="">Select ${f.label}</option>
                ${f.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
              </Select>
            </div>`;
              } else {
                return `
            <div className="space-y-1.5">
              <Label>${f.label}</Label>
              <Input 
                type="${f.type}"
                value={formData.${f.name} || ''} 
                onChange={(e) => setFormData({...formData, ${f.name}: e.target.value})}
                readOnly={${!!f.readOnly}}
                className={${!!f.readOnly} ? 'bg-slate-100' : ''}
              />
            </div>`;
              }
            }).join('')}
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
`;

const stage1Template = () => `import React, { useState } from 'react';
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
    orderId: \`SO-2026-\${(i + 1).toString().padStart(4, '0')}\`,
    orderDate: \`2026-06-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
    orderType: ['Domestic', 'Export'][Math.floor(Math.random() * 2)],
    customerName: \`Customer \${i+1}\`,
    customerPhone: \`+91 9876543\${(i+1).toString().padStart(3, '0')}\`,
    customerEmail: \`contact@customer\${i+1}.com\`,
    customerAddress: 'Mumbai, India',
    riceGradeRequired: ['Grade A', 'Grade B', 'Premium'][Math.floor(Math.random() * 3)],
    qtyRequired: Math.floor(Math.random() * 50) + 10,
    bagSizePreference: ['25kg', '50kg'][Math.floor(Math.random() * 2)],
    deliveryLocation: 'Warehouse 1',
    expectedDeliveryDate: \`2026-07-\${(i % 28 + 1).toString().padStart(2, '0')}\`,
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
`;

// Write Stage 1
fs.writeFileSync(path.join('c:/Users/devel/Downloads/Rice Mill/src/modules/sales', 'OrderReceive.jsx'), stage1Template());
console.log('Created OrderReceive.jsx');

// Write Stages 2-5
stages.forEach(stage => {
  const filePath = path.join('c:/Users/devel/Downloads/Rice Mill/src/modules/sales', stage.file);
  fs.writeFileSync(filePath, template(stage));
  console.log('Created ' + stage.file);
});
