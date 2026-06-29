import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, Clock, History as HistoryIcon, Package, TrendingUp } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Label, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';

const getVal = (item, keyStr) => {
  if (!keyStr) return '-';
  const keys = keyStr.split('|');
  for (let k of keys) {
    if (item[k] !== undefined && item[k] !== null && item[k] !== '') return item[k];
  }
  return '-';
};

export const Lift = () => {
  const getInitialData = () => {
    let masterData = JSON.parse(localStorage.getItem('purchase_master')) || [];

    const resolveItems = (rawArray) => {
      return rawArray.map(item => typeof item === 'number' ? masterData.find(m => m.id === item) : item).filter(Boolean);
    };

    const rawPending = JSON.parse(localStorage.getItem('purchase_7_history')) || [];
    const rawHistory = JSON.parse(localStorage.getItem('purchase_8_history')) || [];

    const pending = resolveItems(rawPending);
    const history = resolveItems(rawHistory);

    const historyIds = history.map(h => h.id);
    // Items that have not yet been fully lifted
    const unresolvedPending = pending.filter(p => {
      const liftData = JSON.parse(localStorage.getItem(`lift_data_${p.id}`)) || { totalLifted: 0 };
      const totalQty = parseFloat(p.qtyMT) || 0;
      return liftData.totalLifted < totalQty;
    });

    return { pending: unresolvedPending, history };
  };

  const initial = getInitialData();
  const [items, setItems] = useState(initial.pending);
  const [historyItems, setHistoryItems] = useState(initial.history);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState('All');
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAction = (item) => {
    const liftData = JSON.parse(localStorage.getItem(`lift_data_${item.id}`)) || { totalLifted: 0, liftCount: 0 };
    const totalQty = parseFloat(item.qtyMT) || 0;
    const remainingQty = Math.max(0, totalQty - liftData.totalLifted);
    const newLiftNo = liftData.liftCount + 1;
    const newLiftId = `LIFT-${item.id}-${newLiftNo}`;

    setSelectedItem(item);
    setFormData({
      ...item,
      liftId: newLiftId,
      liftNo: newLiftNo,
      totalQtyMT: totalQty,
      totalLiftedQtyMT: liftData.totalLifted,
      remainingQtyMT: remainingQty,
      liftQtyMT: '', // User fills this
      liftDate: new Date().toISOString().slice(0, 16),
      grossWeight: item.grossWeight || '',
      tareWeight: item.tareWeight || '',
      netWeight: item.netWeight || '',
      moisture: item.moisture || '',
      liftedFrom: item.liftedFrom || '',
      supervisor: item.supervisor || 'Amit',
      vehicleNumber: item.vehicleNumber || '',
      driverName: item.driverName || '',
      noOfBags: item.noOfBags || '',
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (formData.grossWeight && formData.tareWeight) {
      const net = parseFloat(formData.grossWeight) - parseFloat(formData.tareWeight);
      if (!isNaN(net)) {
        setFormData(prev => ({ ...prev, netWeight: net }));
      }
    }
  }, [formData.grossWeight, formData.tareWeight]);

  const handleSave = () => {
    const liftQty = parseFloat(formData.liftQtyMT) || 0;
    if (liftQty <= 0) {
      alert('Please enter a valid Lift Qty MT greater than 0');
      return;
    }

    const totalQty = parseFloat(formData.totalQtyMT) || 0;
    const prevLifted = parseFloat(formData.totalLiftedQtyMT) || 0;
    const newTotalLifted = prevLifted + liftQty;
    const newRemaining = Math.max(0, totalQty - newTotalLifted);

    // Save the lift record
    const liftRecord = {
      ...formData,
      id: `${selectedItem.id}_L${formData.liftNo}`,
      parentId: selectedItem.id,
      liftQtyMT: liftQty,
      newTotalLiftedQtyMT: newTotalLifted,
      remainingAfterLiftMT: newRemaining,
      status: newRemaining <= 0 ? 'Fully Lifted' : 'Partial Lift',
      liftCompletedAt: new Date().toISOString(),
    };

    // Update lift tracking data
    const liftData = {
      totalLifted: newTotalLifted,
      liftCount: formData.liftNo,
      lastLiftId: formData.liftId,
      fully: newRemaining <= 0,
    };
    localStorage.setItem(`lift_data_${selectedItem.id}`, JSON.stringify(liftData));

    // Save lift record to purchase_8_history for downstream stages
    const rawHistory = JSON.parse(localStorage.getItem('purchase_8_history')) || [];
    rawHistory.push(liftRecord);
    localStorage.setItem('purchase_8_history', JSON.stringify(rawHistory));

    setHistoryItems([...historyItems, liftRecord]);

    // If fully lifted, remove from pending
    if (newRemaining <= 0) {
      setItems(items.filter(i => i.id !== selectedItem.id));
    } else {
      // Update remaining qty in the pending display
      setItems(items.map(i => i.id === selectedItem.id ? { ...i, _remaining: newRemaining, _liftCount: formData.liftNo } : i));
    }

    setIsModalOpen(false);
    setFormData({});
    setSelectedItem(null);
  };

  const getRowClass = (type) => {
    if (type === 'Domestic' || type === 'Government') return 'bg-blue-50/50 hover:bg-blue-100/60 transition-colors border-l-4 border-l-blue-400';
    if (type === 'Export' || type === 'Market') return 'bg-emerald-50/50 hover:bg-emerald-100/60 transition-colors border-l-4 border-l-emerald-400';
    return 'hover:bg-slate-50 transition-colors';
  };

  const getLiftStats = (item) => {
    const liftData = JSON.parse(localStorage.getItem(`lift_data_${item.id}`)) || { totalLifted: 0, liftCount: 0 };
    const totalQty = parseFloat(item.qtyMT) || 0;
    return {
      totalLifted: liftData.totalLifted,
      liftCount: liftData.liftCount,
      remaining: Math.max(0, totalQty - liftData.totalLifted),
      percent: totalQty > 0 ? Math.round((liftData.totalLifted / totalQty) * 100) : 0,
    };
  };

  const filteredPending = items.filter(item =>
    (selectedType === 'All' || item.purchaseType === selectedType) &&
    (!searchTerm || JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredHistory = historyItems.filter(item =>
    (!searchTerm || JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Lift</h1>
          <p className="text-slate-500">Manage paddy lifting — supports partial lifts per order</p>
        </div>
      </div>

      <div className="border-b border-slate-200 mb-6">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('pending')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'pending' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <Clock className="w-4 h-4" />
            Pending Action <span className="ml-1 bg-amber-100 text-amber-700 rounded-full px-2 py-0.5 text-xs font-bold">{items.length}</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'history' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <HistoryIcon className="w-4 h-4" />
            History / Completed <span className="ml-1 bg-slate-100 text-slate-600 rounded-full px-2 py-0.5 text-xs font-bold">{historyItems.length}</span>
          </button>
        </div>
      </div>

      <Card className="p-0 border-0 shadow-sm ring-1 ring-slate-200 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <Input className="pl-9 bg-slate-50 border-slate-200" placeholder="Search..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <Select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-48 bg-slate-50 border-slate-200">
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
                    <th className="px-6 py-4 font-bold">Vendor / Agency</th>
                    <th className="px-6 py-4 font-bold">Purchase Type</th>
                    <th className="px-6 py-4 font-bold">Total Qty MT</th>
                    <th className="px-6 py-4 font-bold">Lifted MT</th>
                    <th className="px-6 py-4 font-bold text-amber-700">Pending Qty MT</th>
                    <th className="px-6 py-4 font-bold">Lift Count</th>
                    <th className="px-6 py-4 font-bold">Lift Progress</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-4 font-bold">Lift ID</th>
                    <th className="px-6 py-4 font-bold">Lift No</th>
                    <th className="px-6 py-4 font-bold">PO/DO Number</th>
                    <th className="px-6 py-4 font-bold">Lift Date</th>
                    <th className="px-6 py-4 font-bold">Vehicle No</th>
                    <th className="px-6 py-4 font-bold">Driver</th>
                    <th className="px-6 py-4 font-bold">Lift Qty MT</th>
                    <th className="px-6 py-4 font-bold">Net Weight Kg</th>
                    <th className="px-6 py-4 font-bold">Remaining MT</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold">Supervisor</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeTab === 'pending' && (
                <>
                  {filteredPending.map((item, index) => {
                    const stats = getLiftStats(item);
                    return (
                      <tr key={index} className={getRowClass(item.purchaseType)}>
                        <td className="px-6 py-4">
                          <Button
                            onClick={() => handleAction(item)}
                            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2 text-xs rounded-md shadow-sm font-medium"
                          >
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            Lift #{stats.liftCount + 1}
                          </Button>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'poNumber|poDoNumber|doNumber')}</td>
                        <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'vendorName|agencyName|supplierName')}</td>
                        <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'purchaseType')}</td>
                        <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'qtyMT')}</td>
                        <td className="px-6 py-4 font-medium text-emerald-600 font-bold">{stats.totalLifted}</td>
                        <td className="px-6 py-4 font-medium text-amber-600 font-bold">{stats.remaining}</td>
                        <td className="px-6 py-4">
                          <span className="bg-slate-100 text-slate-700 rounded-full px-3 py-1 text-xs font-bold">{stats.liftCount}</span>
                        </td>
                        <td className="px-6 py-4 w-36">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-slate-200 rounded-full h-2">
                              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${Math.min(100, stats.percent)}%` }}></div>
                            </div>
                            <span className="text-xs text-slate-600 font-medium w-10">{stats.percent}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredPending.length === 0 && (
                    <tr><td colSpan="9" className="px-6 py-12 text-center text-slate-500">No pending lift records found</td></tr>
                  )}
                </>
              )}

              {activeTab === 'history' && (
                <>
                  {filteredHistory.map((item, index) => (
                    <tr key={index} className={getRowClass(item.purchaseType)}>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'liftId')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">
                        <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 text-xs font-bold">#{getVal(item, 'liftNo')}</span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'poNumber|poDoNumber|doNumber')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'liftDate')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'vehicleNumber')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'driverName')}</td>
                      <td className="px-6 py-4 font-medium text-emerald-600 font-bold">{getVal(item, 'liftQtyMT')}</td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'netWeight')}</td>
                      <td className="px-6 py-4 font-medium text-amber-600 font-bold">{getVal(item, 'remainingAfterLiftMT')}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.status === 'Fully Lifted' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {item.status || 'Partial Lift'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">{getVal(item, 'supervisor')}</td>
                    </tr>
                  ))}
                  {filteredHistory.length === 0 && (
                    <tr><td colSpan="11" className="px-6 py-12 text-center text-slate-500">No lift history found</td></tr>
                  )}
                </>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Partial Lift Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Lift #${formData.liftNo} — ${formData.poNumber || formData.poDoNumber || ''}`} size="4xl">
        <div className="max-h-[85vh] overflow-y-auto p-6">

          {/* Lift Progress Banner */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-semibold text-slate-700">Lift Progress for this PO/DO</div>
              <div className="text-sm font-bold text-blue-700">Lift #{formData.liftNo}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center mb-3">
              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <p className="text-xs text-slate-500 font-medium">Total Qty</p>
                <p className="text-xl font-bold text-slate-800">{formData.totalQtyMT} MT</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-emerald-200">
                <p className="text-xs text-emerald-600 font-medium">Already Lifted</p>
                <p className="text-xl font-bold text-emerald-600">{formData.totalLiftedQtyMT} MT</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-amber-200">
                <p className="text-xs text-amber-600 font-medium">Pending Lift</p>
                <p className="text-xl font-bold text-amber-600">{formData.remainingQtyMT} MT</p>
              </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
              <div
                className="bg-emerald-500 h-2.5 rounded-full transition-all"
                style={{ width: `${formData.totalQtyMT > 0 ? Math.min(100, (formData.totalLiftedQtyMT / formData.totalQtyMT) * 100) : 0}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Lift ID (Auto)</Label>
              <Input type="text" value={formData.liftId || ''} readOnly className="w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md" />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Lift Number</Label>
              <Input type="number" value={formData.liftNo || ''} readOnly className="w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md" />
            </div>
            <div className="space-y-1 col-span-2">
              <Label className="text-sm font-medium text-amber-700 font-bold">⬇️ Lift Qty MT <span className="text-red-500">*</span> (max: {formData.remainingQtyMT} MT)</Label>
              <Input
                type="number"
                min="0"
                max={formData.remainingQtyMT}
                value={formData.liftQtyMT || ''}
                onChange={(e) => {
                  const v = Math.min(parseFloat(e.target.value) || 0, formData.remainingQtyMT);
                  setFormData({ ...formData, liftQtyMT: v });
                }}
                className="w-full mt-1.5 bg-amber-50 border-amber-300 text-slate-900 focus:ring-amber-500 focus:border-amber-500 rounded-md shadow-sm font-bold text-lg"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">PO / DO Number</Label>
              <Input type="text" value={formData.poNumber || formData.poDoNumber || ''} readOnly className="w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md" />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Indent No</Label>
              <Input type="text" value={formData.indentNo || ''} readOnly className="w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md" />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Purchase Type</Label>
              <Input type="text" value={formData.purchaseType || ''} readOnly className="w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md" />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Lift Date &amp; Time</Label>
              <Input type="datetime-local" value={formData.liftDate || ''} onChange={(e) => setFormData({ ...formData, liftDate: e.target.value })} className="w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Vehicle Number</Label>
              <Input type="text" value={formData.vehicleNumber || ''} onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })} className="w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Driver Name</Label>
              <Input type="text" value={formData.driverName || ''} onChange={(e) => setFormData({ ...formData, driverName: e.target.value })} className="w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">No. of Bags</Label>
              <Input type="number" value={formData.noOfBags || ''} onChange={(e) => setFormData({ ...formData, noOfBags: e.target.value })} className="w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Gross Weight Kg</Label>
              <Input type="number" value={formData.grossWeight || ''} onChange={(e) => setFormData({ ...formData, grossWeight: e.target.value })} className="w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Tare Weight Kg</Label>
              <Input type="number" value={formData.tareWeight || ''} onChange={(e) => setFormData({ ...formData, tareWeight: e.target.value })} className="w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Net Weight Kg (Auto)</Label>
              <Input type="number" value={formData.netWeight || ''} readOnly className="w-full mt-1.5 bg-slate-50 border-slate-200 text-slate-600 cursor-not-allowed rounded-md" />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Moisture at Lift %</Label>
              <Input type="number" value={formData.moisture || ''} onChange={(e) => setFormData({ ...formData, moisture: e.target.value })} className="w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Lifted From</Label>
              <Input type="text" value={formData.liftedFrom || ''} onChange={(e) => setFormData({ ...formData, liftedFrom: e.target.value })} className="w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Supervisor Name</Label>
              <Input type="text" value={formData.supervisor || ''} onChange={(e) => setFormData({ ...formData, supervisor: e.target.value })} className="w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm" />
            </div>
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Seal No</Label>
              <Input type="text" value={formData.sealNo || ''} onChange={(e) => setFormData({ ...formData, sealNo: e.target.value })} className="w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm" />
            </div>
            {formData.purchaseType === 'Government' && (
              <div className="space-y-1">
                <Label className="text-sm font-medium text-slate-700">Lorry Receipt No</Label>
                <Input type="text" value={formData.lorryReceipt || ''} onChange={(e) => setFormData({ ...formData, lorryReceipt: e.target.value })} className="w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm" />
              </div>
            )}
            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">Loading Remarks</Label>
              <Input type="text" value={formData.remarks || ''} onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} className="w-full mt-1.5 bg-white border-slate-300 text-slate-900 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-8 mt-8 border-t border-slate-100">
            <Button onClick={() => setIsModalOpen(false)} variant="outline" className="px-6">Cancel</Button>
            <Button onClick={handleSave} className="px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
              Save Lift #{formData.liftNo}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
