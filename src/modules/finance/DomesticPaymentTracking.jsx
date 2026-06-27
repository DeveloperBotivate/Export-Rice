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
    const qty = Math.floor(Math.random() * 50) + 10;
    const rate = 45000;
    const total = qty * rate;
    
    return {
      id: i + 1,
      // Shared Dummy Data for Pending Lists
      closureId: `PCL-${(i + 1).toString().padStart(4, '0')}`,
      prNumber: `PR-${(i + 1).toString().padStart(4, '0')}`,
      poNumber: `PO-${(i + 1).toString().padStart(4, '0')}`,
      vendorName: `Vendor ${i+1}`,
      netQty: qty,
      purchaseRate: 2500,
      purchaseValue: qty * 2500,
      closureDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,

      apId: `AP-${(i + 1).toString().padStart(4, '0')}`,
      billNo: `BILL-${(i+1)}`,
      billDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      billAmount: qty * 2500,
      tdsAmount: (qty * 2500) * 0.01,
      netPayable: (qty * 2500) * 0.99,
      dueDate: `2026-07-${(i % 28 + 1).toString().padStart(2, '0')}`,
      outstanding: (qty * 2500) * 0.99,
      paymentStatus: 'Unpaid',

      loadingId: `LD-${(i + 1).toString().padStart(4, '0')}`,
      dispatchOrderNo: `DO-${(i + 1).toString().padStart(4, '0')}`,
      vehicleNumber: `MH 04 AB ${1000+i}`,
      transporterName: 'ABC Logistics',
      transporterGst: '27AABC1234L1Z',
      route: 'Mill -> Mumbai',
      weightLoaded: qty,
      freightRate: 1500,
      totalFreight: qty * 1500,
      expectedDelivery: `2026-06-${(i % 28 + 5).toString().padStart(2, '0')}`,

      agentName: `Agent ${i+1}`,
      agentId: `AG-${(i+1).toString().padStart(3, '0')}`,
      agentFirm: `Firm ${i+1}`,
      mandi: 'Karnal',
      commissionType: 'Fixed/MT',
      commissionRate: 50,
      quantity: qty,
      assignmentDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      
      completionId: `OC-${(i + 1).toString().padStart(4, '0')}`,
      orderId: `SO-${(i + 1).toString().padStart(4, '0')}`,
      customerName: `Customer ${i+1}`,
      riceGrade: 'Premium Basmati',
      totalValue: total,
      completionDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,

      commissionId: `COM-${(i + 1).toString().padStart(4, '0')}`,
      commissionAmount: 5000,
      paymentDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,

      contractNo: `EC-${(i + 1).toString().padStart(4, '0')}`,
      contractDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      buyerName: `Global Buyer ${i+1}`,
      buyerCountry: 'UAE',
      contractValueUsd: qty * 1000,
      paymentTerms: 'LC',

      paymentId: `EP-${(i + 1).toString().padStart(4, '0')}`,
      invoiceNo: `INV-${(i + 1).toString().padStart(4, '0')}`,
      receivedUsd: qty * 1000,
      inrEquivalent: qty * 1000 * 83.5,
      forexRate: 83.5,
      fircNo: `FIRC-${(i + 1).toString().padStart(5, '0')}`,
      outstandingUsd: 0,
      receiptDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,

      arId: `AR-${(i + 1).toString().padStart(4, '0')}`,
      invoiceAmount: total,
      amountReceived: total,
      daysOverdue: 0,
      paymentMode: 'NEFT',
      status: 'Paid',

      plId: `PL-${(i + 1).toString().padStart(4, '0')}`,
      period: 'Apr 2026',
      totalRevenue: total * 10,
      totalCost: total * 8,
      grossProfit: total * 2,
      grossMargin: 20,
      ebitda: total * 1.8,
      netProfit: total * 1.5,
      netMargin: 15,
      recoveryPercent: 65,
      preparedBy: 'Finance Head',
      createdDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,

      brId: `BR-${(i + 1).toString().padStart(4, '0')}`,
      reconDate: `2026-06-${(i % 28 + 1).toString().padStart(2, '0')}`,
      bankName: 'HDFC Bank',
      accountNo: '001122334455',
      openingBal: 1000000,
      bankClosingBal: 1500000,
      bookClosingBal: 1500000,
      variance: 0,
      reconStatus: 'Matched',
      reconciledBy: 'Acc Exec',
      verifiedBy: 'Finance Head'
    };
  });
};

