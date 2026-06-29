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

export const Lift = () => {
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
    const rawPending = JSON.parse(localStorage.getItem('purchase_7_history')) || [];
    const rawHistory = JSON.parse(localStorage.getItem('purchase_8_history')) || [];
    
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
    const rawHistory = JSON.parse(localStorage.getItem('purchase_8_history')) || [];
    rawHistory.push(newItem);
    localStorage.setItem('purchase_8_history', JSON.stringify(rawHistory));
    
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
          <h1 className="text-2xl font-bold text-slate-800">Lift</h1>
          <p className="text-slate-500">Manage lift</p>
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
                    <th className="px-6 py-4 font-bold">PO/DO Number</th>
                    <th className="px-6 py-4 font-bold">Indent No</th>
                    <th className="px-6 py-4 font-bold">PO Entry ID</th>
                    <th className="px-6 py-4 font-bold">Purchase Type</th>
                    <th className="px-6 py-4 font-bold">Vendor/Agency</th>
                    <th className="px-6 py-4 font-bold">Qty MT</th>
                    <th className="px-6 py-4 font-bold">Advance Paid ₹</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-4 font-bold">Lift ID</th>
                    <th className="px-6 py-4 font-bold">PO/DO Number</th>
                    <th className="px-6 py-4 font-bold">Indent No</th>
                    <th className="px-6 py-4 font-bold">Lift Date</th>
                    <th className="px-6 py-4 font-bold">Vehicle Number</th>
                    <th className="px-6 py-4 font-bold">Driver Name</th>
                    <th className="px-6 py-4 font-bold">No. of Bags</th>
                    <th className="px-6 py-4 font-bold">Gross Weight Kg</th>
                    <th className="px-6 py-4 font-bold">Net Weight Kg</th>
                    <th className="px-6 py-4 font-bold">Moisture %</th>
                    <th className="px-6 py-4 font-bold">Lifted From</th>
                    <th className="px-6 py-4 font-bold">Supervisor</th>
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
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'poDoNumber|poNumber|doNumber')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'indentNo')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'poEntryId')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'purchaseType')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'vendorName|agencyName')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'qtyMT')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'advanceAmount')}</td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr><td colSpan="8" className="px-6 py-12 text-center text-slate-500">No pending records found</td></tr>
                  )}
                </>
              )}
              
              {activeTab === 'history' && (
                <>
                  {historyItems.map((item, index) => (
                    <tr key={index} className={getRowClass(item.orderType || item.purchaseType)}>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'liftId')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'poDoNumber|poNumber|doNumber')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'indentNo')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'liftDate')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'vehicleNumber')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'driverName')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'noOfBags')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'grossWeight')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'netWeight')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'moisture')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'liftedFrom')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'supervisor')}</td>
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
        title={`Lift Details`}
        size="4xl"
      >
        <div className="max-h-[85vh] overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">PO / DO Number</Label>
              <Input 
                type="text"
                value={formData.poDoNumber || ''} 
                onChange={(e) => setFormData({...formData, poDoNumber: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
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
              <Label className="text-sm font-medium text-slate-700">Purchase Type</Label>
              <Input 
                type="text"
                value={formData.purchaseType || ''} 
                onChange={(e) => setFormData({...formData, purchaseType: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Lift ID</Label>
              <Input 
                type="text"
                value={formData.liftId || ''} 
                onChange={(e) => setFormData({...formData, liftId: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Lift Date & Time</Label>
              <Input 
                type="datetime-local"
                value={formData.liftDate || ''} 
                onChange={(e) => setFormData({...formData, liftDate: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Vehicle Number</Label>
              <Input 
                type="text"
                value={formData.vehicleNumber || ''} 
                onChange={(e) => setFormData({...formData, vehicleNumber: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Driver Name</Label>
              <Input 
                type="text"
                value={formData.driverName || ''} 
                onChange={(e) => setFormData({...formData, driverName: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">No. of Bags Loaded</Label>
              <Input 
                type="number"
                value={formData.noOfBags || ''} 
                onChange={(e) => setFormData({...formData, noOfBags: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Gross Weight Loaded Kg</Label>
              <Input 
                type="number"
                value={formData.grossWeight || ''} 
                onChange={(e) => setFormData({...formData, grossWeight: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Tare Weight Kg</Label>
              <Input 
                type="number"
                value={formData.tareWeight || ''} 
                onChange={(e) => setFormData({...formData, tareWeight: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Net Weight Lifted Kg</Label>
              <Input 
                type="number"
                value={formData.netWeight || ''} 
                onChange={(e) => setFormData({...formData, netWeight: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Paddy Grade</Label>
              <Input 
                type="text"
                value={formData.paddyGrade || ''} 
                onChange={(e) => setFormData({...formData, paddyGrade: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Moisture at Lift %</Label>
              <Input 
                type="number"
                value={formData.moisture || ''} 
                onChange={(e) => setFormData({...formData, moisture: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Lifted From</Label>
              <Input 
                type="text"
                value={formData.liftedFrom || ''} 
                onChange={(e) => setFormData({...formData, liftedFrom: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Supervisor Name</Label>
              <Input 
                type="text"
                value={formData.supervisor || ''} 
                onChange={(e) => setFormData({...formData, supervisor: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Seal No</Label>
              <Input 
                type="text"
                value={formData.sealNo || ''} 
                onChange={(e) => setFormData({...formData, sealNo: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            {formData.purchaseType === 'Government' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Lorry Receipt No</Label>
              <Input 
                type="text"
                value={formData.lorryReceipt || ''} 
                onChange={(e) => setFormData({...formData, lorryReceipt: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
              )}
            {formData.purchaseType === 'Government' && (
              <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">DO Balance Qty MT</Label>
              <Input 
                type="number"
                value={formData.doBalance || ''} 
                onChange={(e) => setFormData({...formData, doBalance: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
              )}
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Loading Remarks</Label>
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
