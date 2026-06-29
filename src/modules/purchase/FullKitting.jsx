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

export const FullKitting = () => {
  const getInitialData = () => {
    let masterData = JSON.parse(localStorage.getItem('purchase_master')) || [];
    
    const resolveItems = (rawArray) => {
      return rawArray.map(item => typeof item === 'number' ? masterData.find(m => m.id === item) : item).filter(Boolean);
    };

    
    const rawPending = JSON.parse(localStorage.getItem('purchase_12_history')) || [];
    const rawHistory = JSON.parse(localStorage.getItem('purchase_13_history')) || [];
    
    const pending = resolveItems(rawPending);
    const history = resolveItems(rawHistory);
    
    const historyIds = history.map(h => h.id);
    const unresolvedPending = pending.filter(p => !historyIds.includes(p.id));
    
    return { pending: unresolvedPending, history };
    
  };

  const initial = getInitialData();
  const [items, setItems] = useState(initial.pending);
  const [historyItems, setHistoryItems] = useState(initial.history);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedType, setSelectedType] = useState('All');
  const [activeTab, setActiveTab] = useState('pending');

  const handleAction = (item, type = 'Market') => {
    const autoGen = !item.requirementNo ? { requirementNo: 'REQ-2026-' + Math.floor(Math.random() * 10000) } : {};
    setFormData({ ...item, purchaseType: type, ...autoGen });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const newItem = { ...formData, status: 'Processed' };
    if (!newItem.id) newItem.id = Date.now();
    
    // Save new item directly to raw history array
    const rawHistory = JSON.parse(localStorage.getItem('purchase_13_history')) || [];
    rawHistory.push(newItem);
    localStorage.setItem('purchase_13_history', JSON.stringify(rawHistory));
    
    setHistoryItems([...historyItems, newItem]);

    
    
    const remainingItems = items.filter(i => i.id !== formData.id);
    setItems(remainingItems);
    
    
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
          <h1 className="text-2xl font-bold text-slate-800">Full Kitting</h1>
          <p className="text-slate-500">Manage full kitting</p>
        </div>
        
      </div>

      <div className="border-b border-slate-200 mb-6">
        <div className="flex gap-6">
          
          <button 
            onClick={() => setActiveTab('pending')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'pending' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Clock className="w-4 h-4" />
            Pending Action
          </button>
          
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
          
          <Select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-48 bg-slate-50 border-slate-200"
          >
            <option value="All">All Types</option>
            <option value="Market">Market (Mkt)</option>
            <option value="Government">Government (Gov)</option>
          </Select>
          
        </div>
        
        <div className="overflow-x-auto bg-white">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-slate-600 bg-slate-50 uppercase tracking-wide border-b border-slate-200">
              <tr>
                {activeTab === 'pending' ? (
                  <>
                    <th className="px-6 py-4 font-bold">Action</th>
                    <th className="px-6 py-4 font-bold">Lift No</th>
                    <th className="px-6 py-4 font-bold">Pending Lift MT</th>
                    <th className="px-6 py-4 font-bold">AV ID</th>
                    <th className="px-6 py-4 font-bold">GRN No</th>
                    <th className="px-6 py-4 font-bold">PO/DO Number</th>
                    <th className="px-6 py-4 font-bold">Indent No</th>
                    <th className="px-6 py-4 font-bold">Purchase Type</th>
                    <th className="px-6 py-4 font-bold">Vendor/Agency Name</th>
                    <th className="px-6 py-4 font-bold">Net Payable ₹</th>
                    <th className="px-6 py-4 font-bold">Payment Status</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-4 font-bold">Full Kitting ID</th>
                    <th className="px-6 py-4 font-bold">Lift No</th>
                    <th className="px-6 py-4 font-bold">Pending Lift MT</th>
                    <th className="px-6 py-4 font-bold">Challan No</th>
                    <th className="px-6 py-4 font-bold">AV ID</th>
                    <th className="px-6 py-4 font-bold">PO/DO Number</th>
                    <th className="px-6 py-4 font-bold">Indent No</th>
                    <th className="px-6 py-4 font-bold">Kitting Date</th>
                    <th className="px-6 py-4 font-bold">Farmer/Agency Name</th>
                    <th className="px-6 py-4 font-bold">No. of Bags</th>
                    <th className="px-6 py-4 font-bold">Net Weight Kg</th>
                    <th className="px-6 py-4 font-bold">Rate ₹/Qt</th>
                    <th className="px-6 py-4 font-bold">Total Amount ₹</th>
                    <th className="px-6 py-4 font-bold">Advance Paid ₹</th>
                    <th className="px-6 py-4 font-bold">Balance Paid ₹</th>
                    <th className="px-6 py-4 font-bold">Net Payable ₹</th>
                    <th className="px-6 py-4 font-bold">Paid By</th>
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
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'liftNo')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'remainingAfterLiftMT')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'accountsVerificationId')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'grnNo')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'poDoNumber|poNumber|doNumber')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'indentNo')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'purchaseType')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'vendorName|agencyName')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'netPayable')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'paymentStatus')}</td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr><td colSpan="11" className="px-6 py-12 text-center text-slate-500">No pending records found</td></tr>
                  )}
                </>
              )}
              
              {activeTab === 'history' && (
                <>
                  {historyItems.map((item, index) => (
                    <tr key={index} className={getRowClass(item.orderType || item.purchaseType)}>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'fullKittingId')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'liftNo')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'remainingAfterLiftMT')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'challanNo')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'accountsVerificationId')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'poDoNumber|poNumber|doNumber')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'indentNo')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'kittingDate')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'farmerName|agencyName')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'noOfBags')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'netWeight')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'rate')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'totalAmount')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'advancePaid|advanceAmount')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'balancePayable')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'netPayable')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'paidBy')}</td>
                    </tr>
                  ))}
                  {historyItems.length === 0 && (
                    <tr><td colSpan="17" className="px-6 py-12 text-center text-slate-500">No history records found</td></tr>
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
        title={`Full Kitting Details`}
        size="4xl"
      >
        <div className="max-h-[85vh] overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Full Kitting ID</Label>
              <Input 
                type="text"
                value={formData.fullKittingId || ''} 
                onChange={(e) => setFormData({...formData, fullKittingId: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Challan No</Label>
              <Input 
                type="text"
                value={formData.challanNo || ''} 
                onChange={(e) => setFormData({...formData, challanNo: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Challan Date</Label>
              <Input 
                type="date"
                value={formData.challanDate || ''} 
                onChange={(e) => setFormData({...formData, challanDate: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Kitting Date</Label>
              <Input 
                type="date"
                value={formData.kittingDate || ''} 
                onChange={(e) => setFormData({...formData, kittingDate: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Purchase Type</Label>
              <Input 
                type="text"
                value={formData.purchaseType || ''} 
                onChange={(e) => setFormData({...formData, purchaseType: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            {formData.purchaseType === 'Market' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Farmer Name</Label>
              <Input 
                type="text"
                value={formData.farmerName || ''} 
                onChange={(e) => setFormData({...formData, farmerName: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
              )}
            {formData.purchaseType === 'Market' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Farmer ID / Aadhaar</Label>
              <Input 
                type="text"
                value={formData.farmerId || ''} 
                onChange={(e) => setFormData({...formData, farmerId: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
              )}
            {formData.purchaseType === 'Government' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Agency Name</Label>
              <Input 
                type="text"
                value={formData.agencyName || ''} 
                onChange={(e) => setFormData({...formData, agencyName: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
              )}
            {formData.purchaseType === 'Government' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Government Reference No</Label>
              <Input 
                type="text"
                value={formData.govtRef || ''} 
                onChange={(e) => setFormData({...formData, govtRef: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
              )}
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">No. of Bags</Label>
              <Input 
                type="number"
                value={formData.noOfBags || ''} 
                onChange={(e) => setFormData({...formData, noOfBags: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Net Weight Kg</Label>
              <Input 
                type="number"
                value={formData.netWeight || ''} 
                onChange={(e) => setFormData({...formData, netWeight: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Rate ₹/Qt</Label>
              <Input 
                type="number"
                value={formData.rate || ''} 
                onChange={(e) => setFormData({...formData, rate: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Total Amount ₹</Label>
              <Input 
                type="number"
                value={formData.totalAmount || ''} 
                onChange={(e) => setFormData({...formData, totalAmount: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            {formData.purchaseType === 'Market' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Commission Amount ₹</Label>
              <Input 
                type="number"
                value={formData.commissionAmount || ''} 
                onChange={(e) => setFormData({...formData, commissionAmount: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
              )}
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Net Payable ₹</Label>
              <Input 
                type="number"
                value={formData.netPayable || ''} 
                onChange={(e) => setFormData({...formData, netPayable: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Advance Paid ₹</Label>
              <Input 
                type="number"
                value={formData.advancePaid || ''} 
                onChange={(e) => setFormData({...formData, advancePaid: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Balance Payable ₹</Label>
              <Input 
                type="number"
                value={formData.balancePayable || ''} 
                onChange={(e) => setFormData({...formData, balancePayable: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Balance Payment Mode</Label>
              <Select 
                value={formData.balancePaymentMode || ''} 
                onChange={(e) => setFormData({...formData, balancePaymentMode: e.target.value})}
                disabled={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              >
                <option value="">Select...</option>
                <option value="NEFT">NEFT</option><option value="RTGS">RTGS</option><option value="DD">DD</option><option value="Cash">Cash</option>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Balance UTR / Cheque No</Label>
              <Input 
                type="text"
                value={formData.balanceUtr || ''} 
                onChange={(e) => setFormData({...formData, balanceUtr: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Paid By</Label>
              <Input 
                type="text"
                value={formData.paidBy || ''} 
                onChange={(e) => setFormData({...formData, paidBy: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Kitting Remarks</Label>
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
