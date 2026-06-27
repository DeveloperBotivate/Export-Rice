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

export const BankReconciliation = () => {
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
    
    
    
    
    
    
    
    
    
    
    autoFields = { brId: 'BR-' + Math.floor(Math.random()*10000) };
    
    const readOnlyFields = ["plId","brId","reconciledBal","variance"];
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
      
      
      
      
      
      
      const ob = parseFloat(formData.openingBal) || 0;
      const cbb = parseFloat(formData.bookClosingBal) || 0;
      
      const uci = parseFloat(formData.unclearedIssued) || 0;
      const ctr = parseFloat(formData.transitReceived) || 0;
      const dit = parseFloat(formData.depositsTransit) || 0;
      const bc = parseFloat(formData.bankCharges) || 0;
      const ie = parseFloat(formData.interestEarned) || 0;
      const ed = parseFloat(formData.ecsDebits) || 0;
      const oa = parseFloat(formData.otherAdj) || 0;
      
      const rec = cbb + uci - ctr - dit - bc + ie - ed + oa;
      const bank = parseFloat(formData.bankClosingBal) || 0;
      const variance = rec - bank;
      
      if (formData.reconciledBal !== rec || formData.variance !== variance) {
        setFormData(prev => ({ ...prev, reconciledBal: rec, variance: variance }));
      }
      
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
          Reconcile
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"P&L ID","accessor":"plId"},{"header":"Period","accessor":"period"},{"header":"Total Revenue (₹)","accessor":"totalRevenue"},{"header":"Total Cost (₹)","accessor":"totalCost"},{"header":"Net Profit (₹)","accessor":"netProfit"},{"header":"Net Margin %","accessor":"netMargin"},{"header":"Prepared By","accessor":"preparedBy"},{"header":"Created Date","accessor":"createdDate"}];
  const historyCols = [{"header":"Recon ID","accessor":"brId"},{"header":"P&L ID","accessor":"plId"},{"header":"Recon Date","accessor":"reconDate"},{"header":"Bank Name","accessor":"bankName"},{"header":"Account No","accessor":"accountNo"},{"header":"Opening Balance (₹)","accessor":"openingBal"},{"header":"Bank Closing Balance (₹)","accessor":"bankClosingBal"},{"header":"Book Closing Balance (₹)","accessor":"bookClosingBal"},{"header":"Variance (₹)","accessor":"variance"},{"header":"Recon Status","accessor":"reconStatus"},{"header":"Reconciled By","accessor":"reconciledBy"},{"header":"Verified By","accessor":"verifiedBy"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Stage 12 - Bank Reconciliation</h2>
        
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
        title="Bank Reconciliation Details"
      >
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <Label>P&L ID</Label>
              <Input 
                type="text"
                value={formData.plId || ''} 
                onChange={(e) => setFormData({...formData, plId: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Recon ID</Label>
              <Input 
                type="text"
                value={formData.brId || ''} 
                onChange={(e) => setFormData({...formData, brId: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Recon Date</Label>
              <Input 
                type="date"
                value={formData.reconDate || ''} 
                onChange={(e) => setFormData({...formData, reconDate: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Bank Name</Label>
              <Input 
                type="text"
                value={formData.bankName || ''} 
                onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Branch Name</Label>
              <Input 
                type="text"
                value={formData.branchName || ''} 
                onChange={(e) => setFormData({...formData, branchName: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Account No</Label>
              <Input 
                type="text"
                value={formData.accountNo || ''} 
                onChange={(e) => setFormData({...formData, accountNo: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Account Type</Label>
              <Select 
                value={formData.accountType || ''} 
                onChange={(e) => setFormData({...formData, accountType: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Account Type</option>
                <option value="Current">Current</option><option value="CC">CC</option><option value="OD">OD</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Opening Balance (₹)</Label>
              <Input 
                type="number"
                value={formData.openingBal || ''} 
                onChange={(e) => setFormData({...formData, openingBal: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Closing Balance as per Bank Statement (₹)</Label>
              <Input 
                type="number"
                value={formData.bankClosingBal || ''} 
                onChange={(e) => setFormData({...formData, bankClosingBal: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Closing Balance as per Books (₹)</Label>
              <Input 
                type="number"
                value={formData.bookClosingBal || ''} 
                onChange={(e) => setFormData({...formData, bookClosingBal: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Uncleared Cheques Issued (₹)</Label>
              <Input 
                type="number"
                value={formData.unclearedIssued || ''} 
                onChange={(e) => setFormData({...formData, unclearedIssued: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Cheques in Transit — Received (₹)</Label>
              <Input 
                type="number"
                value={formData.transitReceived || ''} 
                onChange={(e) => setFormData({...formData, transitReceived: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Deposits in Transit (₹)</Label>
              <Input 
                type="number"
                value={formData.depositsTransit || ''} 
                onChange={(e) => setFormData({...formData, depositsTransit: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Bank Charges (₹)</Label>
              <Input 
                type="number"
                value={formData.bankCharges || ''} 
                onChange={(e) => setFormData({...formData, bankCharges: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Interest Earned (₹)</Label>
              <Input 
                type="number"
                value={formData.interestEarned || ''} 
                onChange={(e) => setFormData({...formData, interestEarned: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>ECS/NACH Debits (₹)</Label>
              <Input 
                type="number"
                value={formData.ecsDebits || ''} 
                onChange={(e) => setFormData({...formData, ecsDebits: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Other Adjustments (₹)</Label>
              <Input 
                type="number"
                value={formData.otherAdj || ''} 
                onChange={(e) => setFormData({...formData, otherAdj: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Reconciled Balance (₹)</Label>
              <Input 
                type="number"
                value={formData.reconciledBal || ''} 
                onChange={(e) => setFormData({...formData, reconciledBal: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Variance (₹)</Label>
              <Input 
                type="number"
                value={formData.variance || ''} 
                onChange={(e) => setFormData({...formData, variance: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Reconciliation Status</Label>
              <Select 
                value={formData.reconStatus || ''} 
                onChange={(e) => setFormData({...formData, reconStatus: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Reconciliation Status</option>
                <option value="Matched">Matched</option><option value="Unmatched">Unmatched</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Reconciled By</Label>
              <Input 
                type="text"
                value={formData.reconciledBy || ''} 
                onChange={(e) => setFormData({...formData, reconciledBy: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Verified By</Label>
              <Input 
                type="text"
                value={formData.verifiedBy || ''} 
                onChange={(e) => setFormData({...formData, verifiedBy: e.target.value})}
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
