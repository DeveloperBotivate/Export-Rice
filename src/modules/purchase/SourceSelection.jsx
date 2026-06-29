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

export const SourceSelection = () => {
  const [items, setItems] = useState([]);
  const [historyItems, setHistoryItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedType, setSelectedType] = useState('All');
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    const masterData = JSON.parse(localStorage.getItem('purchase_master')) || [];
    const resolveItems = (rawArray) => {
      return rawArray.map(item => typeof item === 'number' ? masterData.find(m => m.id === item) : item).filter(Boolean);
    };

    
    // Load raw arrays (mix of IDs from dummy data, and full objects from manual entry)
    const rawPending = JSON.parse(localStorage.getItem('purchase_1_history')) || [];
    const rawHistory = JSON.parse(localStorage.getItem('purchase_2_history')) || [];
    
    // Resolve to full objects
    const pending = resolveItems(rawPending);
    const history = resolveItems(rawHistory);
    
    // Filter pending
    const historyIds = history.map(h => h.id);
    const unresolvedPending = pending.filter(p => !historyIds.includes(p.id));
    
    setItems(unresolvedPending);
    setHistoryItems(history);
    
  }, []);

  const handleAction = (item, type = 'Market') => {
    const autoGen = !item.requirementNo ? { requirementNo: 'REQ-2026-' + Math.floor(Math.random() * 10000) } : {};
    setFormData({ ...item, purchaseType: type, ...autoGen });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const newItem = { ...formData, status: 'Processed' };
    if (!newItem.id) newItem.id = Date.now();
    
    // Save new item directly to raw history array
    const rawHistory = JSON.parse(localStorage.getItem('purchase_2_history')) || [];
    rawHistory.push(newItem);
    localStorage.setItem('purchase_2_history', JSON.stringify(rawHistory));
    
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
          <h1 className="text-2xl font-bold text-slate-800">Source Selection & Indent</h1>
          <p className="text-slate-500">Manage source selection & indent</p>
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
                    <th className="px-6 py-4 font-bold">Requirement No</th>
                    <th className="px-6 py-4 font-bold">Date</th>
                    <th className="px-6 py-4 font-bold">Purchase Type</th>
                    <th className="px-6 py-4 font-bold">Paddy Grade</th>
                    <th className="px-6 py-4 font-bold">Qty MT</th>
                    <th className="px-6 py-4 font-bold">Rate ₹/Qt</th>
                    <th className="px-6 py-4 font-bold">Required By</th>
                    <th className="px-6 py-4 font-bold">Requested By</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-4 font-bold">Indent No</th>
                    <th className="px-6 py-4 font-bold">Indent Date</th>
                    <th className="px-6 py-4 font-bold">Purchase Type</th>
                    <th className="px-6 py-4 font-bold">Agency/Broker</th>
                    <th className="px-6 py-4 font-bold">Season/Mandi</th>
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
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'requirementNo')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'requirementDate')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'purchaseType')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'govPaddyGrade|mktPaddyGrade')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'govQtyMT|mktQtyMT')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'mspRate|budgetRate')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'requiredByDate')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'requestedBy')}</td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr><td colSpan="9" className="px-6 py-12 text-center text-slate-500">No pending records found</td></tr>
                  )}
                </>
              )}
              
              {activeTab === 'history' && (
                <>
                  {historyItems.map((item, index) => (
                    <tr key={index} className={getRowClass(item.orderType || item.purchaseType)}>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'indentNo')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'indentDate')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'purchaseType')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'agencyName|brokerName')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'season|mandiName')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'govPaddyGrade|mktPaddyGrade')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'govQtyMT|mktQtyMT')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'mandatedRate|mktRate')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'requiredByDate')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'requestedBy')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'status')}</td>
                    </tr>
                  ))}
                  {historyItems.length === 0 && (
                    <tr><td colSpan="11" className="px-6 py-12 text-center text-slate-500">No history records found</td></tr>
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
        title={`Source Selection & Indent Details`}
        size="4xl"
      >
        <div className="max-h-[85vh] overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Indent No</Label>
              <Input 
                type="text"
                value={formData.indentNo || ''} 
                onChange={(e) => setFormData({...formData, indentNo: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Indent Date</Label>
              <Input 
                type="date"
                value={formData.indentDate || ''} 
                onChange={(e) => setFormData({...formData, indentDate: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
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
              <Label className="text-sm font-medium text-slate-700">Purchase Type</Label>
              <Input 
                type="text"
                value={formData.purchaseType || ''} 
                onChange={(e) => setFormData({...formData, purchaseType: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            {formData.purchaseType === 'Government' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Agency Name</Label>
              <Select 
                value={formData.agencyName || ''} 
                onChange={(e) => setFormData({...formData, agencyName: e.target.value})}
                disabled={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              >
                <option value="">Select...</option>
                <option value="FCI">FCI</option><option value="MARKFED">MARKFED</option><option value="PUNSUP">PUNSUP</option><option value="NAFED">NAFED</option><option value="State Agency">State Agency</option>
              </Select>
            </div>
              )}
            {formData.purchaseType === 'Government' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Season</Label>
              <Input 
                type="text"
                value={formData.season || ''} 
                onChange={(e) => setFormData({...formData, season: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
              )}
            {formData.purchaseType === 'Government' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Paddy Grade</Label>
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
              <Label className="text-sm font-medium text-slate-700">Qty MT</Label>
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
              <Label className="text-sm font-medium text-slate-700">Mandated Rate ₹/Qt</Label>
              <Input 
                type="number"
                value={formData.mandatedRate || ''} 
                onChange={(e) => setFormData({...formData, mandatedRate: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
              )}
            {formData.purchaseType === 'Government' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Allocation Order Ref No</Label>
              <Input 
                type="text"
                value={formData.allocationRef || ''} 
                onChange={(e) => setFormData({...formData, allocationRef: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
              )}
            {formData.purchaseType === 'Government' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">DO (Delivery Order) No</Label>
              <Input 
                type="text"
                value={formData.doNo || ''} 
                onChange={(e) => setFormData({...formData, doNo: e.target.value})}
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
            {formData.purchaseType === 'Market' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Mandi Name</Label>
              <Input 
                type="text"
                value={formData.mandiName || ''} 
                onChange={(e) => setFormData({...formData, mandiName: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
              )}
            {formData.purchaseType === 'Market' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Supplier / Farmer Name</Label>
              <Input 
                type="text"
                value={formData.supplierName || ''} 
                onChange={(e) => setFormData({...formData, supplierName: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
              )}
            {formData.purchaseType === 'Market' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Paddy Variety</Label>
              <Input 
                type="text"
                value={formData.paddyVariety || ''} 
                onChange={(e) => setFormData({...formData, paddyVariety: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
              )}
            {formData.purchaseType === 'Market' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Season</Label>
              <Input 
                type="text"
                value={formData.mktSeason || ''} 
                onChange={(e) => setFormData({...formData, mktSeason: e.target.value})}
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
              <Label className="text-sm font-medium text-slate-700">Rate ₹/Qt</Label>
              <Input 
                type="number"
                value={formData.mktRate || ''} 
                onChange={(e) => setFormData({...formData, mktRate: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
              )}
            {formData.purchaseType === 'Market' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Commission %</Label>
              <Input 
                type="number"
                value={formData.commission || ''} 
                onChange={(e) => setFormData({...formData, commission: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
              )}
            {formData.purchaseType === 'Market' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Brokerage %</Label>
              <Input 
                type="number"
                value={formData.brokerage || ''} 
                onChange={(e) => setFormData({...formData, brokerage: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
              )}
            {formData.purchaseType === 'Market' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Loading Charges ₹</Label>
              <Input 
                type="number"
                value={formData.loadingCharges || ''} 
                onChange={(e) => setFormData({...formData, loadingCharges: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
              )}
            {formData.purchaseType === 'Market' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Hamali Charges ₹</Label>
              <Input 
                type="number"
                value={formData.hamaliCharges || ''} 
                onChange={(e) => setFormData({...formData, hamaliCharges: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
              )}
            {formData.purchaseType === 'Market' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Other Charges ₹</Label>
              <Input 
                type="number"
                value={formData.otherCharges || ''} 
                onChange={(e) => setFormData({...formData, otherCharges: e.target.value})}
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
