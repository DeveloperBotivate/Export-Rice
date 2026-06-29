import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, Clock, History as HistoryIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { WorkflowNavigation } from '../../components/WorkflowNavigation';

const getVal = (item, keyStr) => {
  if (!keyStr) return '-';
  const keys = keyStr.split('|');
  for (let k of keys) {
    if (item[k]) return item[k];
  }
  return '-';
};

export const PurchaseRequirement = () => {
  const getInitialData = () => {
    let masterData = JSON.parse(localStorage.getItem('purchase_master')) || [];
    
    const resolveItems = (rawArray) => {
      return rawArray.map(item => typeof item === 'number' ? masterData.find(m => m.id === item) : item).filter(Boolean);
    };

    
    // Dummy Data seeding across all stages using Normalized Storage to save quota
    let rawHistory = JSON.parse(localStorage.getItem('purchase_1_history'));
    
    if (!rawHistory || rawHistory.length === 0) {
      const dummyDataArray = [];
      // Generate 280 items to satisfy 20 pending + 20 history across 14 stages
      for (let i = 1; i <= 280; i++) {
        const pReq = "PRQ-" + i.toString().padStart(4, '0');
        const pInd = "IND-" + i.toString().padStart(4, '0');
        const pPo = "PO-" + i.toString().padStart(4, '0');
        const pType = i % 2 === 0 ? 'Government' : 'Market';
        
        dummyDataArray.push({
          id: i, requirementNo: pReq, requirementDate: '2023-10-15', purchaseType: pType, targetMandi: 'Karnal Mandi', mktPaddyGrade: 'Basmati 1121', mktQtyMT: 300 + i*10, budgetRate: 3500, brokerName: 'Ramesh Trading', brokerCode: 'BRK-045', requiredByDate: '2023-11-05', requestedBy: 'Admin', department: 'Procurement', status: 'Processed',
          indentNo: pInd, indentDate: '2023-10-16', mandiName: 'Karnal Mandi', supplierName: 'Kisan Traders', paddyVariety: 'Basmati', mktSeason: 'Kharif', mktRate: 3450, commission: 2, brokerage: 1, loadingCharges: 500, hamaliCharges: 200, otherCharges: 100,
          approvalId: "APR-" + i.toString().padStart(4, '0'), approvalDate: '2023-10-17', approvedBy: 'Manager', approvedQtyMT: 300 + i*10, approvedRate: 3450, approvedTotalValue: 1035000, priorityLevel: 'High', approvalStatus: 'Approved',
          poNumber: pPo, poDate: '2023-10-18', poValidity: '2023-11-18', vendorName: 'Kisan Traders', vendorPhone: '9876543210', vendorId: 'PAN12345', qtyMT: 300 + i*10, rate: 3450, totalValue: 1035000, paymentTerms: 'Net 30', deliveryTerms: 'FOB',
          logisticsId: "LOG-" + i.toString().padStart(4, '0'), vehicleNumber: 'HR-45-A-1234', vehicleType: 'Truck', driverName: 'Raju', transporterName: 'Speedy Transport', route: 'Karnal -> Mill', distance: 50, expectedDeparture: '2023-10-19', expectedArrival: '2023-10-20', freightRate: 500, totalFreight: 10000, advanceDriver: 2000,
          poEntryId: "POE-" + i.toString().padStart(4, '0'), entryDate: '2023-10-20', mandiLocation: 'Karnal', auctionSlot: 'A-12', commissionAmt: 20700, lotNumbers: "LOT-K-" + i, noOfBags: 600, grossWeightSource: 30000, moistureSource: 17.5, paddyGradeVerified: 'Basmati 1121', recordedBy: 'Gate Keeper',
          advancePaymentId: "ADV-" + i.toString().padStart(4, '0'), paymentDate: '2023-10-21', payeeName: 'Kisan Traders', bankAccount: 'AC123456', advanceAmount: 50000, paymentMode: 'NEFT', utrNo: 'UTR98765', tdsAmount: 500, netAmount: 49500, paidBy: 'Finance',
          liftId: "LIFT-" + i.toString().padStart(4, '0'), liftDate: '2023-10-22T08:00', grossWeight: 30000, tareWeight: 10000, netWeight: 20000, moisture: 17.4, liftedFrom: 'Karnal Godown', supervisor: 'Amit',
          weighSlipNo: "WB-" + i.toString().padStart(4, '0'), weighDate: '2023-10-22T14:00', weighbridgeId: 'WB-A1', operator: 'Suresh', varianceKg: 0, variancePct: 0,
          grnNo: "GRN-" + i.toString().padStart(4, '0'), grnDate: '2023-10-22', warehouse: 'WH-1', godown: 'G-1', lotNo: "LT-" + i.toString().padStart(4, '0'), batchNo: "BT-" + i.toString().padStart(4, '0'), receivedQty: 20000, expectedQty: 20000, shortage: 0, excess: 0, receivedBy: 'Store Keeper',
          labReportId: "LAB-" + i.toString().padStart(4, '0'), labName: 'Internal QC', testDate: '2023-10-23', broken: 2, paddyGradeResult: 'A', recovery: 68, technician: 'Dr. Singh', labResult: 'Pass', approved: 'Yes',
          accountsVerificationId: "AV-" + i.toString().padStart(4, '0'), verificationDate: '2023-10-24', supplierBillAmt: 690000, brokerCommission: 13800, freightAmount: 10000, advancePaid: 50000, balancePayable: 666500, paymentStatus: 'Paid', netPayable: 666500, verifiedBy: 'Accounts Dept',
          fullKittingId: "FK-" + i.toString().padStart(4, '0'), challanNo: "CHL-" + i.toString().padStart(4, '0'), kittingDate: '2023-10-25', farmerName: 'Ramesh Farmer', totalAmount: 690000,
          purchaseClosureId: "PC-" + i.toString().padStart(4, '0'), closureDate: '2023-10-26', netQty: 20, qualityGrade: 'A', totalPurchaseValue: 690000, totalLandedCost: 715000, valuationRate: 35750, closureStatus: 'Complete',
          // Gov Specific Fields
          procurementRef: "PROC-Gov-" + (100+i), govPaddyGrade: 'Grade A', govQtyMT: 500, mspRate: 2203, targetSeason: 'Kharif 2023', agencyName: 'FCI', season: 'Kharif 2023', mandatedRate: 2203, allocationRef: "ALLOC-" + i, doNo: "DO-FCI-" + i
        });
      }
      
      // Store full objects ONCE to save memory limit
      localStorage.setItem('purchase_master', JSON.stringify(dummyDataArray));
      
      // Inject only IDs into all stages via mathematical slices
      for(let i=1; i<=14; i++) {
        const numItems = (15 - i) * 20; 
        const ids = Array.from({length: numItems}, (_, index) => index + 1);
        localStorage.setItem(`purchase_${i}_history`, JSON.stringify(ids));
      }
      
      rawHistory = Array.from({length: 280}, (_, index) => index + 1);
    }
    
    return { pending: [], history: resolveItems(rawHistory) };
    
  };

  const initial = getInitialData();
  const [items, setItems] = useState(initial.pending);
  const [historyItems, setHistoryItems] = useState(initial.history);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedType, setSelectedType] = useState('All');
  const [activeTab, setActiveTab] = useState('history');

  const handleAction = (item, type = 'Market') => {
    const autoGen = !item.requirementNo ? { requirementNo: 'REQ-2026-' + Math.floor(Math.random() * 10000) } : {};
    setFormData({ ...item, purchaseType: type, ...autoGen });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const newItem = { ...formData, status: 'Processed' };
    if (!newItem.id) newItem.id = Date.now();
    
    // Save new item directly to raw history array
    const rawHistory = JSON.parse(localStorage.getItem('purchase_1_history')) || [];
    rawHistory.push(newItem);
    localStorage.setItem('purchase_1_history', JSON.stringify(rawHistory));
    
    setHistoryItems([...historyItems, newItem]);

    
    
    
    setIsModalOpen(false);
    setFormData({});
  };

  const getRowClass = (type) => {
    if (type === 'Domestic' || type === 'Government') return 'bg-blue-50/50 hover:bg-blue-100/60 transition-colors border-l-4 border-l-blue-400';
    if (type === 'Export' || type === 'Market') return 'bg-emerald-50/50 hover:bg-emerald-100/60 transition-colors border-l-4 border-l-emerald-400';
    return 'hover:bg-slate-50 transition-colors';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Purchase Requirement</h1>
          <p className="text-slate-500">Manage purchase requirement</p>
        </div>
        
        <div className="flex gap-3">
          <Button onClick={() => handleAction({}, 'Market')} className="bg-amber-600 hover:bg-amber-700">
            <Plus className="w-4 h-4 mr-2" />
            Market Requirement
          </Button>
          <Button onClick={() => handleAction({}, 'Government')} className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            Govt Requirement
          </Button>
        </div>
      </div>

      <div className="border-b border-slate-200 mb-6">
        <div className="flex gap-6">
          
          <button 
            onClick={() => setActiveTab('history')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'history' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <HistoryIcon className="w-4 h-4" />
            History / Completed
          </button>
        </div>
      </div>

      <Card className="p-0 border-0 shadow-sm ring-1 ring-slate-200 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <Input className="pl-9 bg-slate-50 border-slate-200" placeholder="Search..." />
          </div>
          
        </div>
        
        <div className="overflow-x-auto bg-white">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-600 bg-slate-50 uppercase tracking-wide border-b border-slate-200">
              <tr>
                {activeTab === 'pending' ? (
                  <>
                    
                  </>
                ) : (
                  <>
                    <th className="px-6 py-4 font-bold">Requirement No</th>
                    <th className="px-6 py-4 font-bold">Date</th>
                    <th className="px-6 py-4 font-bold">Purchase Type</th>
                    <th className="px-6 py-4 font-bold">Gov Ref</th>
                    <th className="px-6 py-4 font-bold">Target Mandi</th>
                    <th className="px-6 py-4 font-bold">Broker Name</th>
                    <th className="px-6 py-4 font-bold">Paddy Grade</th>
                    <th className="px-6 py-4 font-bold">Qty MT</th>
                    <th className="px-6 py-4 font-bold">Rate ₹/Qt</th>
                    <th className="px-6 py-4 font-bold">Required By</th>
                    <th className="px-6 py-4 font-bold">Requested By</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeTab === 'pending' && (
                <>
                  {items
                    .filter(item => selectedType === 'All' || item.purchaseType === selectedType)
                    .map((item, index) => (
                    <tr key={index} className={getRowClass(item.orderType || item.purchaseType)}>
                      <td className="px-6 py-4">
                        <Button 
                          onClick={() => handleAction(item, item.purchaseType)}
                          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2 text-xs rounded-md shadow-sm font-medium"
                        >
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                          Process
                        </Button>
                      </td>
                      
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr><td colSpan="1" className="px-6 py-12 text-center text-slate-500">No pending records found</td></tr>
                  )}
                </>
              )}
              
              {activeTab === 'history' && (
                <>
                  {historyItems.map((item, index) => (
                    <tr key={index} className={getRowClass(item.orderType || item.purchaseType)}>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'requirementNo')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'requirementDate')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'purchaseType')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'procurementRef')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'targetMandi')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'brokerName')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'govPaddyGrade|mktPaddyGrade')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'govQtyMT|mktQtyMT')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'mspRate|budgetRate')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'requiredByDate')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'requestedBy')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'status')}</td>
                    </tr>
                  ))}
                  {historyItems.length === 0 && (
                    <tr><td colSpan="12" className="px-6 py-12 text-center text-slate-500">No history records found</td></tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={`Purchase Requirement Details`}
        size="4xl"
      >
        <div className="max-h-[85vh] overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Requirement No</Label>
              <Input 
                type="text"
                value={formData.requirementNo || ''} 
                onChange={(e) => setFormData({...formData, requirementNo: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Requirement Date</Label>
              <Input 
                type="date"
                value={formData.requirementDate || ''} 
                onChange={(e) => setFormData({...formData, requirementDate: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Purchase Type</Label>
              <Select 
                value={formData.purchaseType || ''} 
                onChange={(e) => setFormData({...formData, purchaseType: e.target.value})}
                disabled={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              >
                <option value="">Select...</option>
                <option value="Government">Government</option><option value="Market">Market</option>
              </Select>
            </div>
            {formData.purchaseType === 'Government' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Procurement Ref No</Label>
              <Input 
                type="text"
                value={formData.procurementRef || ''} 
                onChange={(e) => setFormData({...formData, procurementRef: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
              )}
            {formData.purchaseType === 'Government' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Paddy Grade (Gov)</Label>
              <Input 
                type="text"
                value={formData.govPaddyGrade || ''} 
                onChange={(e) => setFormData({...formData, govPaddyGrade: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
              )}
            {formData.purchaseType === 'Government' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Qty MT (Gov)</Label>
              <Input 
                type="number"
                value={formData.govQtyMT || ''} 
                onChange={(e) => setFormData({...formData, govQtyMT: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
              )}
            {formData.purchaseType === 'Government' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">MSP Rate ₹/Qt</Label>
              <Input 
                type="number"
                value={formData.mspRate || ''} 
                onChange={(e) => setFormData({...formData, mspRate: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
              )}
            {formData.purchaseType === 'Government' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Target Season</Label>
              <Input 
                type="text"
                value={formData.targetSeason || ''} 
                onChange={(e) => setFormData({...formData, targetSeason: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
              )}
            {formData.purchaseType === 'Government' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Procurement Region</Label>
              <Input 
                type="text"
                value={formData.procurementRegion || ''} 
                onChange={(e) => setFormData({...formData, procurementRegion: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
              )}
            {formData.purchaseType === 'Market' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Target Mandi</Label>
              <Input 
                type="text"
                value={formData.targetMandi || ''} 
                onChange={(e) => setFormData({...formData, targetMandi: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
              )}
            {formData.purchaseType === 'Market' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Paddy Grade Required</Label>
              <Input 
                type="text"
                value={formData.mktPaddyGrade || ''} 
                onChange={(e) => setFormData({...formData, mktPaddyGrade: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
              )}
            {formData.purchaseType === 'Market' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Qty MT</Label>
              <Input 
                type="number"
                value={formData.mktQtyMT || ''} 
                onChange={(e) => setFormData({...formData, mktQtyMT: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
              )}
            {formData.purchaseType === 'Market' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Budget ₹/Qt</Label>
              <Input 
                type="number"
                value={formData.budgetRate || ''} 
                onChange={(e) => setFormData({...formData, budgetRate: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
              )}
            {formData.purchaseType === 'Market' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Broker / Arhtiya Name</Label>
              <Input 
                type="text"
                value={formData.brokerName || ''} 
                onChange={(e) => setFormData({...formData, brokerName: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
              )}
            {formData.purchaseType === 'Market' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Broker Code</Label>
              <Input 
                type="text"
                value={formData.brokerCode || ''} 
                onChange={(e) => setFormData({...formData, brokerCode: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
              )}
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Required By Date</Label>
              <Input 
                type="date"
                value={formData.requiredByDate || ''} 
                onChange={(e) => setFormData({...formData, requiredByDate: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Requested By</Label>
              <Input 
                type="text"
                value={formData.requestedBy || ''} 
                onChange={(e) => setFormData({...formData, requestedBy: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Department</Label>
              <Input 
                type="text"
                value={formData.department || ''} 
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Remarks</Label>
              <Input 
                type="text"
                value={formData.remarks || ''} 
                onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-8 mt-8 border-t border-slate-100">
            <Button onClick={() => setIsModalOpen(false)} variant="outline" className="px-6">
              Cancel
            </Button>
            <Button onClick={handleSave} className="px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
              Save Details
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
