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

export const MaterialReceipt = () => {
  const getInitialData = () => {
    let masterData = JSON.parse(localStorage.getItem('purchase_master_v3')) || [];
    
    const resolveItems = (rawArray) => {
      return rawArray.map(item => typeof item === 'number' ? masterData.find(m => m.id === item) : item).filter(Boolean);
    };

    
    const rawPending = JSON.parse(localStorage.getItem('purchase_3_1_history')) || [];
    const rawHistory = JSON.parse(localStorage.getItem('purchase_3_1_history')) || [];
    
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
    const rawHistory = JSON.parse(localStorage.getItem('purchase_3_1_history')) || [];
    rawHistory.push(newItem);
    localStorage.setItem('purchase_3_1_history', JSON.stringify(rawHistory));
    
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
          <h1 className="text-2xl font-bold text-slate-800">Material Receipt</h1>
          <p className="text-slate-500">Manage material receipt</p>
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
                    <th className="px-6 py-4 font-bold">Weigh Slip No</th>
                    <th className="px-6 py-4 font-bold">Lift ID</th>
                    <th className="px-6 py-4 font-bold">PO/DO Number</th>
                    <th className="px-6 py-4 font-bold">Indent No</th>
                    <th className="px-6 py-4 font-bold">Vehicle Number</th>
                    <th className="px-6 py-4 font-bold">Net Weight Kg</th>
                    <th className="px-6 py-4 font-bold">Paddy Grade</th>
                    <th className="px-6 py-4 font-bold">Weigh Date</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-4 font-bold">GRN No</th>
                    <th className="px-6 py-4 font-bold">Lift No</th>
                    <th className="px-6 py-4 font-bold">Pending Lift MT</th>
                    <th className="px-6 py-4 font-bold">Weigh Slip No</th>
                    <th className="px-6 py-4 font-bold">Lift ID</th>
                    <th className="px-6 py-4 font-bold">PO/DO Number</th>
                    <th className="px-6 py-4 font-bold">Indent No</th>
                    <th className="px-6 py-4 font-bold">GRN Date</th>
                    <th className="px-6 py-4 font-bold">Lot No</th>
                    <th className="px-6 py-4 font-bold">Batch No</th>
                    <th className="px-6 py-4 font-bold">Warehouse</th>
                    <th className="px-6 py-4 font-bold">Go-down</th>
                    <th className="px-6 py-4 font-bold">Received Qty Kg</th>
                    <th className="px-6 py-4 font-bold">Shortage Kg</th>
                    <th className="px-6 py-4 font-bold">Excess Kg</th>
                    <th className="px-6 py-4 font-bold">Received By</th>
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
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'weighSlipNo')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'liftId')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'poDoNumber|poNumber|doNumber')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'indentNo')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'vehicleNumber')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'netWeight')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'paddyGrade|paddyGradeVerified')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'weighDate')}</td>
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
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'grnNo')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'liftNo')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'remainingAfterLiftMT')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'weighSlipNo')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'liftId')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'poDoNumber|poNumber|doNumber')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'indentNo')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'grnDate')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'lotNo')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'batchNo')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'warehouse')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'godown')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'receivedQty')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'shortage')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'excess')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'receivedBy')}</td>
                    </tr>
                  ))}
                  {historyItems.length === 0 && (
                    <tr><td colSpan="16" className="px-6 py-12 text-center text-slate-500">No history records found</td></tr>
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
        title={`Material Receipt Details`}
        size="4xl"
      >
        <div className="max-h-[85vh] overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Weighbridge Slip No</Label>
              <Input 
                type="text"
                value={formData.weighSlipNo || ''} 
                onChange={(e) => setFormData({...formData, weighSlipNo: e.target.value})}
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
              <Label className="text-sm font-medium text-slate-700">GRN No</Label>
              <Input 
                type="text"
                value={formData.grnNo || ''} 
                onChange={(e) => setFormData({...formData, grnNo: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">GRN Date</Label>
              <Input 
                type="date"
                value={formData.grnDate || ''} 
                onChange={(e) => setFormData({...formData, grnDate: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Warehouse Location</Label>
              <Input 
                type="text"
                value={formData.warehouse || ''} 
                onChange={(e) => setFormData({...formData, warehouse: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Go-down</Label>
              <Input 
                type="text"
                value={formData.godown || ''} 
                onChange={(e) => setFormData({...formData, godown: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Bin / Rack</Label>
              <Input 
                type="text"
                value={formData.binRack || ''} 
                onChange={(e) => setFormData({...formData, binRack: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Lot Number</Label>
              <Input 
                type="text"
                value={formData.lotNo || ''} 
                onChange={(e) => setFormData({...formData, lotNo: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Batch Number</Label>
              <Input 
                type="text"
                value={formData.batchNo || ''} 
                onChange={(e) => setFormData({...formData, batchNo: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Received Qty Kg</Label>
              <Input 
                type="number"
                value={formData.receivedQty || ''} 
                onChange={(e) => setFormData({...formData, receivedQty: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Expected Qty Kg</Label>
              <Input 
                type="number"
                value={formData.expectedQty || ''} 
                onChange={(e) => setFormData({...formData, expectedQty: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Shortage Kg</Label>
              <Input 
                type="number"
                value={formData.shortage || ''} 
                onChange={(e) => setFormData({...formData, shortage: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Excess Kg</Label>
              <Input 
                type="number"
                value={formData.excess || ''} 
                onChange={(e) => setFormData({...formData, excess: e.target.value})}
                readOnly={true}
                className={'w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Shortage / Excess Reason</Label>
              <Input 
                type="text"
                value={formData.shortageReason || ''} 
                onChange={(e) => setFormData({...formData, shortageReason: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">No. of Bags Received</Label>
              <Input 
                type="number"
                value={formData.noOfBags || ''} 
                onChange={(e) => setFormData({...formData, noOfBags: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
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
              <Label className="text-sm font-medium text-slate-700">Received By</Label>
              <Input 
                type="text"
                value={formData.receivedBy || ''} 
                onChange={(e) => setFormData({...formData, receivedBy: e.target.value})}
                readOnly={false}
                className={'w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm'}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Warehouse In-charge</Label>
              <Input 
                type="text"
                value={formData.warehouseIncharge || ''} 
                onChange={(e) => setFormData({...formData, warehouseIncharge: e.target.value})}
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
