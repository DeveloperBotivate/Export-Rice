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

export const ProfitAndLoss = () => {
  const [pendingItems, setPendingItems] = useState(generateDummyData().slice(0, 20));
  const [historyItems, setHistoryItems] = useState(generateDummyData().slice(20, 40));
  
  const [activeTab, setActiveTab] = useState('history');
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
    
    
    
    
    
    
    
    
    
    autoFields = { plId: 'PL-' + Math.floor(Math.random()*10000) };
    
    
    const readOnlyFields = ["plId","totalRevenue","totalCost","grossProfit","grossMargin","ebitda","ebit","ebt","netProfit","netMargin"];
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
      
      
      
      
      
      const r1 = parseFloat(formData.domRevenue) || 0;
      const r2 = parseFloat(formData.expRevenue) || 0;
      const totalRev = r1 + r2;
      
      const c1 = parseFloat(formData.purchaseCost) || 0;
      const c2 = parseFloat(formData.productionCost) || 0;
      const c3 = parseFloat(formData.packingCost) || 0;
      const c4 = parseFloat(formData.domTransportCost) || 0;
      const c5 = parseFloat(formData.expFreightCost) || 0;
      const c6 = parseFloat(formData.agentComm) || 0;
      const c7 = parseFloat(formData.salesComm) || 0;
      const c8 = parseFloat(formData.brokerComm) || 0;
      const c9 = parseFloat(formData.adminCost) || 0;
      const c10 = parseFloat(formData.otherCost) || 0;
      const totalCost = c1+c2+c3+c4+c5+c6+c7+c8+c9+c10;
      
      const gp = totalRev - c1 - c2 - c3;
      const gpMargin = totalRev ? (gp/totalRev)*100 : 0;
      const ebitda = totalRev - totalCost;
      
      const dep = parseFloat(formData.depreciation) || 0;
      const ebit = ebitda - dep;
      const int = parseFloat(formData.interest) || 0;
      const ebt = ebit - int;
      const tax = parseFloat(formData.tax) || 0;
      const np = ebt - tax;
      const npMargin = totalRev ? (np/totalRev)*100 : 0;
      
      if (formData.totalRevenue !== totalRev || formData.totalCost !== totalCost || formData.grossProfit !== gp || formData.ebitda !== ebitda || formData.netProfit !== np) {
        setFormData(prev => ({ 
          ...prev, 
          totalRevenue: totalRev, 
          totalCost: totalCost, 
          grossProfit: gp, 
          grossMargin: gpMargin.toFixed(2), 
          ebitda: ebitda, 
          ebit: ebit, 
          ebt: ebt, 
          netProfit: np, 
          netMargin: npMargin.toFixed(2) 
        }));
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
          Generate P&L
        </Button>
      </div>
    )
  };

  const pendingCols = [{"header":"P&L ID","accessor":"plId"},{"header":"Period","accessor":"period"},{"header":"Total Revenue (₹)","accessor":"totalRevenue"},{"header":"Total Cost (₹)","accessor":"totalCost"},{"header":"Gross Profit (₹)","accessor":"grossProfit"},{"header":"Gross Margin %","accessor":"grossMargin"},{"header":"EBITDA (₹)","accessor":"ebitda"},{"header":"Net Profit (₹)","accessor":"netProfit"},{"header":"Net Margin %","accessor":"netMargin"},{"header":"Recovery %","accessor":"recoveryPercent"},{"header":"Prepared By","accessor":"preparedBy"},{"header":"Created Date","accessor":"createdDate"}];
  const historyCols = [{"header":"P&L ID","accessor":"plId"},{"header":"Period","accessor":"period"},{"header":"Total Revenue (₹)","accessor":"totalRevenue"},{"header":"Total Cost (₹)","accessor":"totalCost"},{"header":"Gross Profit (₹)","accessor":"grossProfit"},{"header":"Gross Margin %","accessor":"grossMargin"},{"header":"EBITDA (₹)","accessor":"ebitda"},{"header":"Net Profit (₹)","accessor":"netProfit"},{"header":"Net Margin %","accessor":"netMargin"},{"header":"Recovery %","accessor":"recoveryPercent"},{"header":"Prepared By","accessor":"preparedBy"},{"header":"Created Date","accessor":"createdDate"}];

  const columns = activeTab === 'pending' ? [actionColumn, ...pendingCols] : historyCols;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Stage 11 - Profit & Loss</h2>
        
        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus size={16} /> Create P&L
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
        title="Profit & Loss Statement Details"
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
              <Label>Period Type</Label>
              <Select 
                value={formData.periodType || ''} 
                onChange={(e) => setFormData({...formData, periodType: e.target.value})}
                disabled={false}
                className={false ? 'bg-slate-100' : ''}
              >
                <option value="">Select Period Type</option>
                <option value="Monthly">Monthly</option><option value="Quarterly">Quarterly</option><option value="Yearly">Yearly</option>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Period</Label>
              <Input 
                type="text"
                value={formData.period || ''} 
                onChange={(e) => setFormData({...formData, period: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder="e.g. Apr 2025–Mar 2026"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Domestic Sales Revenue (₹)</Label>
              <Input 
                type="number"
                value={formData.domRevenue || ''} 
                onChange={(e) => setFormData({...formData, domRevenue: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Export Revenue (₹)</Label>
              <Input 
                type="number"
                value={formData.expRevenue || ''} 
                onChange={(e) => setFormData({...formData, expRevenue: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Revenue (₹)</Label>
              <Input 
                type="number"
                value={formData.totalRevenue || ''} 
                onChange={(e) => setFormData({...formData, totalRevenue: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Purchase Cost (₹)</Label>
              <Input 
                type="number"
                value={formData.purchaseCost || ''} 
                onChange={(e) => setFormData({...formData, purchaseCost: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Production Cost (₹)</Label>
              <Input 
                type="number"
                value={formData.productionCost || ''} 
                onChange={(e) => setFormData({...formData, productionCost: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Packing Cost (₹)</Label>
              <Input 
                type="number"
                value={formData.packingCost || ''} 
                onChange={(e) => setFormData({...formData, packingCost: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Domestic Transport Cost (₹)</Label>
              <Input 
                type="number"
                value={formData.domTransportCost || ''} 
                onChange={(e) => setFormData({...formData, domTransportCost: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Export Freight Cost (₹)</Label>
              <Input 
                type="number"
                value={formData.expFreightCost || ''} 
                onChange={(e) => setFormData({...formData, expFreightCost: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Agent Commission (₹)</Label>
              <Input 
                type="number"
                value={formData.agentComm || ''} 
                onChange={(e) => setFormData({...formData, agentComm: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Sales Commission (₹)</Label>
              <Input 
                type="number"
                value={formData.salesComm || ''} 
                onChange={(e) => setFormData({...formData, salesComm: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Broker Commission (₹)</Label>
              <Input 
                type="number"
                value={formData.brokerComm || ''} 
                onChange={(e) => setFormData({...formData, brokerComm: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Admin & Overhead (₹)</Label>
              <Input 
                type="number"
                value={formData.adminCost || ''} 
                onChange={(e) => setFormData({...formData, adminCost: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Other Expenses (₹)</Label>
              <Input 
                type="number"
                value={formData.otherCost || ''} 
                onChange={(e) => setFormData({...formData, otherCost: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Total Cost (₹)</Label>
              <Input 
                type="number"
                value={formData.totalCost || ''} 
                onChange={(e) => setFormData({...formData, totalCost: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Gross Profit (₹)</Label>
              <Input 
                type="number"
                value={formData.grossProfit || ''} 
                onChange={(e) => setFormData({...formData, grossProfit: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Gross Margin %</Label>
              <Input 
                type="number"
                value={formData.grossMargin || ''} 
                onChange={(e) => setFormData({...formData, grossMargin: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>EBITDA (₹)</Label>
              <Input 
                type="number"
                value={formData.ebitda || ''} 
                onChange={(e) => setFormData({...formData, ebitda: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Depreciation (₹)</Label>
              <Input 
                type="number"
                value={formData.depreciation || ''} 
                onChange={(e) => setFormData({...formData, depreciation: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>EBIT (₹)</Label>
              <Input 
                type="number"
                value={formData.ebit || ''} 
                onChange={(e) => setFormData({...formData, ebit: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Interest Expense (₹)</Label>
              <Input 
                type="number"
                value={formData.interest || ''} 
                onChange={(e) => setFormData({...formData, interest: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>EBT (₹)</Label>
              <Input 
                type="number"
                value={formData.ebt || ''} 
                onChange={(e) => setFormData({...formData, ebt: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Tax (₹)</Label>
              <Input 
                type="number"
                value={formData.tax || ''} 
                onChange={(e) => setFormData({...formData, tax: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Net Profit (₹)</Label>
              <Input 
                type="number"
                value={formData.netProfit || ''} 
                onChange={(e) => setFormData({...formData, netProfit: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Net Margin %</Label>
              <Input 
                type="number"
                value={formData.netMargin || ''} 
                onChange={(e) => setFormData({...formData, netMargin: e.target.value})}
                readOnly={true}
                className={true ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Recovery % (Paddy → Rice)</Label>
              <Input 
                type="number"
                value={formData.recoveryPercent || ''} 
                onChange={(e) => setFormData({...formData, recoveryPercent: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Yield %</Label>
              <Input 
                type="number"
                value={formData.yieldPercent || ''} 
                onChange={(e) => setFormData({...formData, yieldPercent: e.target.value})}
                readOnly={false}
                className={false ? 'bg-slate-100' : ''}
                placeholder=""
              />
            </div>
            <div className="space-y-1.5">
              <Label>Prepared By</Label>
              <Input 
                type="text"
                value={formData.preparedBy || ''} 
                onChange={(e) => setFormData({...formData, preparedBy: e.target.value})}
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