export const DomesticPaymentTracking = () => {
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
    
    
    
    
    
    
    
    
    autoFields = { dptId: 'DPT-' + Math.floor(Math.random()*10000) };
    
    
    
    const readOnlyFields = ["arId","invoiceNo","dispatchOrderNo","customerName","dptId","invoiceAmount","amountReceived","outstanding"];
    const initialFormData = {};
    readOnlyFields.forEach(field => {
      if (item && item[field] !== undefined) {
        initialFormData[field] = item[field];
      }
    });
    
    setFormData({ ...initialFormData, ...autoFields });
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedItem({});
    setFormData({ plId: 'PL-' + Math.floor(Math.random()*10000) });
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (isModalOpen && formData) {
      
      
      
      
      
      
    }
  }, [formData, isModalOpen, selectedItem]);

  const handleSave = () => {
    const processedItem = { ...selectedItem, ...formData, status: 'Completed' };
    setHistoryItems([processedItem, ...historyItems]);
    if (selectedItem?.id) {
      setPendingItems(pendingItems.filter(p => p.id !== selectedItem.id));
    }
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
          Track Domestic
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"AR ID","accessor":"arId"},{"header":"Invoice No","accessor":"invoiceNo"},{"header":"Dispatch Order No","accessor":"dispatchOrderNo"},{"header":"Customer Name","accessor":"customerName"},{"header":"Invoice Amount (₹)","accessor":"invoiceAmount"},{"header":"Payment Received (₹)","accessor":"amountReceived"},{"header":"Outstanding (₹)","accessor":"outstanding"},{"header":"Days Overdue","accessor":"daysOverdue"},{"header":"Payment Mode","accessor":"paymentMode"},{"header":"Status","accessor":"status"}];
  const historyCols = [{"header":"Tracking ID","accessor":"dptId"},{"header":"AR ID","accessor":"arId"},{"header":"Invoice No","accessor":"invoiceNo"},{"header":"Customer Name","accessor":"customerName"},{"header":"Invoice Amount (₹)","accessor":"invoiceAmount"},{"header":"Outstanding (₹)","accessor":"outstanding"},{"header":"Expected Payment Date","accessor":"expectedPaymentDate"},{"header":"Follow-up Date","accessor":"followUpDate"},{"header":"Customer Response","accessor":"customerResponse"},{"header":"Promise to Pay Date","accessor":"promiseToPayDate"},{"header":"Escalated","accessor":"escalated"},{"header":"Resolved","accessor":"resolved"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Stage 10 - Domestic Payment Tracking</h2>
        
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
        title="Domestic Tracking Details"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <Label>AR ID</Label>
              <Input 
                type="text"
                value={formData.arId || ''} 
                onChange={(e) => setFormData({...formData, arId: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Invoice No</Label>
              <Input 
                type="text"
                value={formData.invoiceNo || ''} 
                onChange={(e) => setFormData({...formData, invoiceNo: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Dispatch Order No</Label>
              <Input 
                type="text"
                value={formData.dispatchOrderNo || ''} 
                onChange={(e) => setFormData({...formData, dispatchOrderNo: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Customer Name</Label>
              <Input 
                type="text"
                value={formData.customerName || ''} 
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Tracking ID</Label>
              <Input 
                type="text"
                value={formData.dptId || ''} 
                onChange={(e) => setFormData({...formData, dptId: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Tracking Date</Label>
              <Input 
                type="date"
                value={formData.trackingDate || ''} 
                onChange={(e) => setFormData({...formData, trackingDate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Invoice Amount (₹)</Label>
              <Input 
                type="number"
                value={formData.invoiceAmount || ''} 
                onChange={(e) => setFormData({...formData, invoiceAmount: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Received so far (₹)</Label>
              <Input 
                type="number"
                value={formData.amountReceived || ''} 
                onChange={(e) => setFormData({...formData, amountReceived: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Outstanding (₹)</Label>
              <Input 
                type="number"
                value={formData.outstanding || ''} 
                onChange={(e) => setFormData({...formData, outstanding: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Expected Payment Date</Label>
              <Input 
                type="date"
                value={formData.expectedPaymentDate || ''} 
                onChange={(e) => setFormData({...formData, expectedPaymentDate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Follow-up Done (Y/N)</Label>
              <Select 
                value={formData.followUpDone || ''} 
                onChange={(e) => setFormData({...formData, followUpDone: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Follow-up Done (Y/N)</option>
                <option value="Y">Y</option><option value="N">N</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Follow-up Date</Label>
              <Input 
                type="date"
                value={formData.followUpDate || ''} 
                onChange={(e) => setFormData({...formData, followUpDate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Follow-up Mode</Label>
              <Select 
                value={formData.followUpMode || ''} 
                onChange={(e) => setFormData({...formData, followUpMode: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Follow-up Mode</option>
                <option value="Call">Call</option><option value="Email">Email</option><option value="Visit">Visit</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Customer Response</Label>
              <Input 
                type="text"
                value={formData.customerResponse || ''} 
                onChange={(e) => setFormData({...formData, customerResponse: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Promise to Pay Date</Label>
              <Input 
                type="date"
                value={formData.promiseToPayDate || ''} 
                onChange={(e) => setFormData({...formData, promiseToPayDate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Escalated (Y/N)</Label>
              <Select 
                value={formData.escalated || ''} 
                onChange={(e) => setFormData({...formData, escalated: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Escalated (Y/N)</option>
                <option value="Y">Y</option><option value="N">N</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Escalated To</Label>
              <Input 
                type="text"
                value={formData.escalatedTo || ''} 
                onChange={(e) => setFormData({...formData, escalatedTo: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Resolved (Y/N)</Label>
              <Select 
                value={formData.resolved || ''} 
                onChange={(e) => setFormData({...formData, resolved: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Resolved (Y/N)</option>
                <option value="Y">Y</option><option value="N">N</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Remarks</Label>
              <Input 
                type="text"
                value={formData.remarks || ''} 
                onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
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
