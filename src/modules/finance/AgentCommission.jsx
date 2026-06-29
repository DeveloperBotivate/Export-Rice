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

export const AgentCommission = () => {
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
    
    
    
    autoFields = { commissionId: 'AC-' + Math.floor(Math.random()*10000) };
    
    
    
    
    
    
    
    
    const readOnlyFields = ["prNumber","poNumber","agentName","agentId","commissionId","purchaseRef","commissionType","commissionRate","commissionAmount","tdsAmount","netPayable"];
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
      
      
      const amt = parseFloat(formData.amountPaid || formData.commissionAmount || formData.quantity * formData.commissionRate) || 0;
      const tdsRate = parseFloat(formData.tdsRate) || 0;
      const tdsAmt = amt * (tdsRate / 100);
      const net = amt - tdsAmt;
      if (formData.tdsAmount !== tdsAmt || formData.netAmount !== net || formData.netPayable !== net || (formData.commissionAmount !== amt && 'AgentCommission' !== 'VendorPayments')) {
        setFormData(prev => ({ ...prev, tdsAmount: tdsAmt, netAmount: net, netPayable: net, commissionAmount: amt }));
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
          Pay Agent
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"PR Number","accessor":"prNumber"},{"header":"PO Number","accessor":"poNumber"},{"header":"Agent Name","accessor":"agentName"},{"header":"Agent ID","accessor":"agentId"},{"header":"Agent Firm Name","accessor":"agentFirm"},{"header":"Mandi","accessor":"mandi"},{"header":"Commission Type","accessor":"commissionType"},{"header":"Commission Rate","accessor":"commissionRate"},{"header":"Total Qty (MT)","accessor":"quantity"},{"header":"Assignment Date","accessor":"assignmentDate"}];
  const historyCols = [{"header":"Commission ID","accessor":"commissionId"},{"header":"PR Number","accessor":"prNumber"},{"header":"PO Number","accessor":"poNumber"},{"header":"Agent Name","accessor":"agentName"},{"header":"Agent ID","accessor":"agentId"},{"header":"Purchase Ref","accessor":"purchaseRef"},{"header":"Commission Type","accessor":"commissionType"},{"header":"Commission Amount (₹)","accessor":"commissionAmount"},{"header":"TDS (₹)","accessor":"tdsAmount"},{"header":"Net Payable (₹)","accessor":"netPayable"},{"header":"Payment Date","accessor":"paymentDate"},{"header":"UTR/Cheque No","accessor":"utrNo"},{"header":"Paid By","accessor":"paidBy"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Stage 5 - Agent Commission</h2>
        
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
        title="Agent Commission Details"
        size="5xl"
      >
        <div className="max-h-[85vh] overflow-y-auto">
          <div className="bg-gradient-to-r from-green-900 to-green-800 px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-green-300 text-xs font-medium uppercase tracking-widest">Finance Module</p>
              <h3 className="text-white text-lg font-bold mt-0.5">Agent Commission Details</h3>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></span>
              <span className="text-white text-xs font-medium">Recording</span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              
              <div className={'p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">PR Number</Label>
                  <span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-medium">AUTO</span>
                </div>
                <Input 
                  type="text"
                  value={formData.prNumber || ''} 
                  onChange={(e) => setFormData({...formData, prNumber: e.target.value})}
                  readOnly={true}
                  className={'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed text-sm'}
                  placeholder=""
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">PO Number</Label>
                  <span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-medium">AUTO</span>
                </div>
                <Input 
                  type="text"
                  value={formData.poNumber || ''} 
                  onChange={(e) => setFormData({...formData, poNumber: e.target.value})}
                  readOnly={true}
                  className={'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed text-sm'}
                  placeholder=""
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Agent Name</Label>
                  <span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-medium">AUTO</span>
                </div>
                <Input 
                  type="text"
                  value={formData.agentName || ''} 
                  onChange={(e) => setFormData({...formData, agentName: e.target.value})}
                  readOnly={true}
                  className={'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed text-sm'}
                  placeholder=""
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Agent ID</Label>
                  <span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-medium">AUTO</span>
                </div>
                <Input 
                  type="text"
                  value={formData.agentId || ''} 
                  onChange={(e) => setFormData({...formData, agentId: e.target.value})}
                  readOnly={true}
                  className={'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed text-sm'}
                  placeholder=""
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-green-300 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Agent Bank Account No</Label>
                  
                </div>
                <Input 
                  type="text"
                  value={formData.agentBankAcc || ''} 
                  onChange={(e) => setFormData({...formData, agentBankAcc: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm bg-white'}
                  placeholder=""
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-green-300 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Agent IFSC</Label>
                  
                </div>
                <Input 
                  type="text"
                  value={formData.agentIfsc || ''} 
                  onChange={(e) => setFormData({...formData, agentIfsc: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm bg-white'}
                  placeholder=""
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Commission ID</Label>
                  <span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-medium">AUTO</span>
                </div>
                <Input 
                  type="text"
                  value={formData.commissionId || ''} 
                  onChange={(e) => setFormData({...formData, commissionId: e.target.value})}
                  readOnly={true}
                  className={'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed text-sm'}
                  placeholder=""
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Purchase Reference</Label>
                  <span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-medium">AUTO</span>
                </div>
                <Input 
                  type="text"
                  value={formData.purchaseRef || ''} 
                  onChange={(e) => setFormData({...formData, purchaseRef: e.target.value})}
                  readOnly={true}
                  className={'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed text-sm'}
                  placeholder=""
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Commission Type</Label>
                  <span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-medium">AUTO</span>
                </div>
                <Input 
                  type="text"
                  value={formData.commissionType || ''} 
                  onChange={(e) => setFormData({...formData, commissionType: e.target.value})}
                  readOnly={true}
                  className={'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed text-sm'}
                  placeholder=""
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Commission Rate</Label>
                  <span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-medium">AUTO</span>
                </div>
                <Input 
                  type="number"
                  value={formData.commissionRate || ''} 
                  onChange={(e) => setFormData({...formData, commissionRate: e.target.value})}
                  readOnly={true}
                  className={'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed text-sm'}
                  placeholder=""
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-green-300 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Total Quantity (MT)</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.quantity || ''} 
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm bg-white'}
                  placeholder=""
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Commission Amount (₹)</Label>
                  <span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-medium">AUTO</span>
                </div>
                <Input 
                  type="number"
                  value={formData.commissionAmount || ''} 
                  onChange={(e) => setFormData({...formData, commissionAmount: e.target.value})}
                  readOnly={true}
                  className={'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed text-sm'}
                  placeholder=""
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-green-300 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">TDS Rate (%)</Label>
                  
                </div>
                <Input 
                  type="number"
                  value={formData.tdsRate || ''} 
                  onChange={(e) => setFormData({...formData, tdsRate: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm bg-white'}
                  placeholder=""
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">TDS Deducted (₹)</Label>
                  <span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-medium">AUTO</span>
                </div>
                <Input 
                  type="number"
                  value={formData.tdsAmount || ''} 
                  onChange={(e) => setFormData({...formData, tdsAmount: e.target.value})}
                  readOnly={true}
                  className={'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed text-sm'}
                  placeholder=""
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Net Payable (₹)</Label>
                  <span className="text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded font-medium">AUTO</span>
                </div>
                <Input 
                  type="number"
                  value={formData.netPayable || ''} 
                  onChange={(e) => setFormData({...formData, netPayable: e.target.value})}
                  readOnly={true}
                  className={'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed text-sm'}
                  placeholder=""
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-green-300 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Payment Date</Label>
                  
                </div>
                <Input 
                  type="date"
                  value={formData.paymentDate || ''} 
                  onChange={(e) => setFormData({...formData, paymentDate: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm bg-white'}
                  placeholder=""
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-green-300 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Payment Mode</Label>
                  
                </div>
                <Select 
                  value={formData.paymentMode || ''} 
                  onChange={(e) => setFormData({...formData, paymentMode: e.target.value})}
                  disabled={false}
                  className={'border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm bg-white'}
                >
                  <option value="">Select...</option>
                  <option value="NEFT">NEFT</option><option value="RTGS">RTGS</option><option value="Cheque">Cheque</option>
                </Select>
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-green-300 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">UTR/Cheque No</Label>
                  
                </div>
                <Input 
                  type="text"
                  value={formData.utrNo || ''} 
                  onChange={(e) => setFormData({...formData, utrNo: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm bg-white'}
                  placeholder=""
                />
              </div>
              <div className={'p-3 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-green-300 transition-all space-y-1.5'}>
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Paid By</Label>
                  
                </div>
                <Input 
                  type="text"
                  value={formData.paidBy || ''} 
                  onChange={(e) => setFormData({...formData, paidBy: e.target.value})}
                  readOnly={false}
                  className={'border-slate-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm bg-white'}
                  placeholder=""
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button onClick={() => setIsModalOpen(false)} variant="outline" className="px-6">
                Cancel
              </Button>
              <Button onClick={handleSave} className="px-6 bg-gradient-to-r from-green-700 to-green-600 shadow-md text-white">
                Save & Process
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
